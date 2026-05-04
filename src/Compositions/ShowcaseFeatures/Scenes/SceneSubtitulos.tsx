import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { FeatureTitle } from "../Components/FeatureTitle";
import { VideoContainer } from "../Components/VideoContainer";

export const SceneSubtitulos: React.FC = () => {
  const { width } = useVideoConfig();
  const s = width / 1280;

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      gap: 60 * s,
      padding: 100 * s,
    }}>
      <FeatureTitle title="Subtitulos dinamicos" />
      
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
          aspectRatio={9 / 16}
        />
        <VideoContainer 
          src="assets/samples/subtitle_2.mp4" 
          widthPercent={22} 
          aspectRatio={9 / 16}
        />
      </div>
    </AbsoluteFill>
  );
};
