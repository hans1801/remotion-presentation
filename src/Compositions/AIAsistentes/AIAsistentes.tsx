import React from "react";
import {
  AbsoluteFill,
  Series,
  useVideoConfig,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";
import { AssistantCards } from "./Components/AssistantCards";
import { CodeObstacle } from "./Components/CodeObstacle";
import { MasteryHUD } from "./Components/MasteryHUD";

const CYAN = "#00FBFF";

export const AIAsistentes: React.FC = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <DarkTechBackground>
      <Series>
        {/* Part 1: The Assistants (102 frames) */}
        <Series.Sequence durationInFrames={102}>
          <AssistantCards />
        </Series.Sequence>

        {/* Part 2: Breaking the Barrier (67 frames) */}
        <Series.Sequence durationInFrames={67}>
          <CodeObstacle />
        </Series.Sequence>

        {/* Part 3: Mastery (111 frames) */}
        <Series.Sequence durationInFrames={111}>
          <MasteryHUD />
        </Series.Sequence>
      </Series>
    </DarkTechBackground>
  );
};
