export default defineNuxtPlugin(() => {
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