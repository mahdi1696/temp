import { useState, useTransition, useCallback } from "react";
export const useApiCall = <T,>(
  initStatus: "loading" | "data" | "error" = "loading"
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<null | string>(null);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"loading" | "data" | "error">(
    initStatus
  );

  const getData = useCallback((fetchMethod: () => Promise<T> | T) => {~
    setStatus("loading");
    startTransition(async () => {
      try {
        setError(null);
        const result = await fetchMethod();
        setData(result);
        setStatus("data");
      } catch (error: any) {
        setError(error?.message);
        setStatus("error");
      }
    });
  }, []);

  return { data, error, pending, status, getData };
};
