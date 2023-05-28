import React from "react";

const stringComponent = (k, v) => (
  <span>
    {k} : {v}
  </span>
);

const ObjectComponent = (k, v, level) => (
  <>
    <div>{k} :</div>
    <div style={{ marginLeft: `${level * 2}rem` }}>
      <RenderComponent obj={v} level={level + 1} />
    </div>
  </>
);

const RenderComponent = ({ obj, level = 1 }) => {
  return (
    <>
      {Object.entries(obj).map(([k, v]) => {
        return typeof v === "string"
          ? stringComponent(k, v)
          : ObjectComponent(k, v, level);
      })}
    </>
  );
};

export default RenderComponent;
