import { setVar, computedProps, setDirective } from "./directives/utils";

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
    const bindingValue = binding.value;

    let classes = ["layout"];
    let vars = {};

    if (!bindingValue) {
      el?.classList?.add(classes.join(", "));
      return;
    }

    setVar(vars, "l-auto", "minmax(0, 1fr)");

    if (Array.isArray(bindingValue)) {
      setVar(vars, "l-dir", directions.get(bindingValue[0]));
      setVar(vars, "l-gap", "gap", bindingValue[1]);
    } else if (typeof bindingValue === "object") {
      if (bindingValue.gap) {
        setVar(vars, "l-gap", "gap", bindingValue.gap);
      }

      if (bindingValue.dir) {
        if (bindingValue.dir === "o") {
          classes.push("overlap");
        } else {
          classes.filter((c) => c !== "overlap");
          setVar(vars, "l-dir", directions.get(bindingValue.dir));
        }
      }

      if (bindingValue.fluid) {
        setVar(vars, "l-auto", "initial");
      }

      const align = bindingValue.align;
      if (align) {
        if (Array.isArray(align)) {
          if (align[0]) {
            setVar(vars, "l-align", distributions.get(align[0]));
          }
          if (align[1]) {
            setVar(vars, "l-justify", distributions.get(align[1]));
          }
          if (align.includes("even")) {
            setVar(vars, "l-auto", "initial");
          }
        } else {
          if (align === "even") {
            setVar(vars, "l-auto", "initial");
          }
          setVar(vars, "l-align", distributions.get(align));
          setVar(vars, "l-justify", distributions.get(align));
        }
      }
    } else if (bindingValue === "o") {
      classes.push("overlap");
    } else {
      setVar(vars, "l-dir", directions.get(bindingValue));
    }

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

  setDirective(nuxtApp.vueApp, "lay", lay);
});
