export default defineNuxtPlugin((nuxtApp) => {
  const directions = new Map([
    ["h", "column"],
    ["v", "row"],
  ]);

  const distributions = new Map([
    ["start", "start"],
    ["center", "center"],
    ["end", "end"],
    ["even", "space-between"],
    ["", "initial"],
    ["initial", "initial"],
  ]);

  function lay(binding, el = false) {
    let classes = ["layout"];
    let vars = {};

    if (!binding) {
      el?.classList?.add(classes.join(","));
      return;
    }

    addVar(vars, "l-auto", "minmax(0, 1fr)");

    if (Array.isArray(binding)) {
      addVar(vars, "l-dir", directions.get(binding[0]));
      addVar(vars, "l-gap", "space", binding[1]);
    } else if (typeof binding === "object") {
      if (binding.gap) {
        addVar(vars, "l-gap", "space", binding.gap);
      }

      if (binding.dir) {
        if (binding.dir === "o") {
          classes.push("overlap");
        } else {
          classes.filter((c) => c !== "overlap");
          addVar(vars, "l-dir", directions.get(binding.dir));
        }
      }

      if (binding.fluid) {
        addVar(vars, "l-auto", "initial");
      }

      const align = binding.align;
      if (align) {
        if (Array.isArray(align)) {
          if (align[0]) {
            addVar(vars, "l-align", distributions.get(align[0]));
          }
          if (align[1]) {
            addVar(vars, "l-justify", distributions.get(align[1]));
          }
          if (align.includes("even")) {
            addVar(vars, "l-auto", "initial");
          }
        } else {
          if (align === "even") {
            addVar(vars, "l-auto", "initial");
          }
          addVar(vars, "l-align", distributions.get(align));
          addVar(vars, "l-justify", distributions.get(align));
        }
      }
    } else if (binding === "o") {
      classes.push("overlap");
    } else {
      classes.filter((c) => c !== "overlap");
      addVar(vars, "l-dir", directions.get(binding));
    }

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

  setDirective(nuxtApp.vueApp, "lay", lay);
});
