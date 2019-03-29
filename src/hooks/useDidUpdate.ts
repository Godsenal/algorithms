import { useEffect } from "react";
import usePrevious from "./usePrevious";

const useDidUpdate = <T>(
  value: T,
  didUpdate?: (prev: T | null, curr: T) => void
) => {
  const prev = usePrevious(value);
  useEffect(() => {
    if (prev !== value) {
      didUpdate && didUpdate(prev, value);
    }
  }, [prev]);
};

export default useDidUpdate;
