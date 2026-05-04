import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { FeatureTitle } from "../Components/FeatureTitle";
import { VideoContainer } from "../Components/VideoContainer";

export const SceneInfografias: React.FC = () => {
  const { width } = useVideoConfig();
  const s = width / 1280;

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      gap: 60 * s,
      padding: 100 * s,
    }}>
      <FeatureTitle title="Infografias" />
      <VideoContainer 
        src="assets/samples/infografia.mp4" 
        widthPercent={70} 
      />
    </AbsoluteFill>
  );
};
