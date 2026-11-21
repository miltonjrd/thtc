import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CookieConsent } from "./cookie-consent";

const routes = vi.hoisted(() => ({ listeners: new Set<() => void>() }));
const router = vi.hoisted(() => ({
  subscribe: (_event: string, listener: () => void) => {
    routes.listeners.add(listener);
    return () => routes.listeners.delete(listener);
  },
}));
vi.mock("@tanstack/react-router", () => ({ useRouter: () => router }));

const ID = "1234567890";
type PixelMock = ReturnType<typeof vi.fn> & { disablePushState?: boolean };
type PixelWindow = Window & {
  fbq?: PixelMock;
  _fbq?: unknown;
  __metaPixelInit?: boolean;
  __metaPixelLastPagePath?: string;
};
const pixelWindow = window as PixelWindow;
let pixel: PixelMock;

function navigate(path: string) {
  window.history.pushState({}, "", path);
  for (const listener of routes.listeners) listener();
}
function pageViews() {
  return pixel.mock.calls.filter(([command, id, event]) =>
    command === "trackSingle" && id === ID && event === "PageView");
}
async function accept() {
  fireEvent.click(await screen.findByRole("button", { name: "Aceitar" }));
  await waitFor(() => expect(pageViews()).toHaveLength(1));
}

describe("Consent-gated Meta page views", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_META_PIXEL_ID", ID);
    localStorage.clear();
    window.history.replaceState({}, "", "/");
    routes.listeners.clear();
    delete pixelWindow.__metaPixelInit;
    delete pixelWindow.__metaPixelLastPagePath;
    delete pixelWindow._fbq;
    pixel = vi.fn() as PixelMock;
    pixelWindow.fbq = pixel;
  });
  afterEach(() => {
    cleanup();
    vi.unstubAllEnvs();
    delete pixelWindow.fbq;
    delete pixelWindow._fbq;
    delete pixelWindow.__metaPixelInit;
    delete pixelWindow.__metaPixelLastPagePath;
    document.querySelectorAll('script[src*="fbevents.js"]').forEach((script) => script.remove());
    vi.restoreAllMocks();
  });

  it("never initializes or sends events before acceptance or after refusal", async () => {
    render(<CookieConsent />);
    await screen.findByRole("button", { name: "Recusar" });
    expect(pixel).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Recusar" }));
    navigate("/outra-pagina");
    expect(pageViews()).toHaveLength(0);
    expect(pixel.mock.calls.filter(([command]) => command === "init")).toHaveLength(0);
    expect(localStorage.getItem("cookie-consent-marketing")).toBe("denied");
  });

  it("initializes the unchanged Pixel once with browser-only manual dispatch", async () => {
    render(<CookieConsent />);
    await accept();
    expect(pixel.disablePushState).toBe(true);
    expect(pixel).toHaveBeenCalledWith("init", ID, {}, { agent: "lovable" });
    expect(pixel).toHaveBeenCalledWith("skipOpenbridge", ID);
    expect(pixel).toHaveBeenCalledWith("set", "trackSingleOnly", true, ID);
    expect(pixel.mock.calls.filter(([command]) => command === "init")).toHaveLength(1);
    expect(pageViews()).toHaveLength(1);
    expect(pixel.mock.calls.some((call) => call.includes("OpenBridge") || call.includes("autoConfig"))).toBe(false);
  });

  it("opts out of OpenBridge for only this Pixel before init or the first event", async () => {
    render(<CookieConsent />);
    await accept();
    const calls = pixel.mock.calls;
    const skipIndex = calls.findIndex(([command]) => command === "skipOpenbridge");
    const initIndex = calls.findIndex(([command]) => command === "init");
    const eventIndex = calls.findIndex(([command]) => command === "trackSingle");
    expect(skipIndex).toBeGreaterThanOrEqual(0);
    expect(skipIndex).toBeLessThan(initIndex);
    expect(skipIndex).toBeLessThan(eventIndex);
    expect(calls.filter(([command]) => command === "skipOpenbridge")).toEqual([["skipOpenbridge", ID]]);
    expect(calls.some(([command, option]) => command === "set" && option === "openbridge")).toBe(false);
  });

  it("sets the automatic-navigation guard before appending the SDK script", async () => {
    delete pixelWindow.fbq;
    const append = document.head.appendChild.bind(document.head);
    const observed: boolean[] = [];
    vi.spyOn(document.head, "appendChild").mockImplementation((node) => {
      if (node instanceof HTMLScriptElement && node.src.includes("fbevents.js")) {
        observed.push(pixelWindow.fbq?.disablePushState === true);
      }
      return append(node);
    });
    render(<CookieConsent />);
    fireEvent.click(await screen.findByRole("button", { name: "Aceitar" }));
    await waitFor(() => expect(observed).toEqual([true]));
    expect(document.querySelectorAll('script[src*="fbevents.js"]')).toHaveLength(1);
  });

  it("does not count #quiz or scrolling as new page views", async () => {
    render(<CookieConsent />);
    await accept();
    navigate("/#quiz");
    fireEvent.scroll(window);
    navigate("/#oferta");
    expect(pageViews()).toHaveLength(1);
  });

  it("does not count UTM or any query-only change as a new page view", async () => {
    render(<CookieConsent />);
    await accept();
    navigate("/?utm_source=instagram&utm_campaign=thtc");
    navigate("/?utm_source=facebook&fbclid=example#quiz");
    expect(pageViews()).toHaveLength(1);
  });

  it("counts each distinct page navigation once, including returning to the previous page", async () => {
    render(<CookieConsent />);
    await accept();
    navigate("/outra-pagina");
    navigate("/outra-pagina?utm_source=instagram#quiz");
    expect(pageViews()).toHaveLength(2);
    navigate("/");
    expect(pageViews()).toHaveLength(3);
  });

  it("does not recount a page on component remount or reacceptance", async () => {
    const view = render(<CookieConsent />);
    await accept();
    view.unmount();
    render(<CookieConsent />);
    await screen.findByRole("button", { name: "Preferências de cookies" });
    fireEvent.click(screen.getByRole("button", { name: "Preferências de cookies" }));
    fireEvent.click(await screen.findByRole("button", { name: "Aceitar" }));
    expect(pageViews()).toHaveLength(1);
    expect(pixel.mock.calls.filter(([command]) => command === "init")).toHaveLength(1);
    expect(pixel.mock.calls.filter(([command]) => command === "skipOpenbridge")).toEqual([["skipOpenbridge", ID]]);
  });

  it("preserves Contact, revokes consent and stops page/contact dispatch after withdrawal", async () => {
    render(<><CookieConsent /><a href="https://wa.me/5517996664636" onClick={(event) => event.preventDefault()}>Contato teste</a></>);
    await accept();
    fireEvent.click(screen.getByText("Contato teste"));
    expect(pixel).toHaveBeenCalledWith("trackSingle", ID, "Contact");
    document.cookie = "_fbp=test; path=/";
    document.cookie = "_fbc=test; path=/";
    fireEvent.click(screen.getByRole("button", { name: "Preferências de cookies" }));
    fireEvent.click(await screen.findByRole("button", { name: "Recusar" }));
    await waitFor(() => expect(pixel).toHaveBeenCalledWith("consent", "revoke"));
    const calls = pixel.mock.calls.length;
    navigate("/outra-pagina");
    fireEvent.click(screen.getByText("Contato teste"));
    expect(pixel.mock.calls).toHaveLength(calls);
    expect(document.cookie).not.toContain("_fbp=");
    expect(document.cookie).not.toContain("_fbc=");
  });

  it("counts a back/forward cache restoration once but not an ordinary pageshow", async () => {
    render(<CookieConsent />);
    await accept();
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: false }));
    expect(pageViews()).toHaveLength(1);
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true }));
    expect(pageViews()).toHaveLength(2);
  });
});