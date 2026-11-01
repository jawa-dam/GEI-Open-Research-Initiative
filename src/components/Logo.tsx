"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LOGO_URL =
  "https://assets.zyrosite.com/YZ9jg46Bljs5wOZR/gei-open-research-YdUCaa1Wafpd7vkJ.png";

interface LogoEffect {
  name: string;
  className: string;
  style?: React.CSSProperties;
}

// One effect is selected per full page load and shared by every logo instance.
// The client applies it after hydration to avoid server/client markup mismatch.
const EFFECTS: LogoEffect[] = [
  {
    name: "cyan-glow",
    className: "animate-[glow-pulse_3.4s_ease-in-out_infinite]",
    style: { filter: "drop-shadow(0 0 10px rgba(47, 210, 255, 0.42))" },
  },
  {
    name: "gentle-float",
    className: "animate-[float_5s_ease-in-out_infinite]",
  },
  {
    name: "water-shimmer",
    className: "animate-[shimmer_3.2s_ease-in-out_infinite]",
    style: { filter: "drop-shadow(0 0 7px rgba(47, 210, 255, 0.34))" },
  },
  {
    name: "soft-breathe",
    className: "animate-[breathe_5.5s_ease-in-out_infinite]",
    style: { filter: "drop-shadow(0 0 9px rgba(61, 61, 234, 0.38))" },
  },
  {
    name: "water-current",
    className: "animate-[water-glint_4.5s_ease-in-out_infinite]",
  },
  {
    name: "halo-drift",
    className: "animate-[halo-drift_6s_ease-in-out_infinite]",
  },
  {
    name: "ripple",
    className: "animate-[ripple-breathe_4.8s_ease-in-out_infinite]",
  },
  {
    name: "arrival",
    className: "animate-[slide-up_0.9s_cubic-bezier(0.16,1,0.3,1)_both]",
    style: { filter: "drop-shadow(0 0 7px rgba(47, 210, 255, 0.3))" },
  },
];

const PAGE_EFFECT = EFFECTS[Math.floor(Math.random() * EFFECTS.length)];

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "md" }: LogoProps) {
  const [effect, setEffect] = useState<LogoEffect | null>(null);

  useEffect(() => {
    setEffect(PAGE_EFFECT);
  }, []);

  const sizeMap = {
    sm: { width: 40, height: 40, className: "w-10 h-10" },
    md: { width: 64, height: 64, className: "w-16 h-16" },
    lg: { width: 120, height: 120, className: "w-[120px] h-[120px]" },
  };

  const s = sizeMap[size];

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${effect?.className ?? ""}`}
      style={effect?.style}
      data-logo-effect={effect?.name ?? "pending"}
    >
      <Image
        src={LOGO_URL}
        alt="GEI Open Research Initiative"
        width={s.width}
        height={s.height}
        className={`${s.className} object-contain`}
        unoptimized
        priority={size === "lg"}
      />
    </span>
  );
}
