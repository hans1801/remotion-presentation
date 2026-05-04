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
        {/* Scene 1: Infografias (45 frames) */}
        <Sequence durationInFrames={45}>
          <SceneInfografias />
        </Sequence>

        {/* Scene 2: Reportes Visuales (52 frames) */}
        <Sequence from={45} durationInFrames={52}>
          <SceneReportes />
        </Sequence>

        {/* Scene 3: Subtitulos dinamicos (56 frames) */}
        <Sequence from={45 + 52} durationInFrames={56}>
          <SceneSubtitulos />
        </Sequence>
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
