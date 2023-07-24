export default defineNuxtPlugin((nuxtApp) => {
  const mq = useMq();
  watchEffect(() => {
    if (process.client) {
      nextTick(() => {
        document.body.classList.add("loaded");
      });
    }
  });

  return {
    provide: {
      mq,
    },
  };
});
