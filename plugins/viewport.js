import tokens from "../assets/css/tokens.json";

function setMq(mq, breakpoints) {
  const breakpointsKeys = Object.keys(breakpoints);

  breakpointsKeys.forEach((key) => {
    mq.value[key] = window.matchMedia(
      `(min-width: ${breakpoints[key]})`
    ).matches;
  });

  return mq;
}

export default defineNuxtPlugin(() => {
  const mq = ref({});

  onNuxtReady(() => {
    if (process.client) {
      setMq(mq, tokens.breakpoint)
      window.onresize = () => {
        setMq(mq, tokens.breakpoint)
      };
  
      document.body.classList.add('loaded');
    } else {
      mq.value = Object.keys(tokens.breakpoint).reduce((reducer, key) => {
        return {
          ...reducer,
          [key]: false,
        };
      }, {})
    }
  });

  return {
    provide: {
      mq,
    },
  };
});
