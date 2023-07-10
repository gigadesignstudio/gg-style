import { ref } from "vue";

const mq = ref({});

export function setMq(breakpoints) {
  const breakpointsKeys = Object.keys(breakpoints);

  breakpointsKeys.forEach((key) => {
    mq.value[key] = window.matchMedia(
      `(min-width: ${breakpoints[key]})`
    ).matches;
  });

  return mq;
}

export default mq;
