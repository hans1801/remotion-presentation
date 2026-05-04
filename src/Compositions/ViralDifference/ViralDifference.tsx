import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PivotScene } from "./Scenes/PivotScene";
import { ComparisonScene } from "./Scenes/ComparisonScene";

export const ViralDifference: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020202" }}>
      {/* Scene 1: The Macro Analysis (2.5s) */}
      <Sequence from={0} durationInFrames={75}>
        <PivotScene />
      </Sequence>

      {/* Scene 2: The Divergence (4s) */}
      <Sequence from={75} durationInFrames={120}>
        <ComparisonScene />
      </Sequence>
    </AbsoluteFill>
  );
};
