import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SocialGridScene } from "./Scenes/SocialGridScene";
import { NetworkKpiScene } from "./Scenes/NetworkKpiScene";
import { RetentionScene } from "./Scenes/RetentionScene";
import { DarkTechBackground } from "../../Components/DarkTechBackground";

export const MetaphorRetention: React.FC = () => {
  return (
    <DarkTechBackground>
      <AbsoluteFill>
        <Sequence from={0} durationInFrames={60}>
          <SocialGridScene />
        </Sequence>
        <Sequence from={60} durationInFrames={120}>
          <NetworkKpiScene />
        </Sequence>
        <Sequence from={180} durationInFrames={100}>
          <RetentionScene />
        </Sequence>
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
