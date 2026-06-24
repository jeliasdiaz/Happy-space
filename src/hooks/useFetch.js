import { useCallback, useEffect, useRef, useState } from "react";
import { useCounter } from "./useCounter";

export const useFetch = (url, API_KEY) => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { counter, increment } = useCounter(1);
  const loaderRef = useRef(null);

  const getUrl = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${url}${API_KEY}&page=${counter}`);
      const data = await res.json();
      setUrls((prev) => {
        const seen = new Set(prev.map((img) => img.id));
        return [...prev, ...data.filter((img) => !seen.has(img.id))];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [API_KEY, counter, url]);

  useEffect(() => {
    getUrl();
  }, [getUrl]);

  // Scroll infinito: carga la siguiente página al acercarse al fondo.
  useEffect(() => {
    const node = loaderRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) increment();
      },
      { rootMargin: "300px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isLoading, increment]);

  return {
    isLoading,
    urls,
    loaderRef,
  };
};
