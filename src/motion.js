import { useEffect } from "react";

// One hook that powers every scroll / pointer animation on the page.
export default function useMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];

    // 1. Reveal on scroll (.reveal*, and .stagger groups whose children enter one by one)
    document.querySelectorAll(".stagger").forEach((g) =>
      [...g.children].forEach((c, i) => c.style.setProperty("--i", i))
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.stagger").forEach((t) => io.observe(t));
    cleanups.push(() => io.disconnect());
    if (reduce) return () => cleanups.forEach((fn) => fn());

    // 2. Scroll progress (--p 0..1) and scroll offset (--sy) drive the truck bar + parallax
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = root.scrollHeight - innerHeight;
        root.style.setProperty("--p", max > 0 ? scrollY / max : 0);
        root.style.setProperty("--sy", scrollY);
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    cleanups.push(() => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); });

    // 3. Hero mouse parallax (--hx / --hy in -1..1)
    const hero = document.querySelector(".hero");
    if (hero) {
      const move = (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--hx", ((e.clientX - r.left) / r.width - 0.5) * 2);
        hero.style.setProperty("--hy", ((e.clientY - r.top) / r.height - 0.5) * 2);
      };
      hero.addEventListener("pointermove", move);
      cleanups.push(() => hero.removeEventListener("pointermove", move));
    }

    // 4. 3D tilt + spotlight on cards
    document.querySelectorAll(".tilt").forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--ry", (x - 0.5) * 10 + "deg");
        el.style.setProperty("--rx", (0.5 - y) * 10 + "deg");
        el.style.setProperty("--mx", x * 100 + "%");
        el.style.setProperty("--my", y * 100 + "%");
      };
      const leave = () => { el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
    });

    // 5. Magnetic buttons
    document.querySelectorAll(".button").forEach((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--bx", (e.clientX - r.left - r.width / 2) * 0.22 + "px");
        el.style.setProperty("--by", (e.clientY - r.top - r.height / 2) * 0.3 + "px");
      };
      const leave = () => { el.style.setProperty("--bx", "0px"); el.style.setProperty("--by", "0px"); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
