export function setVar(vars, name, variable, value) {
  if (variable) {
    vars[`--${name}`] = value ? `var(--${variable}-${value})` : variable;
  }
}

export const computedProps = (classes, vars) => ({
  class: classes.join(" "),
  style: Object.entries(vars).reduce(
    (r, [k, v]) => `${r}${v ? `${k}: ${v};` : ""}`,
    ""
  ),
});

export function setDirective(vueApp, name, directive) {
  vueApp.directive(name, {
    mounted(el, binding) {
      directive(binding, el);
    },
    updated(el, binding) {
      directive(binding, el);
    },
    getSSRProps(binding) {
      return directive(binding);
    },
  });
}
