import DragonDetails from "../components/DragonDetails";

export default function resolveRenderer({ type }) {
  if (type == "dragonDetails") {
    return DragonDetails;
  }
  return UnknownComponent;
}

function UnknownComponent({ component }) {
  return <div>[unknown component: {component.type}]</div>;
}
