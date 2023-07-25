export default defineNuxtPlugin((nuxtApp) => {
  const computedHeight = (content) => {
    let value = content.scrollHeight;
    const contentChildren = Array.from(content.children);
    if (contentChildren.length) {
      value = contentChildren
        .map((child) => child.scrollHeight)
        .reduce((r, v) => r + v);
    }
    return value;
  };

  function handleAccordion(event, el, content, multiple) {
    if (event?.detail?.index === parseInt(el.dataset.index)) {
      toggle(el, content);
    } else if (
      (el.classList.contains("open") && !multiple) ||
      (el.classList.contains("open") && !event?.detail?.index)
    ) {
      const height = computedHeight(content);
      close(el, height);
    }
  }

  function open(el, height) {
    const speed = parseFloat(
      getComputedStyle(el).getPropertyValue("--a-speed")
    );
    setVar(el, "a-height", `${height}px`);
    el.classList.add("open");

    setTimeout(() => {
      setVar(el, "a-height", "auto");
      el.classList.add("ready");
    }, speed * 1000);
  }

  function close(el, height) {
    setVar(el, "a-height", `${height}px`);
    setTimeout(() => {
      setVar(el, "a-height", "0px");
      el.classList.remove("open");
      el.classList.remove("ready");
    }, 0);
  }

  function toggle(el, content) {
    const height = computedHeight(content);

    if (!el.classList.contains("open")) {
      open(el, height);
    } else close(el, height);
  }

  function accordion(binding, el = false, hook) {
    if (!el) {
      return { style: "display: none" };
    } else el.style.removeProperty("display");

    let group = false;
    let multiple = false;

    if (typeof binding === "object") {
      if (binding.group) {
        group = binding.group;
      }
      if (binding.multiple) {
        multiple = true;
      }
      if (binding.speed) {
        setVar(el, "a-speed", `${binding.speed}s`);
      }
    } else if (binding) {
      group = binding;
    }

    const trigger = el.children[0];
    const content = el.children[1];

    el.classList.add("accordion");
    trigger.classList.add("trigger");
    content.classList.add("content");

    if (group) {
      el.dataset.group = group;
      const accordions = Array.from(
        document.body.querySelectorAll(`[data-group=${group}]`)
      );
      accordions.forEach((a, i) => (a.dataset.index = i + 1));
      if (hook === "mounted") {
        window.addEventListener(`accordion:${group}`, (event) =>
          handleAccordion(event, el, content, multiple)
        );
      }
    }

    if (hook === "mounted") {
      trigger.addEventListener("click", () => {
        if (group) {
          window.dispatchEvent(
            new CustomEvent(`accordion:${group}`, {
              detail: { index: parseInt(el.dataset.index) },
            })
          );
        } else toggle(el, content);
      });
    }

    if (binding?.enabled === false) {
      el.classList.remove("accordion");
      trigger.classList.remove("trigger");
      content.classList.remove("content");
    }
  }

  setDirective(nuxtApp.vueApp, "accordion", accordion);
});
