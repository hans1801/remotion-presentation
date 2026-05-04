import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { FeatureTitle } from "../Components/FeatureTitle";
import { VideoContainer } from "../Components/VideoContainer";

export const SceneReportes: React.FC = () => {
  const { width } = useVideoConfig();
  const s = width / 1280;

  return (
    <AbsoluteFill style={{
      justifyContent: "center",
      alignItems: "center",
      gap: 60 * s,
      padding: 100 * s,
    }}>
      <FeatureTitle title="Reportes Visuales" />
      <VideoContainer 
        src="assets/samples/reporte.mp4" 
        widthPercent={75} 
      />
    </AbsoluteFill>
  );
};
