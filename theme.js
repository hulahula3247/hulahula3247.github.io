(() => {
  "use strict";
  const root = document.documentElement;
  const storageKey = "homepage-theme";
  let preference;
  try { preference = localStorage.getItem(storageKey); } catch { /* Local previews can block storage. */ }
  if (preference !== "light" && preference !== "dark") preference = null;
  const system = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  let current = preference || (system?.matches ? "dark" : "light");

  function apply(value) {
    current = value;
    root.dataset.theme = value;
    root.style.colorScheme = value;
  }

  apply(current);
  window.siteTheme = {
    get current() { return current; },
    toggle() {
      preference = current === "dark" ? "light" : "dark";
      try { localStorage.setItem(storageKey, preference); } catch { /* Toggling still works without persistence. */ }
      apply(preference);
    }
  };
  system?.addEventListener("change", event => {
    if (preference) return;
    apply(event.matches ? "dark" : "light");
    window.dispatchEvent(new Event("site-theme-change"));
  });
})();
