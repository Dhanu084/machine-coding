import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import ListData from "./ListData";

const URL = "https://openlibrary.org/search.json";
const OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 0
};

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const url = `${URL}?q=${query}&page=${page}`;
  const { loading, data, error, hasMore } = useFetch(url, query, page);
  const lastElementRef = useRef(null);

  const observerCallback = useCallback(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    let observer;
    if (lastElementRef.current) {
      observer = new IntersectionObserver(observerCallback, OPTIONS);
      observer.observe(lastElementRef.current);
    }
    return () => {
      if (lastElementRef.current && observer) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [lastElementRef, observerCallback, query]);

  return (
    <div className='App'>
      <div>
        <input
          style={{ display: "inline-block", padding: "10px" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ListData
        loading={loading}
        data={data}
        error={error}
        hasMore={hasMore}
        lastElementRef={lastElementRef}
      />
    </div>
  );
}

export default App;
