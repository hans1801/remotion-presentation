import React from "react";
import { AbsoluteFill } from "remotion";
import { HypnozScene } from "./Scenes/HypnozScene";

export const HypnozIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020202" }}>
      <HypnozScene />
    </AbsoluteFill>
  );
};
