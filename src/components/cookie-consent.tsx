import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

// ID do Pixel da Meta (público, hardcoded).
const PIXEL_ID_VALUE = "1120248174191120";
const getPixelId = () => PIXEL_ID_VALUE;
// Container do Google Tag Manager (GA4 é configurado dentro do GTM).
const GTM_ID = "GTM-MRXXWRDH";

function startGtm() {
  const w = window as any;
  if (w.__gtmInit) return;
  w.__gtmInit = true;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

function startPixel(PIXEL_ID: string) {
  const w = window as any;
  if (w.__metaPixelInit) {
    w.fbq?.("consent", "grant");
    return;
  }
  w.__metaPixelInit = true;
  if (!w.fbq) {
    const n: any = (w.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod(...args) : n.queue.push(args);
    });
    if (!w._fbq) w._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    // Set before the SDK loads and installs its history listeners.
    n.disablePushState = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
  }
  w.fbq.disablePushState = true;
  // Browser-instance opt-out for this Pixel only; never changes the shared Gateway.
  // Queue before init/config so even the first authorized event stays browser-only.
  w.fbq("skipOpenbridge", PIXEL_ID);
  w.fbq("init", PIXEL_ID, {}, { agent: "lovable" });
  // Also suppress SDK-generated PageViews on back/forward cache restores.
  // Explicit trackSingle PageView/Contact remain enabled.
  w.fbq("set", "trackSingleOnly", true, PIXEL_ID);
}

function trackPageView(PIXEL_ID: string, restoredPage = false) {
  const w = window as any;
  const path = window.location.pathname;
  if (!w.fbq || (!restoredPage && w.__metaPixelLastPagePath === path)) return;
  w.__metaPixelLastPagePath = path;
  w.fbq("trackSingle", PIXEL_ID, "PageView");
}

export function CookieConsent() {
  const router = useRouter();

  useEffect(() => {
    startGtm();
    const PIXEL_ID = getPixelId();
    startPixel(PIXEL_ID);
    trackPageView(PIXEL_ID);
    const unsubRoute = router.subscribe("onResolved", () => {
      trackPageView(PIXEL_ID);
    });
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) trackPageView(PIXEL_ID, true);
    };
    window.addEventListener("pageshow", onPageShow);
    const onWhatsAppClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!/(wa\.me|whatsapp\.com)/i.test(href)) return;
      (window as any).fbq?.("trackSingle", PIXEL_ID, "Contact");
    };
    document.addEventListener("click", onWhatsAppClick, true);
    return () => {
      unsubRoute();
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("click", onWhatsAppClick, true);
    };
  }, [router]);

  return null;
}
