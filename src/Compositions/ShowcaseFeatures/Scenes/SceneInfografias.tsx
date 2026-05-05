import React from "react";
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from "remotion";
import { FeatureTitle } from "../Components/FeatureTitle";
import { VideoContainer } from "../Components/VideoContainer";

export const SceneInfografias: React.FC = () => {
  const { width } = useVideoConfig();
  const frame = useCurrentFrame();
  const s = width / 1280;

  // Premium slow zoom
  const scale = interpolate(frame, [0, 60], [1, 1.05]);

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      gap: 60 * s,
      padding: 100 * s,
      transform: `scale(${scale})`,
    }}>
      <FeatureTitle title="Infografías Dinámicas" />
      <VideoContainer
        src="assets/samples/infografia.mp4"
        widthPercent={70}
        startFrom={130}
      />

      {/* Visual detail: tech line */}
      <div style={{
        position: "absolute",
        bottom: 50 * s,
        width: "30%",
        height: 2 * s,
        background: "linear-gradient(90deg, transparent, #00FBFF, transparent)",
        opacity: 0.5,
      }} />
    </AbsoluteFill>
  );
};
