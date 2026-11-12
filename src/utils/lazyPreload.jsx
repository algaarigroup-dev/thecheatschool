import React, { lazy } from "react";

// Like React.lazy, but the page can be loaded ahead of the first render.
// main.jsx preloads the current page before React starts, so the
// prerendered HTML is swapped for an identical live page with no loader flash.
export default function lazyPreload(loader) {
  let Loaded = null;
  const load = () =>
    loader().then((m) => {
      Loaded = m.default;
      return m;
    });
  const Lazy = lazy(load);
  const Component = (props) => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  Component.preload = load;
  return Component;
}
