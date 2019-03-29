import { useRef, useEffect } from "react";

const usePrevious = <T>(value: T) => {
  const prev = useRef<T | null>(null);
  useEffect(() => {
    prev.current = value;
  }, [value]);

  return prev.current;
};

export default usePrevious;
