import { useEffect } from "react";

const TARGETS = ":is(h2, h3, p, img, ul, details, iframe)";

/**
 * Faz os elementos de texto e imagem das seções com `data-fade` aparecerem
 * suavemente (fade + leve subida) quando entram na tela durante o scroll.
 * Elementos já visíveis ao carregar não são escondidos, e quem prefere menos
 * movimento não vê animação (ver `.fade-init` em styles.css).
 */
export function useScrollFade() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    const hidden: Element[] = [];
    document.querySelectorAll("[data-fade]").forEach((section) => {
      section.querySelectorAll<HTMLElement>(TARGETS).forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.style.transitionDelay = `${Math.min(i, 4) * 70}ms`;
        el.classList.add("fade-init");
        observer.observe(el);
        hidden.push(el);
      });
    });

    return () => {
      observer.disconnect();
      for (const el of hidden) {
        el.classList.remove("fade-init", "fade-in");
        (el as HTMLElement).style.transitionDelay = "";
      }
    };
  }, []);
}
