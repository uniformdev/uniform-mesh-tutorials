import React from "react";
import AbilityScores from "./AbilityScores";
import MonsterProperties from "./MonsterProperties";

export default function DragonDetails({ dragon }) {
  const { name } = dragon;
  return (
    <div className="max-w-7xl mx-auto text-center py-1 px-4 sm:px-6 lg:py-4 lg:px-8">
      <h2 className="text-3xl font-extrabold tracking-tight text-neutral-500 sm:text-4xl">
        <span className="block">{name}</span>
      </h2>
      <div className="mt-2 flex flex-row justify-center">
        <div>
          <AbilityScores monster={dragon} height={250} width={250} />
        </div>
        <div className="text-sm text-left rounded-xl shadow-md mx-5 p-4 bg-gray-100">
          <MonsterProperties monster={dragon} />
        </div>
      </div>
    </div>
  );
}
