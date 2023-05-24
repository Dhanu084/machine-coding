import React, { useEffect, useState } from "react";

const useFetch = (url, query, page) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      const { docs, numFound } = jsonData;
      setData([...data, ...docs]);
      if (numFound > data.length + docs.length) setHasMore(true);
      else setHasMore(false);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!query.length) {
      setData([]);
      return;
    }
    const timer = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [query, page]);
  return { loading, data, hasMore, error };
};

export default useFetch;
