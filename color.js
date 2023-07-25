export default defineNuxtPlugin((nuxtApp) => {
  function color(binding, el = false) {
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

    return { style: `visibility: ${binding ? "color" : "hidden"}` };
  }

  setDirective(nuxtApp.vueApp, "color", color);
});
