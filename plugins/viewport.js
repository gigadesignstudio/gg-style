import tokens from "@/assets/css/tokens.json";

function setMq(mq, breakpoints) {
  const breakpointsKeys = Object.keys(breakpoints);

  breakpointsKeys.forEach((key) => {
    mq[key] = window.matchMedia(`(min-width: ${breakpoints[key]})`).matches;
  });

  return mq;
}

export default defineNuxtPlugin(async (nuxtApp) => {
  let mq = Object.keys(tokens.breakpoint).reduce((reducer, key) => {
    return {
      ...reducer,
      [key]: false,
    };
  }, {});

  nuxtApp.hook("app:mounted", () => {
    setMq(mq, tokens.breakpoint);
    window.onresize = () => {
      setMq(mq, tokens.breakpoint);
    };

    document.body.classList.add("loaded");
  });

  return {
    provide: {
      mq,
    },
  };
});
