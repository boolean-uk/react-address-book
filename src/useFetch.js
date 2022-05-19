import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsPending(true);

    setTimeout(function() {
      const fetchData = async () => {
        try {
          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) {
            // 404 response returned resource not found
            throw new Error(res.statusText); // throwing an error fires catch block, passing in error
          }
          const jsonData = await res.json();

          setIsPending(false);
          setData(jsonData);
          setError(null);
        } catch (err) {
            if (err.name === "AbortError") {
              console.log("the fetch was aborted");
            } else {
              setIsPending(false);
              setError("Could not fetch the data");
            }
          }
      };
      fetchData();
    }, 1000);

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isPending, error };
}; 