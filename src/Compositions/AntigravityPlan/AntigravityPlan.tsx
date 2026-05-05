import React from "react";
import { Series } from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";
import { PlanScene } from "./Scenes/PlanScene";
import { AssistantsScene } from "./Scenes/AssistantsScene";

export const AntigravityPlan: React.FC = () => {
  return (
    <DarkTechBackground>
      <Series>
        {/* Scene 1: The Plan (184 frames) */}
        <Series.Sequence durationInFrames={184}>
          <PlanScene />
        </Series.Sequence>

        {/* Scene 2: The Assistants (101 frames) */}
        <Series.Sequence durationInFrames={101}>
          <AssistantsScene />
        </Series.Sequence>
      </Series>
    </DarkTechBackground>
  );
};
