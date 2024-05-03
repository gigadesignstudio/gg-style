export default defineNuxtPlugin((nuxtApp) => {
  function ratio(binding, el = false) {
    let classes = ["ratio"];
    let vars = {};

    if (!binding || binding?.enable === false) {
      return;
    }
    el?.classList?.add(...classes);

    let ref = el;

    if (el && !CSS.supports("aspect-ratio", "1")) {
      const parent = el.parentElement;
      if (!parent.classList.contains("ratio-container")) {
        const container = document.createElement("div");
        container.classList.add("ratio-container");
        container.append(el);
        parent.append(container);
        ref = container;
      }
    }

    if (Array.isArray(binding)) {
      addVar(vars, "r-width", binding[0]);
      addVar(vars, "r-height", binding[1]);
    } else if (typeof binding === "object") {
      if (binding.ratio) {
        const [x, y] = binding.ratio;

        addVar(vars, "r-width", x);
        addVar(vars, "r-height", y);
      }

      if (binding.fit) {
        addVar(vars, "r-fit", binding.fit);
      }
    }

    if (el) {
      if (!binding || binding?.enable === false) {
        el.classList.remove(...classes);
        Object.keys(vars).forEach((k) => ref.style.removeProperty(k));
      } else {
        el.classList.add(...classes);
        Object.entries(vars).forEach(([k, v]) => ref.style.setProperty(k, v));
      }
    }

    return computedProps(classes, vars);
  }

  setDirective(nuxtApp.vueApp, "ratio", ratio);
});
