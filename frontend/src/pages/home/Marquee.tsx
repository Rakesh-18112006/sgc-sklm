import React from "react";
import type { CSSProperties } from "react";

interface MarqueeProps {
  text: string;
  direction?: "left" | "right";
  speed?: number;
  mobileSpeed?: number;
  pauseOnHover?: boolean;
  repeat?: number;
  style?: CSSProperties;
}

const Marquee: React.FC<MarqueeProps> = ({
  text,
  direction = "left",
  speed = 40,
  pauseOnHover = false,
  repeat = 2,
  style = {},
}) => {
  const animationDirection = direction === "left" ? "normal" : "reverse";

  const marqueeStyle: CSSProperties = {
    display: "flex",
    overflow: "hidden",
    whiteSpace: "nowrap",
    ...style,
  };

  const contentStyle: CSSProperties = {
    display: "flex",
    animation: `marquee ${speed}s linear infinite`,
    animationDirection,
  };

  const hoverStyle = pauseOnHover
    ? {
        ":hover": {
          animationPlayState: "paused",
        },
      }
    : {};

  return (
    <div style={marqueeStyle} className={pauseOnHover ? "marquee-hover" : ""}>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-hover:hover > div {
            animation-play-state: paused;
          }
        `}
      </style>
      <div style={{ ...contentStyle, ...hoverStyle }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} style={{ paddingRight: "50px" }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
