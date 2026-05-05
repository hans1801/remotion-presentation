import React from "react";
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate } from "remotion";
import { FeatureTitle } from "../Components/FeatureTitle";
import { VideoContainer } from "../Components/VideoContainer";

export const SceneSubtitulos: React.FC = () => {
  const { width } = useVideoConfig();
  const frame = useCurrentFrame();
  const s = width / 1280;

  // Premium slow zoom
  const scale = interpolate(frame, [0, 80], [1, 1.05]);

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      gap: 60 * s,
      padding: 100 * s,
      transform: `scale(${scale})`,
    }}>
      <FeatureTitle title="Subtítulos Dinámicos" />
      
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 80 * s,
        width: "100%",
        height: "65%",
      }}>
        <VideoContainer 
          src="assets/samples/subtitle_1.mp4" 
          widthPercent={22} 
          aspectRatio={768 / 1376}
        />
        <VideoContainer 
          src="assets/samples/subtitle_2.mp4" 
          widthPercent={22} 
          aspectRatio={768 / 1376}
        />
      </div>

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
