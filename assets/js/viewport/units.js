import { isSmartphone, isInstagram } from "./utils.js";

export function setVhResized() {
  if (isSmartphone() && !isInstagram()) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  } else {
    document.documentElement.style.setProperty("--vh", "1vh");
  }
}

export function setVh() {
  if (isSmartphone() && !isInstagram()) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh-resized", `${vh}px`);
  } else if (isInstagram()) {
    const vh =
      getComputedStyle(document.documentElement).getPropertyValue(
        "--instagram-vh"
      ) * 0.01;
    document.documentElement.style.setProperty("--vh-resized", `${vh}px`);
  } else {
    document.documentElement.style.setProperty("--vh-resized", "1vh");
  }
}

export function setVw() {
  const oldWidth = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--vw");
  const newWidth = `${
    (window.innerWidth - (window.innerWidth - document.body.clientWidth)) / 100
  }px`;

  if (newWidth !== oldWidth) {
    document.documentElement.style.setProperty("--vw", newWidth);
  }
}
