import React, { useEffect, useState } from "react";
import {
  useUniformMeshLocation,
  LoadingOverlay,
} from "@uniformdev/mesh-sdk-react";
import { createClient } from "canvas-monsterpedia";

export default function MonsterListParameterEditor() {
  const { value, setValue, metadata } = useUniformMeshLocation();
  const { parameterDefinition } = metadata;
  const { name, typeConfig } = parameterDefinition;
  const { filter } = typeConfig || {};
  const [monsters, setMonsters] = useState();
  const [loading, setLoading] = useState(false);

  async function onMonsterSelected(e) {
    await setValue({ index: e?.target?.value });
  }

  useEffect(() => {
    setLoading(true);
    async function loadMonsters() {
      try {
        const client = createClient();
        const monsters = await client.getMonsters(filter);
        setMonsters(monsters?.results);
      } finally {
        setLoading(false);
      }
    }
    loadMonsters();
  }, []);

  if (!monsters) return null;

  return (
    <div>
      <LoadingOverlay isActive={loading} />
      <label className="uniform-input-label">{name}</label>
      <select
        className="uniform-input uniform-input-select"
        onChange={onMonsterSelected}
        defaultValue={value?.index}
      >
        <option key="" value=""></option>
        {monsters.map((monster) => {
          const { index, name } = monster;
          return (
            <option key={index} value={index}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
