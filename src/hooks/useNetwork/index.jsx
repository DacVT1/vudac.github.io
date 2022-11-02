import { useEffect, useState } from "react";

export default function useNetwork() {
  let ol=window.navigator.onLine;
  const [isOnline, setNetwork] = useState(window.navigator.onLine);
  useEffect(() => {
    setNetwork(window.navigator.onLine);
  }, [ol]);
  return { isOnline };
}
