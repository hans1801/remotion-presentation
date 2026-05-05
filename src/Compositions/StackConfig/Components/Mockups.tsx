import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const CYAN = "#00FBFF";
const GREEN = "#39FF14";

export const TerminalMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = width / 1280;

  const logs = [
    { t: "$ node server.js", c: CYAN },
    { t: "Debugger listening on ws://127.0.0.1:9229", c: "#888" },
    { t: "Compiling source code...", c: "#ddd" },
    { t: "✔ Compiled successfully in 142ms", c: GREEN },
    { t: "Server started at http://localhost:3000", c: "#ddd" },
    { t: "[GET] /api/v1/users - 200 OK", c: GREEN },
    { t: "[POST] /api/v1/auth/login - 201 Created", c: GREEN },
    { t: "[GET] /api/v1/projects - 200 OK", c: GREEN },
    { t: "Worker process 12435 running...", c: "#888" },
    { t: "Memory usage: 45.2MB / 128MB", c: "#888" },
  ];

  const visibleLogsCount = Math.floor(frame / 5) + 1;
  const scrollY = Math.max(0, (visibleLogsCount - 8) * 30 * s);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#0c0c0c",
      borderRadius: 20 * s,
      display: "flex",
      flexDirection: "column",
      border: `${2 * s}px solid rgba(255, 255, 255, 0.1)`,
      padding: 30 * s,
      fontFamily: "'Fira Code', monospace",
      color: "#ddd",
      fontSize: 20 * s,
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    }}>
      <div style={{ display: "flex", gap: 8 * s, marginBottom: 20 * s, position: "relative", zIndex: 10, background: "#0c0c0c", paddingBottom: 10 * s }}>
        <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#ff5f56" }} />
        <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 12 * s, height: 12 * s, borderRadius: "50%", background: "#27c93f" }} />
        <div style={{ marginLeft: 20 * s, opacity: 0.4, fontSize: 14 * s }}>terminal — zsh</div>
      </div>
      
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{ transform: `translateY(${-scrollY}px)`, transition: "transform 0.2s" }}>
          {logs.map((log, i) => (
            <div key={i} style={{ 
              opacity: i < visibleLogsCount ? 1 : 0, 
              marginBottom: 10 * s,
              display: "flex",
              gap: 15 * s
            }}>
              <span style={{ color: log.c }}>{log.t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Indicator */}
      <div style={{ 
        position: "absolute", 
        bottom: 20 * s, 
        right: 30 * s, 
        display: "flex", 
        alignItems: "center", 
        gap: 10 * s,
        background: "rgba(0,0,0,0.6)",
        padding: `${5 * s}px ${15 * s}px`,
        borderRadius: 20 * s,
        border: `1px solid ${CYAN}22`
      }}>
        <div style={{ 
          width: 8 * s, 
          height: 8 * s, 
          borderRadius: "50%", 
          background: GREEN,
          animation: "pulse 1.5s infinite" 
        }} />
        <span style={{ fontSize: 12 * s, color: GREEN, fontWeight: "bold" }}>RUNNING</span>
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.4; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export const CodeGenerationMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = width / 1280;

  const code = `// Claude Code assistant refactoring...
export const useAnalytics = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    trackEvent('page_view');
    loadMetrics().then(setData);
  }, []);

  return data;
};`;

  const characters = Math.min(code.length, Math.floor(frame * 2.5));

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#0c0c0c",
      borderRadius: 20 * s,
      border: `1px solid rgba(255, 255, 255, 0.1)`,
      padding: 30 * s,
      fontFamily: "'Fira Code', monospace",
      color: CYAN,
      fontSize: 22 * s,
      whiteSpace: "pre",
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    }}>
      <div style={{ color: "rgba(255,255,255,0.4)", marginBottom: 20 * s, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 10 * s }}>
        RefactorComponent.tsx
      </div>
      {code.substring(0, characters)}
      <span style={{ 
        display: "inline-block",
        width: 10 * s,
        height: 24 * s,
        background: CYAN,
        marginLeft: 2 * s,
        verticalAlign: "middle",
        opacity: Math.floor(frame / 10) % 2 === 0 ? 1 : 0 
      }} />
    </div>
  );
};

export const IDEMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const s = width / 1280;

  // Window switching logic
  const activeTab = Math.floor(frame / 60) % 3; // Switch every 60 frames

  const tabs = [
    { name: "App.tsx", content: "export const App = () => {\n  return <Layout />;\n};" },
    { name: "theme.ts", content: "export const theme = {\n  colors: { primary: '#00FBFF' }\n};" },
    { name: "api.js", content: "export const fetchAll = () => {\n  return db.query('*');\n};" }
  ];

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#0c0c0c",
      borderRadius: 20 * s,
      border: `1px solid rgba(255, 255, 255, 0.1)`,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
    }}>
      {/* Tabs */}
      <div style={{ height: 40 * s, background: "#151515", display: "flex", alignItems: "flex-end" }}>
        {tabs.map((tab, i) => (
          <div key={i} style={{
            height: "100%",
            padding: `0 ${20 * s}px`,
            display: "flex",
            alignItems: "center",
            background: activeTab === i ? "#0c0c0c" : "#1a1a1a",
            color: activeTab === i ? CYAN : "rgba(255,255,255,0.4)",
            borderRight: "1px solid rgba(0,0,0,0.3)",
            fontSize: 14 * s,
            fontFamily: "sans-serif",
            borderTop: activeTab === i ? `2px solid ${CYAN}` : "none",
            transition: "all 0.2s",
          }}>
            {tab.name}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: "20%", borderRight: "1px solid rgba(255,255,255,0.05)", padding: 15 * s }}>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 10 * s, fontWeight: "bold", letterSpacing: 1 * s, marginBottom: 15 * s }}>PROJECT</div>
          {tabs.map((tab, i) => (
            <div key={i} style={{ color: activeTab === i ? CYAN : "#777", fontSize: 14 * s, marginBottom: 10 * s, display: "flex", gap: 10 * s }}>
               <span>📄</span> {tab.name}
            </div>
          ))}
        </div>

        {/* Editor */}
        <div style={{ flex: 1, padding: 30 * s, fontFamily: "'Fira Code', monospace", fontSize: 18 * s, whiteSpace: "pre" }}>
          <div style={{ color: "#555", marginBottom: 10 * s }}>{"// Antigravity Minimalist IDE"}</div>
          <div style={{ color: "#ddd" }}>
            {tabs[activeTab].content}
          </div>
          <div style={{ 
            marginTop: 40 * s, 
            padding: 15 * s, 
            background: "rgba(0, 251, 255, 0.05)", 
            border: `1px solid ${CYAN}33`,
            borderRadius: 8 * s,
            fontSize: 14 * s,
            color: CYAN
          }}>
            🤖 AI Assistant: Optimized your {tabs[activeTab].name} file.
          </div>
        </div>
      </div>
    </div>
  );
};
