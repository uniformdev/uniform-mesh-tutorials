import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Characteristics({ monster, height, width }) {
  const data = getData(monster);
  return (
    <div>
      <Radar width={width} height={height} data={data} options={{ scales: { r: { max: 30 } }, aspectRatio: false }} />
    </div>
  );
}

function getData(monster) {
  const {
    strength,
    dexterity,
    constitution,
    intelligence,
    wisdom,
    charisma,
  } = monster;
  return {
    labels: [
      "Strength",
      "Dexterity",
      "Constitution",
      "Intelligence",
      "Wisdom",
      "Charisma",
    ],
    datasets: [
      {
        label: "Points",
        data: [
          strength,
          dexterity,
          constitution,
          intelligence,
          wisdom,
          charisma,
        ],
        backgroundColor: "rgba(255, 127, 63, 0.2)",
        borderColor: "rgba(255, 127, 63)",
        borderWidth: 1,
      },
    ],
  };
}

