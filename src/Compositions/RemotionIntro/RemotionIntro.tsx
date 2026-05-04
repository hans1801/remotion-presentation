import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { LogoScene } from "./Scenes/LogoScene";
import { BrowserScene } from "./Scenes/BrowserScene";

export const RemotionIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#020202" }}>
      {/* Scene 1: Logo (49 frames) */}
      <Sequence from={0} durationInFrames={49}>
        <LogoScene />
      </Sequence>

      {/* Scene 2: Browser Video (150 + 12 = 162 frames) */}
      <Sequence from={49} durationInFrames={162}>
        <BrowserScene />
      </Sequence>
    </AbsoluteFill>
  );
};
