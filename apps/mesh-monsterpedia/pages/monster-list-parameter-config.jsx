import React from "react";
import { useUniformMeshLocation } from "@uniformdev/mesh-sdk-react";

export default function MonsterListParameterConfig() {
  const { value, setValue } = useUniformMeshLocation();
  async function onChangeFilter(e) {
    await setValue({ filter: e.target.value });
  }
  return (
    <div>
      <label className="uniform-input-label" htmlFor="filter">
        Filter
      </label>
      <input
        className="uniform-input uniform-input-text"
        id="filter"
        onChange={onChangeFilter}
        placeholder="Enter a value to include monsters with a matching name"
        value={value?.filter}
      />
      <p className="text-xs text-green-500">
        This filtering is very basic. Only enter one word &amp; no wildcards.
      </p>
    </div>
  );
}
