export default fn => {
  let lastArgs = [];
  let frameId = null;
  const wrapperFn = (...args) => {
    lastArgs = args;
    if (frameId) {
      return;
    }
    frameId = requestAnimationFrame(() => {
      frameId = null;
      fn(...lastArgs);
    });
  };
  return wrapperFn;
};
