import { watchOnce } from "@vueuse/core";

export default defineNuxtPlugin(() => {
  const mq = useMq();
  watchOnce(
    mq,
    (v) => {
      if (process.client && Object.values(v).length) {
        nextTick(() => {
          document.body.classList.add("loaded");
        });
      }
    },
    {
      immediate: true,
    }
  );

  return {
    provide: {
      mq,
    },
  };
});
