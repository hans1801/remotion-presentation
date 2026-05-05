import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";

export const AIVsRemotion: React.FC = () => {
  return (
    <DarkTechBackground>
      <AbsoluteFill>
        {/* Scene 1: IA Inconsistency — Part 1 (140f) + Part 2 (131f) */}
        <Sequence durationInFrames={271}>
          <Scene1 />
        </Sequence>

        {/* Scene 2: Remotion Precision — Part 1 (193f) + Part 2 (180f) */}
        <Sequence from={271} durationInFrames={373}>
          <Scene2 />
        </Sequence>

        {/* Scene 3: Conclusion */}
        <Sequence from={271 + 373} durationInFrames={143}>
          <Scene3 />
        </Sequence>
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
