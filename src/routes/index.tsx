import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import bodyHtml from "../pages-content/rush-body.html?raw";
import cssText from "../pages-content/rush.css?raw";
import productAsset from "../assets/rush-product.png.asset.json";
const productImg = productAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RUSH — Sono. Calma. Energia. | Suplemento Feminino Premium" },
      {
        name: "description",
        content:
          "RUSH é o suplemento feminino de tripla ação: sono profundo, calma real e energia sustentada. Fórmula transparente com 5 ativos em doses clínicas.",
      },
      { property: "og:title", content: "RUSH — Sono. Calma. Energia." },
      {
        property: "og:description",
        content:
          "Tripla ação para o metabolismo feminino. +4.800 mulheres transformadas. Garantia de 30 dias.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    // FAQ accordion
    (window as unknown as { faq: (el: HTMLElement) => void }).faq = (el: HTMLElement) => {
      const item = el.closest(".faq-item");
      if (!item) return;
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
      if (!open) item.classList.add("open");
    };

    // Reveal on scroll
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -30px 0px" },
    );
    document.querySelectorAll(".rv").forEach((el) => obs.observe(el));

    // Number count-up
    const numObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>(".pf-num,.tn-n").forEach((el) => {
            const raw = el.textContent ?? "";
            const num = parseFloat(raw.replace(/[^0-9.]/g, ""));
            if (!num) return;
            const suf = raw.replace(/[0-9.]/g, "");
            let start: number | null = null;
            const dur = 1600;
            const step = (ts: number) => {
              if (!start) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const ease = p < 0.5 ? 2 * p * p : 1 - 2 * (1 - p) * (1 - p);
              const val = ease * num;
              el.textContent = (num < 10 ? val.toFixed(1) : Math.round(val)) + suf;
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
          numObs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll(".proof-bar,.testi-numbers").forEach((el) => numObs.observe(el));

    // Smooth scroll for anchors
    const onAnchorClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const t = document.querySelector(href);
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth" });
      }
    };
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchors.forEach((a) => a.addEventListener("click", onAnchorClick));

    // A11y: make FAQ questions keyboard-accessible
    const faqQs = document.querySelectorAll<HTMLElement>(".faq-q");
    const onFaqKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        (e.currentTarget as HTMLElement).click();
      }
    };
    faqQs.forEach((q, i) => {
      q.setAttribute("role", "button");
      q.setAttribute("tabindex", "0");
      q.setAttribute("aria-expanded", "false");
      q.id = q.id || `faq-q-${i}`;
      q.addEventListener("keydown", onFaqKey);
    });

    return () => {
      obs.disconnect();
      numObs.disconnect();
      anchors.forEach((a) => a.removeEventListener("click", onAnchorClick));
      faqQs.forEach((q) => q.removeEventListener("keydown", onFaqKey));
    };
  }, []);

  const html = useMemo(() => bodyHtml.replaceAll("__PRODUCT_IMG__", productImg), []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssText }} />
      <main dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
