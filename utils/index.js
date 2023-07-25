export function addVar(vars, name, variable, value) {
  if (variable) {
    vars[`--${name}`] = value ? `var(--${variable}-${value})` : variable;
  }
}

export function setVar(el, name, variable, value) {
  if (variable) {
    el.style.setProperty(
      `--${name}`,
      value ? `var(--${variable}-${value})` : variable
    );
  }
}

export const computedProps = (classes, vars) => ({
  class: classes.join(" "),
  style: Object.entries(vars).reduce(
    (r, [k, v]) => `${r}${v ? `${k}: ${v};` : ""}`,
    ""
  ),
});

export function setDirective(
  vueApp,
  name,
  directive,
  hooks = ["mounted", "updated"]
) {
  vueApp.directive(name, {
    mounted(el, { value }) {
      if (hooks.includes("mounted")) {
        directive(value, el, "mounted");
      }
    },
    updated(el, { value }) {
      if (hooks.includes("updated")) {
        directive(value, el, "updated");
      }
    },
    getSSRProps(binding) {
      return directive(binding.value);
    },
  });
}
