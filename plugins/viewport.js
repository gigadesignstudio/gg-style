import mq from "../assets/js/viewport/mq";
import viewport from "../assets/js/viewport";
import tokens from "../assets/css/tokens.json";

export default defineNuxtPlugin(() => {
  onNuxtReady(() => {
    viewport(tokens.breakpoint);
    document.body.classList.add('loaded');
  });

  return {
    provide: {
      mq: process.client
        ? mq.value
        : Object.keys(tokens.breakpoint).reduce((reducer, key) => {
          return {
            ...reducer,
            [key]: false,
          };
        }, {}),
    },
  };
});
