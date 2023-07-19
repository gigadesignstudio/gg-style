export default defineNuxtPlugin((nuxtApp) => {
  const mq = useMq();
  nuxtApp.hook("app:mounted", () => {
    document.body.classList.add("loaded");
  });
  return {
    provide: {
      mq,
    },
  };
});
