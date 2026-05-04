import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Img,
  staticFile,
} from "remotion";

const CYAN = "#00FBFF";
const GREEN = "#39FF14";
const PURPLE = "#BC13FE";
const YELLOW = "#FFD700";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

/** Realistic NLE-style Timeline */
const EditorTimeline: React.FC<{ s: number }> = ({ s }) => {
  const frame = useCurrentFrame();
  const scroll = frame * 5 * s;
  
  return (
    <div style={{
      width: "100%",
      height: 280 * s,
      background: "rgba(15,15,18,0.95)",
      borderTop: `${s}px solid rgba(255,255,255,0.1)`,
      borderBottom: `${s}px solid rgba(255,255,255,0.1)`,
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 -20px 50px rgba(0,0,0,0.5)",
    }}>
      {/* Time Rulers */}
      <div style={{
        height: 25 * s,
        width: "100%",
        background: "rgba(255,255,255,0.03)",
        borderBottom: `${s}px solid rgba(255,255,255,0.05)`,
        display: "flex",
        alignItems: "center",
        paddingLeft: "30%",
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ 
            width: 100 * s, 
            height: "100%", 
            borderLeft: `${s}px solid rgba(255,255,255,0.1)`, 
            fontSize: 9 * s, 
            color: "rgba(255,255,255,0.2)",
            paddingLeft: 4 * s,
            display: "flex",
            alignItems: "center",
            transform: `translateX(${-scroll}px)`,
          }}>
            00:0{i}:00
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: `${10 * s}px 0` }}>
        {/* Video Tracks */}
        {[
          { label: "V2", color: PURPLE, blocks: [120, 80, 200, 150, 90, 180, 110, 240, 130, 160, 200, 100] },
          { label: "V1", color: CYAN,   blocks: [200, 150, 180, 220, 140, 190, 160, 210, 180, 230, 140, 150] },
        ].map((track, i) => (
          <div key={i} style={{ display: "flex", height: 45 * s, alignItems: "center", borderBottom: `${s}px solid rgba(255,255,255,0.03)` }}>
            <div style={{ width: 40 * s, fontSize: 10 * s, color: "rgba(255,255,255,0.3)", fontWeight: "bold", paddingLeft: 10 * s }}>{track.label}</div>
            <div style={{ display: "flex", gap: 4 * s, transform: `translateX(${-scroll * (1 + i * 0.1)}px)` }}>
              {track.blocks.map((w, j) => (
                <div key={j} style={{
                  width: w * s,
                  height: 32 * s,
                  background: `${track.color}44`,
                  borderRadius: 2 * s,
                  border: `${s}px solid ${track.color}88`,
                  display: "flex",
                  alignItems: "center",
                  padding: `0 ${8 * s}px`,
                }}>
                  <div style={{ width: "40%", height: 3 * s, background: "rgba(255,255,255,0.2)", borderRadius: 1 * s }} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Audio Tracks */}
        {[
          { label: "A1", color: GREEN, blocks: [300, 250, 400, 380, 320, 450, 280] },
          { label: "A2", color: YELLOW, blocks: [150, 320, 280, 350, 400, 250, 300] },
        ].map((track, i) => (
          <div key={i} style={{ display: "flex", height: 40 * s, alignItems: "center", marginTop: i === 0 ? 10 * s : 0 }}>
            <div style={{ width: 40 * s, fontSize: 10 * s, color: "rgba(255,255,255,0.3)", fontWeight: "bold", paddingLeft: 10 * s }}>{track.label}</div>
            <div style={{ display: "flex", gap: 2 * s, transform: `translateX(${-scroll * 1.1}px)` }}>
              {track.blocks.map((w, j) => (
                <div key={j} style={{
                  width: w * s,
                  height: 28 * s,
                  background: `${track.color}22`,
                  borderRadius: 2 * s,
                  border: `${s}px solid ${track.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  padding: `0 ${4 * s}px`,
                  overflow: "hidden",
                }}>
                  {Array.from({ length: Math.floor(w / 10) }).map((_, k) => (
                    <div key={k} style={{ 
                      width: 2 * s, 
                      height: (10 + Math.random() * 15) * s, 
                      background: `${track.color}66`, 
                      borderRadius: 1 * s 
                    }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Playhead line */}
      <div style={{
        position: "absolute",
        left: "30%",
        top: 0,
        bottom: 0,
        width: 2 * s,
        background: "white",
        boxShadow: `0 0 ${15 * s}px white`,
        zIndex: 10,
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 14 * s,
          height: 14 * s,
          background: "white",
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
        }} />
      </div>
    </div>
  );
};

export const EditorTimelineScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const s = width / 1280;
  
  const sceneOp = interpolate(frame, [0, 8, 89, 97], [0, 1, 1, 0], clamp);
  
  // Logos transition
  const logoEnter = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  
  // Clock transition (last 1.5 seconds = 45 frames)
  const clockStartFrame = 97 - 45;
  const clockVisibility = interpolate(frame, [clockStartFrame, clockStartFrame + 10], [0, 1], clamp);
  
  // Clock time calculation
  const totalMinutes = interpolate(frame, [clockStartFrame, 97], [600, 1110], clamp); 
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);
  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return (
    <AbsoluteFill style={{ opacity: sceneOp, backgroundColor: "#050505", overflow: "hidden" }}>
      {/* Logos Area */}
      <div style={{
        position: "absolute",
        top: "18%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 120 * s,
        opacity: interpolate(clockVisibility, [0, 1], [1, 0.2], clamp),
        transform: `scale(${interpolate(clockVisibility, [0, 1], [1, 0.9], clamp)})`,
      }}>
        {[
          { src: "editors/capcut_logo.webp", label: "CapCut" },
          { src: "editors/premier_logo.png", label: "Premiere" },
        ].map((item, i) => (
          <div key={i} style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: 20 * s,
            transform: `translateY(${(1 - logoEnter) * 50 * s}px)`,
            opacity: logoEnter,
          }}>
            <div style={{
              width: 200 * s,
              height: 200 * s,
              background: "rgba(255,255,255,0.03)",
              borderRadius: 30 * s,
              border: `${s}px solid rgba(255,255,255,0.1)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
            }}>
              <Img src={staticFile(item.src)} style={{ width: "65%", height: "65%", objectFit: "contain" }} />
            </div>
            <div style={{ fontSize: 18 * s, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em" }}>{item.label.toUpperCase()}</div>
          </div>
        ))}
      </div>

      {/* Timeline Area */}
      <div style={{ position: "absolute", bottom: "5%", width: "100%" }}>
        <EditorTimeline s={s} />
      </div>

      {/* Clock Overlay (Last 1.5s) */}
      {frame >= clockStartFrame && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `radial-gradient(circle, rgba(0,0,0,0.85) 0%, transparent 80%)`,
          opacity: clockVisibility,
          zIndex: 50,
        }}>
          <div style={{ 
            fontSize: 20 * s, 
            color: YELLOW, 
            letterSpacing: "0.4em", 
            marginBottom: 20 * s,
            fontWeight: 800,
          }}>TIME WASTED</div>
          <div style={{
            fontSize: 220 * s,
            fontFamily: "monospace",
            color: "white",
            fontWeight: 900,
            textShadow: `0 0 ${50 * s}px rgba(255,255,255,0.4)`,
          }}>
            {timeStr}
          </div>
          <div style={{ fontSize: 28 * s, color: "rgba(255,255,255,0.5)", marginTop: 10 * s, fontWeight: 600 }}>HOURS OF MANUAL EDITING</div>
        </div>
      )}
    </AbsoluteFill>
  );
};
