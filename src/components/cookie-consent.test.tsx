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

const ID = "1120248174191120";
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
  await waitFor(() => expect(pageViews()).toHaveLength(1));
}

describe("Meta page views (no consent gate)", () => {
  beforeEach(() => {
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

  it("counts a back/forward cache restoration once but not an ordinary pageshow", async () => {
    render(<CookieConsent />);
    await accept();
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: false }));
    expect(pageViews()).toHaveLength(1);
    window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true }));
    expect(pageViews()).toHaveLength(2);
  });
});
describe("Tracking without consent", () => {
  it("loads Meta Pixel and GTM immediately and renders no banner", async () => {
    localStorage.clear();
    const pixel = vi.fn();
    (window as unknown as { fbq: unknown }).fbq = pixel;
    render(<CookieConsent />);
    await waitFor(() => expect(pixel).toHaveBeenCalledWith("init", ID, {}, { agent: "lovable" }));
    expect(document.querySelector('script[src*="googletagmanager.com/gtm.js?id=GTM-MRXXWRDH"]')).not.toBeNull();
    expect(screen.queryByRole("button", { name: "Aceitar" })).toBeNull();
    delete (window as unknown as { fbq?: unknown }).fbq;
  });
});
