export default defineNuxtPlugin((nuxtApp) => {
  function visible(binding, el = false) {
    if (el) {
      el.style.visibility = binding ? "visible" : "hidden";
    }

    return { style: `visibility: ${binding ? "visible" : "hidden"}` };
  }

  setDirective(nuxtApp.vueApp, "visible", visible);
});
