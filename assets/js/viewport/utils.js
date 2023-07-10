export const isSmartphone = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
  (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

export const isInstagram = () => navigator.userAgent.match(/instagram/i);

export const checkInstagramHeight = () => {
  if (isInstagram()) {
    const heightBlock = document.createElement('div');
    const style = {
      position: 'fixed',
      top: 0,
      right: 0,
      left: 0,
      height: '-webkit-fill-available',
    };
    Object.assign(heightBlock.style, style);

    document.body.appendChild(heightBlock);

    const vh = heightBlock.clientHeight;
    document.documentElement.style.setProperty('--instagram-vh', vh);

    heightBlock.parentNode.removeChild(heightBlock);
  }
};
