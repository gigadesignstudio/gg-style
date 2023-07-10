import { isSmartphone, checkInstagramHeight } from "./utils.js";
import { setVw, setVh, setVhResized } from "./units.js";
import { setMq } from "./mq.js";

function setViewport(breakpoints) {
  setVw();
  setVh();
  setMq(breakpoints);

  if (!isSmartphone()) {
    setVhResized();
  }
}

export default (breakpoints) => {
  checkInstagramHeight();
  setViewport(breakpoints);
  setVhResized();
  window.onresize = () => {
    setViewport(breakpoints);
  };
  window.onorientationchange = () => {
    setTimeout(() => {
      setVhResized();
    }, 100);
  };
};
