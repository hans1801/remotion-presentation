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
        {/* Scene 1: IA Inconsistency */}
        <Sequence durationInFrames={151}>
          <Scene1 />
        </Sequence>

        {/* Scene 2: Remotion Precision */}
        <Sequence from={151} durationInFrames={353}>
          <Scene2 />
        </Sequence>

        {/* Scene 3: Conclusion */}
        <Sequence from={151 + 353} durationInFrames={143}>
          <Scene3 />
        </Sequence>
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
