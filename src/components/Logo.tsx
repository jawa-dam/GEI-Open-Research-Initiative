"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const LOGO_URL =
  "https://assets.zyrosite.com/YZ9jg46Bljs5wOZR/gei-open-research-YdUCaa1Wafpd7vkJ.png";

interface LogoEffect {
  name: string;
  className: string;
  style?: React.CSSProperties;
}

const EFFECTS: LogoEffect[] = [
  {
    name: "glow-pulse",
    className: "animate-[glow-pulse_3s_ease-in-out_infinite]",
    style: {
      filter: "drop-shadow(0 0 12px rgba(47, 210, 255, 0.6))",
    },
  },
  {
    name: "float",
    className: "animate-[float_4s_ease-in-out_infinite]",
  },
  {
    name: "shimmer",
    className: "animate-[shimmer_2.5s_ease-in-out_infinite]",
    style: {
      filter: "drop-shadow(0 0 8px rgba(243, 16, 186, 0.5))",
    },
  },
  {
    name: "spin-in",
    className: "animate-[spin-in_1.2s_cubic-bezier(0.34,1.56,0.64,1)_forwards]",
  },
  {
    name: "breathe",
    className: "animate-[breathe_5s_ease-in-out_infinite]",
    style: {
      filter: "drop-shadow(0 0 10px rgba(61, 61, 234, 0.5))",
    },
  },
  {
    name: "slide-up",
    className: "animate-[slide-up_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]",
    style: {
      filter: "drop-shadow(0 0 6px rgba(47, 210, 255, 0.4))",
    },
  },
  {
    name: "flicker",
    className: "animate-[flicker_3s_ease-in-out_infinite]",
  },
  {
    name: "tilt-rock",
    className: "animate-[tilt-rock_3s_ease-in-out_infinite]",
    style: {
      filter: "drop-shadow(0 0 8px rgba(255, 157, 242, 0.5))",
    },
  },
];

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const [effect, setEffect] = useState<LogoEffect | null>(null);

  useEffect(() => {
    setEffect(EFFECTS[Math.floor(Math.random() * EFFECTS.length)]);
  }, []);

  const sizeMap = {
    sm: { width: 40, height: 40, className: "w-10 h-10" },
    md: { width: 64, height: 64, className: "w-16 h-16" },
    lg: { width: 120, height: 120, className: "w-[120px] h-[120px]" },
  };

  const s = sizeMap[size];

  return (
    <div className={`inline-flex items-center justify-center ${effect?.className ?? ""}`} style={effect?.style}>
      <Image
        src={LOGO_URL}
        alt="GEI Open Research Initiative"
        width={s.width}
        height={s.height}
        className={`${s.className} object-contain`}
        unoptimized
        priority={size === "lg"}
      />
    </div>
  );
}
