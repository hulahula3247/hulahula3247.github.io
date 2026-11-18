(() => {
  "use strict";
  const theme = window.siteTheme;
  const toggle = theme.toggle.bind(theme);
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  let running = false;

  theme.toggle = () => {
    if (running) return;
    const supportsMask = window.CSS?.supports("mask-image", "linear-gradient(#000, transparent)");
    if (!document.startViewTransition || !supportsMask || reducedMotion?.matches || document.visibilityState === "hidden") {
      toggle();
      return;
    }

    let applied = false;
    const update = () => {
      if (applied) return;
      applied = true;
      toggle();
      // The snapshot update runs after the original button handler has returned.
      window.dispatchEvent(new Event("site-theme-change"));
    };
    running = true;
    try {
      const transition = document.startViewTransition(update);
      transition.ready.catch(() => {});
      transition.updateCallbackDone.catch(() => {
        update();
        running = false;
      });
      transition.finished.then(
        () => { running = false; },
        () => { running = false; }
      );
    } catch {
      running = false;
      update();
    }
  };
})();
