(() => {
  "use strict";
  const root = document.documentElement;
  const theme = window.siteTheme;
  const toggle = theme.toggle.bind(theme);

  theme.toggle = () => {
    const button = document.querySelector("[data-theme-toggle]");
    const bounds = button.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)) + 128;
    root.style.setProperty("--theme-reveal-x", `${x}px`);
    root.style.setProperty("--theme-reveal-y", `${y}px`);
    root.style.setProperty("--theme-reveal-radius", `${radius}px`);
    toggle();
  };

  document.querySelectorAll("[data-edge-stars]").forEach((field, side) => {
    let seed = 3247 + side * 71;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 18; index += 1) {
      const star = document.createElement("span");
      star.className = "star-point";
      star.style.setProperty("--star-x", `${8 + random() * 82}%`);
      star.style.setProperty("--star-y", `${3 + random() * 92}%`);
      star.style.setProperty("--star-size", `${1 + random() * 1.4}px`);
      star.style.setProperty("--star-duration", `${3.8 + random() * 4.5}s`);
      star.style.setProperty("--star-delay", `${-random() * 8}s`);
      fragment.appendChild(star);
    }
    field.appendChild(fragment);
  });
})();
