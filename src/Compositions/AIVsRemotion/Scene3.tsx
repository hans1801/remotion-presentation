import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Video, staticFile } from "remotion";
import { DarkTechBackground } from "../../Components/DarkTechBackground";

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const s = width / 1280;

  const splitProgress = spring({
    frame: frame - 68,
    fps,
    config: { damping: 15 },
  });

  return (
    <DarkTechBackground>
      <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
        {/* IA Side (Creativity) */}
        <div style={{
          flex: 1,
          position: "relative",
          borderRight: `${2 * s}px solid rgba(255,255,255,0.1)`,
          overflow: "hidden",
        }}>
          <Video
            src={staticFile("generations/with_ia/result_4.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
            muted
            loop
          />
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
          }}>
            <h2 style={{
              color: "white",
              fontSize: 80 * s,
              textAlign: "center",
              transform: `scale(${interpolate(frame, [0, 68], [1, 1.2], { extrapolateRight: "clamp" })})`,
            }}>
              LA IA ES <br/> <span style={{ color: "#FF3B30", fontSize: 100 * s }}>CREATIVA</span>
            </h2>
          </div>
        </div>

        {/* Remotion Side (Consistency) */}
        <div style={{
          flex: splitProgress,
          position: "relative",
          overflow: "hidden",
          width: `${splitProgress * 100}%`,
          opacity: splitProgress,
        }}>
          <Video
            src={staticFile("generations/with_remotion/result_4.mp4")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            loop
          />
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(5px)",
          }}>
            <h2 style={{
              color: "white",
              fontSize: 80 * s,
              textAlign: "center",
              transform: `scale(${interpolate(frame, [68, 143], [1, 1.1], { extrapolateRight: "clamp" })})`,
            }}>
              REMOTION ES <br/> <span style={{ color: "#00FBFF", fontSize: 100 * s }}>CONSISTENTE</span>
            </h2>
          </div>
        </div>
      </AbsoluteFill>
    </DarkTechBackground>
  );
};
