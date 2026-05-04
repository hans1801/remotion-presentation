import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";
import { IALogoCard } from "./Components/IALogoCard";

export const IADemonstration: React.FC = () => {
  const { width, height } = useVideoConfig();
  const s = width / 1280;

  return (
    <DarkTechBackground>
      <AbsoluteFill style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 30 * s,
      }}>
        {/* Veo 3 - Frame 0 */}
        <IALogoCard
          logoUrl="ias_logo/veo_3_logo.png"
          name="Veo 3"
          delay={0}
          logoScale={4}
        />

        {/* Kling AI - Frame 31 */}
        <IALogoCard
          logoUrl="ias_logo/kling_ai_logo.png"
          name="Kling AI"
          delay={31}
          logoScale={2.2}
        />

        {/* Sora 2 - Frame 57 (31 + 26) */}
        <IALogoCard
          logoUrl="ias_logo/sora_2_logo.png"
          name="Sora 2"
          delay={57}
          logoScale={3}
        />
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
