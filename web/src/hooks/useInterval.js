import { useEffect, useRef } from "react";

const useInterval = (callback, duration) => {
  const callbackRef = useRef();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!duration) {
      return;
    }

    const intervalId = setInterval(
      (...args) => callbackRef.current(...args),
      duration
    );
    return () => clearInterval(intervalId);
  }, [duration]);
};

export default useInterval;
