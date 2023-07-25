export default defineNuxtPlugin((nuxtApp) => {
  const spacingVariations = new Map([
    ["all", ["top", "right", "bottom", "left"]],
    ["x", ["right", "left"]],
    ["y", ["top", "bottom"]],
    ["top", ["top"]],
    ["right", ["right"]],
    ["bottom", ["bottom"]],
    ["left", ["left"]],
  ]);

  function setSpacingVariables(type, vars, key, value) {
    spacingVariations.get(key).forEach((variation) => addVar(vars, `${type.charAt(0)}-${variation}`, "space", value));
  }

  function spacingDirective(type, binding, el) {
    let classes = [type];
    let vars = {};

    if (!binding) {
      el?.classList?.add(...classes);
      return;
    }

    if (Array.isArray(binding)) {
      if (binding.length === 1) {
        setSpacingVariables(type, vars, "all", binding[0]);
      }
      if (binding.length === 2) {
        setSpacingVariables(type, vars, "y", binding[0]);
        setSpacingVariables(type, vars, "x", binding[1]);
      }
      if (binding.length === 4) {
        setSpacingVariables(type, vars, "top", binding[0]);
        setSpacingVariables(type, vars, "right", binding[1]);
        setSpacingVariables(type, vars, "bottom", binding[2]);
        setSpacingVariables(type, vars, "left", binding[3]);
      }
    } else if (typeof binding === "object") {
      Object.entries(binding).forEach(([k, v]) => setSpacingVariables(type, vars, k, v));
    } else setSpacingVariables(type, vars, "all", binding);

    if (el) {
      el.classList.add(...classes);
      Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
    }

    return computedProps(classes, vars);
  }

  // Spacer (margins)
  nuxtApp.vueApp.directive("space", {
    mounted(el, { value }) {
      spacingDirective("spacer", value, el);
    },
    updated(el, { value }) {
      spacingDirective("spacer", value, el);
    },
    getSSRProps({ value }) {
      return spacingDirective("spacer", value);
    },
  });

  // Padder (margins)
  nuxtApp.vueApp.directive("pad", {
    mounted(el, { value }) {
      spacingDirective("padder", value, el);
    },
    updated(el, { value }) {
      spacingDirective("padder", value, el);
    },
    getSSRProps({ value }) {
      return spacingDirective("padder", value);
    },
  });
});
