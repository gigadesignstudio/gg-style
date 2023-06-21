export default defineNuxtPlugin((nuxtApp) => {
  const distributions = new Map([
    ["start", "start"],
    ["center", "center"],
    ["end", "end"],
    ["even", "space-between"],
    ["", "initial"],
    ["initial", "initial"],
  ]);

  function grid(binding, el = false) {
    let classes = ["grid"];
    let vars = {};

    if (!binding) {
      el?.classList?.add(...classes);
      return;
    }

    if (Array.isArray(binding)) {
      addVar(vars, "g-cols", binding[0]);
      addVar(vars, "g-gap", "gap", binding[1]);
    } else if (typeof binding === "object") {
      if (binding.cols) {
        addVar(vars, "g-cols", binding.cols);
      }

      if (binding.min) {
        addVar(vars, "g-cols", "auto-fill");
        const min = binding.min;
        if (Array.isArray(min)) {
          addVar(vars, "g-min", min[0]);
          if (min[1]) {
            addVar(vars, "g-cols", "auto-fit");
          }
        } else addVar(vars, "g-min", binding.min);
      }

      const gap = binding.gap;
      if (gap) {
        if (Array.isArray(gap)) {
          addVar(vars, "g-row-gap", "gap", gap[0]);
          addVar(vars, "g-col-gap", "gap", gap[1]);
        } else {
          addVar(vars, "g-col-gap", "gap", gap);
          addVar(vars, "g-row-gap", "gap", gap);
        }
      }

      const align = binding.align;
      if (align) {
        if (Array.isArray(align)) {
          addVar(vars, "g-align", distributions.get(align[0]));
          addVar(vars, "g-justify", distributions.get(align[1]));
        } else {
          addVar(vars, "g-align", distributions.get(align));
          addVar(vars, "g-justify", distributions.get(align));
        }
      }
    } else addVar(vars, "g-cols", binding);

    if (el) {
      if (binding?.enabled === false) {
        el.classList.remove(...classes);
        Object.keys(vars).forEach((k) => el.style.removeProperty(k));
      } else {
        el.classList.add(...classes);
        Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
      }
    }

    if (binding?.enabled === false) {
      return;
    }

    return computedProps(classes, vars);
  }

  function cols(binding, el = false) {
    let classes = ["cols"];
    let vars = {};

    if (!binding) {
      el?.classList?.add(...classes);
      return;
    }

    const computed = (value) =>
      typeof value === "number" ? `span ${value}` : value;

    if (Array.isArray(binding)) {
      addVar(
        vars,
        "c-cols",
        `${computed(binding[0])} / ${computed(binding[1])}`
      );
    } else {
      addVar(vars, "c-cols", computed(binding));
    }

    if (el) {
      el.classList.add(...classes);
      Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
    }

    return computedProps(classes, vars);
  }

  function self(binding, el = false) {
    let classes = ["self"];
    let vars = {};

    if (Array.isArray(binding)) {
      addVar(vars, "s-align", distributions.get(binding[0]));
      addVar(vars, "s-justify", distributions.get(binding[1]));
    } else {
      addVar(vars, "s-align", distributions.get(binding));
      addVar(vars, "s-justify", distributions.get(binding));
    }

    if (el) {
      el.classList.add(...classes);
      Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
    }

    return computedProps(classes, vars);
  }

  setDirective(nuxtApp.vueApp, "grid", grid);
  setDirective(nuxtApp.vueApp, "cols", cols);
  setDirective(nuxtApp.vueApp, "self", self);
});
