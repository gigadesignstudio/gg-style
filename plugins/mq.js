import { watchOnce } from "@vueuse/core";

export default defineNuxtPlugin(() => {
  const mq = useMq();
  onNuxtReady(() => {
    watchOnce(
      mq,
      (v) => {
        if (process.client) {
          document.body.classList.add("loaded");
        }
      },
      {
        immediate: true,
      }
    );
  });

  return {
    provide: {
      mq,
    },
  };
});
