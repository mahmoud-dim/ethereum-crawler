import { useState, useEffect } from "react";

export const useFetch = <T,>(fetchFunc: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunc();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred");
        }
        }finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchFunc]);

  return { data, loading, error };
};
