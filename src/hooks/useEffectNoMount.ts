import { useRef, useEffect } from "react";

export const useEffectNoMount = (
  cb: () => void,
  dependencies: React.DependencyList,
) => {
  const isMounting = useRef(true);

  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }
    cb();
  }, dependencies);
};
