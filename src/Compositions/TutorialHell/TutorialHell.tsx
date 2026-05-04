import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { ClearIdeaScene } from "./Scenes/ClearIdeaScene";
import { TutorialLoopScene } from "./Scenes/TutorialLoopScene";

export const TutorialHell: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020202" }}>
      {/* Scene 1: The Clear Idea (2.5s = 75 frames) */}
      <Sequence from={0} durationInFrames={75}>
        <ClearIdeaScene />
      </Sequence>

      {/* Scene 2: Tutorial Chaos (2.5s = 75 frames) */}
      <Sequence from={75} durationInFrames={75}>
        <TutorialLoopScene />
      </Sequence>
    </AbsoluteFill>
  );
};
