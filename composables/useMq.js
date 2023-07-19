import tokens from "@/assets/css/tokens.json";
import { createSharedComposable, useMediaQuery } from "@vueuse/core";
export const useMq = createSharedComposable(() => {
  const breakpoints = tokens.breakpoint;
  if (breakpoints) {
    const mq = reactive(
      Object.keys(tokens.breakpoint).reduce((reducer, key) => {
        return {
          ...reducer,
          [key]: false,
        };
      }, {})
    );

    Object.keys(mq).forEach((key) => {
      mq[key] = useMediaQuery(`(min-width: ${tokens.breakpoint[key]})`);
    });

    return mq;
  } else {
    console.warn("WARN: useMq has no breakpoints. It will return an empty object");
    return {};
  }
});
