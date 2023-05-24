import React from "react";

const ListData = ({ data, hasMore, loading, error, lastElementRef }) => {
  return (
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
  );
};

export default ListData;
