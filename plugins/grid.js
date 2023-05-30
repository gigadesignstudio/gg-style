import { setVar, computedProps, setDirective } from "./directives/utils";

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
    const bindingValue = binding.value;

    let classes = ["grid"];
    let vars = {};

    if (!bindingValue) {
      el?.classList?.add(classes.join(", "));
      return;
    }

    if (Array.isArray(bindingValue)) {
      setVar(vars, "g-cols", bindingValue[0]);
      setVar(vars, "g-gap", "gap", bindingValue[1]);
    } else if (typeof bindingValue === "object") {
      if (bindingValue.cols) {
        setVar(vars, "g-cols", bindingValue.cols);
      }

      if (bindingValue.min) {
        setVar(vars, "g-cols", "auto-fill");
        const min = bindingValue.min;
        if (Array.isArray(min)) {
          setVar(vars, "g-min", min[0]);
          if (min[1]) {
            setVar(vars, "g-cols", "auto-fit");
          }
        } else setVar(vars, "g-min", bindingValue.min);
      }

      const gap = bindingValue.gap;
      if (gap) {
        if (Array.isArray(gap)) {
          setVar(vars, "g-row-gap", "gap", gap[0]);
          setVar(vars, "g-col-gap", "gap", gap[1]);
        } else {
          setVar(vars, "g-col-gap", "gap", gap);
          setVar(vars, "g-row-gap", "gap", gap);
        }
      }

      const align = bindingValue.align;
      if (align) {
        if (Array.isArray(align)) {
          setVar(vars, "g-align", distributions.get(align[0]));
          setVar(vars, "g-justify", distributions.get(align[1]));
        } else {
          setVar(vars, "g-align", distributions.get(align));
          setVar(vars, "g-justify", distributions.get(align));
        }
      }
    } else setVar(vars, "g-cols", bindingValue);

    if (el) {
      if (bindingValue?.enabled === false) {
        el.classList.remove(classes.join(", "));
        Object.keys(vars).forEach((k) => el.style.removeProperty(k));
      } else {
        el.classList.add(classes.join(", "));
        Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
      }
    }

    if (bindingValue?.enabled === false) {
      return;
    }

    return computedProps(classes, vars);
  }

  function cols(binding, el = false) {
    const bindingValue = binding.value;

    let classes = ["cols"];
    let vars = {};

    if (!bindingValue) {
      el?.classList?.add(classes.join(", "));
      return;
    }

    const computed = (value) =>
      typeof value === "number" ? `span ${value}` : value;

    if (Array.isArray(bindingValue)) {
      setVar(
        vars,
        "c-cols",
        `${computed(bindingValue[0])} / ${computed(bindingValue[1])}`
      );
    } else {
      setVar(vars, "c-cols", computed(bindingValue));
    }

    if (el) {
      el.classList.add(classes.join(", "));
      Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
    }

    return computedProps(classes, vars);
  }

  function self(binding, el = false) {
    const bindingValue = binding.value;

    let classes = ["self"];
    let vars = {};

    if (Array.isArray(bindingValue)) {
      setVar(vars, "s-align", distributions.get(bindingValue[0]));
      setVar(vars, "s-justify", distributions.get(bindingValue[1]));
    } else {
      setVar(vars, "s-align", distributions.get(bindingValue));
      setVar(vars, "s-justify", distributions.get(bindingValue));
    }

    if (el) {
      el.classList.add(classes.join(", "));
      Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
    }

    return computedProps(classes, vars);
  }

  setDirective(nuxtApp.vueApp, "grid", grid);
  setDirective(nuxtApp.vueApp, "cols", cols);
  setDirective(nuxtApp.vueApp, "self", self);
});
