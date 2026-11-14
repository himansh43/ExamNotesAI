import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: "default", // Options: 'default', 'forest', 'dark', 'neutral'
  securityLevel: "loose",
});

// Helper to normalize line endings & strip markdown fences
const cleanMermaidChart = (diagram) => {
  if (!diagram || typeof diagram !== "string") return "";
  let cleanDiagram = diagram
    .replace(/^```(?:mermaid)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .replace(/\\n/g, "\n")
    .replace(/\r\n?/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
    if(!cleanDiagram.trim().startsWith("graph")){
      cleanDiagram= `graph TD\n${clean}`
    }
    return cleanDiagram
};
const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);


    useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current && diagram) {
        try {
          // Generate a unique ID for each render to avoid DOM conflicts
          const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

          //sanitize your diagram beform render
          const safeChart= cleanMermaidChart(diagram)
          const { svg } = await mermaid.render(id, safeChart);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Mermaid rendering failed:', error);
          containerRef.current.innerHTML = '<p style="color:red;">Invalid Mermaid Syntax</p>';
        }
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default MermaidSetup;
