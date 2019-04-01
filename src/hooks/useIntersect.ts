import useIObserver from "./useIObserver";

const baseOption: IntersectionObserverInit = {
  root: null,
  rootMargin: "50px",
  threshold: 0.5
};
const useIntersect = (
  target: React.RefObject<Element>,
  option?: IntersectionObserverInit,
  onIntersect?: (
    entry: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void
) => {
  const callback: IntersectionObserverCallback = (entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      onIntersect && onIntersect(entries, observer);
    }
  };
  useIObserver(callback, { ...baseOption, ...option }, target);
};

export default useIntersect;
