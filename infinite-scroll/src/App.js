import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";

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
      <div style={{ height: "90vh", overflow: "scroll" }}>
        {data.map((d, i) => {
          if (i === data.length - 1) {
            return (
              <p
                ref={lastElementRef}
                key={d.key + i}
                style={{ color: "white", backgroundColor: "blue" }}
              >
                {d.title}
              </p>
            );
          } else return <p key={d.key + i}>{d.title}</p>;
        })}
        {loading && <p>loading...</p>}
        {error && <p>Error</p>}
        {!hasMore && !loading && <p>**End of List**</p>}
      </div>
    </div>
  );
}

export default App;
