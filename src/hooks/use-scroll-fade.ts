import { useEffect } from "react";

const TARGETS = ":is(h2, h3, p, img, ul, details, iframe)";

/**
 * Faz os elementos de texto e imagem das seções com `data-fade` aparecerem
 * suavemente (fade + leve subida) quando entram na tela durante o scroll.
 * Elementos já visíveis ao carregar não são escondidos, e quem prefere menos
 * movimento não vê animação.
 */
export function useScrollFade() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animations = new Map<Element, Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animations.get(entry.target)?.play();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    // O estado escondido vive numa Web Animation pausada (fill: both), e não em
    // classe/estilo inline: assim o DOM gravado por ferramentas como o Clarity
    // continua com tudo visível e o mapa de calor não sai com blocos vazios.
    document.querySelectorAll("[data-fade]").forEach((section) => {
      section.querySelectorAll<HTMLElement>(TARGETS).forEach((el, i) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        const anim = el.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 700, delay: Math.min(i, 4) * 70, easing: "ease-out", fill: "both" },
        );
        anim.pause();
        animations.set(el, anim);
        observer.observe(el);
      });
    });

    return () => {
      observer.disconnect();
      for (const anim of animations.values()) anim.cancel();
    };
  }, []);
}
