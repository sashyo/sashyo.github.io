/* sashyo - portfolio interactions */
(() => {
  "use strict";

  /* ---- footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- mobile menu ---- */
  const burger = document.querySelector(".nav__burger");
  const links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---- hero typing rotator ---- */
  const rotator = document.querySelector(".hero__rotator");
  const phrases = [
    "keep secrets safe.",
    "never hold the key.",
    "stay zero-trust.",
    "teach me cryptography.",
    "are fun to build.",
  ];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (rotator) {
    if (reduce) {
      rotator.textContent = phrases[0];
    } else {
      let pi = 0, ci = 0, deleting = false;
      const tick = () => {
        const word = phrases[pi];
        rotator.textContent = word.slice(0, ci);
        if (!deleting && ci < word.length) {
          ci++;
          setTimeout(tick, 70);
        } else if (!deleting && ci === word.length) {
          deleting = true;
          setTimeout(tick, 1700);
        } else if (deleting && ci > 0) {
          ci--;
          setTimeout(tick, 35);
        } else {
          deleting = false;
          pi = (pi + 1) % phrases.length;
          setTimeout(tick, 250);
        }
      };
      tick();
    }
  }

  /* ---- scroll reveal ---- */
  const revealables = document.querySelectorAll(".section, .marquee");
  revealables.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window && !reduce) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-visible"));
  }
})();
