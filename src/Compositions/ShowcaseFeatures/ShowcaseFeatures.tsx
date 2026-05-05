import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";
import { SceneInfografias } from "./Scenes/SceneInfografias";
import { SceneReportes } from "./Scenes/SceneReportes";
import { SceneSubtitulos } from "./Scenes/SceneSubtitulos";

export const ShowcaseFeatures: React.FC = () => {
  return (
    <DarkTechBackground>
      <AbsoluteFill>
        {/* Scene 1: Infografias (60 frames) */}
        <Sequence durationInFrames={60}>
          <SceneInfografias />
        </Sequence>

        {/* Scene 2: Reportes Visuales (70 frames) */}
        <Sequence from={60} durationInFrames={70}>
          <SceneReportes />
        </Sequence>

        {/* Scene 3: Subtitulos dinamicos (80 frames) */}
        <Sequence from={60 + 70} durationInFrames={80}>
          <SceneSubtitulos />
        </Sequence>
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
