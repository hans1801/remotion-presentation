import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { TextScene } from "./Scenes/TextScene";

export const AutomationQuestion: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* ¿Existe una forma… (1.2seg = 36 frames) */}
      <Sequence from={0} durationInFrames={36}>
        <TextScene text="¿Existe una forma…" duration={36} />
      </Sequence>

      {/* de hacerlo más rápido… (1.2 seg = 36 frames) */}
      <Sequence from={36} durationInFrames={36}>
        <TextScene text="de hacerlo más rápido…" duration={36} />
      </Sequence>

      {/* incluso automatizarlo (2 seg = 60 frames) */}
      <Sequence from={72} durationInFrames={60}>
        <TextScene text="incluso automatizarlo" duration={60} />
      </Sequence>

      {/* sin ser un experto en edición? (2.25 seg = 68 frames) */}
      <Sequence from={132} durationInFrames={68}>
        <TextScene text="sin ser un experto en edición?" duration={68} />
      </Sequence>
    </AbsoluteFill>
  );
};
