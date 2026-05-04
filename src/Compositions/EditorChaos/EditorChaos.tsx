import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PowerfulStatsScene } from "./Scenes/PowerfulStatsScene";
import { EditorTimelineScene } from "./Scenes/EditorTimelineScene";

export const EditorChaos: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#050505" }}>
      {/* Escena 1: Potent Stats & Metrics (3.75s = 113 frames) */}
      <Sequence from={0} durationInFrames={113}>
        <PowerfulStatsScene />
      </Sequence>
      
      {/* Escena 2: Editor Timeline & Time Drain (3.25s = 97 frames) */}
      <Sequence from={113} durationInFrames={97}>
        <EditorTimelineScene />
      </Sequence>
    </AbsoluteFill>
  );
};
