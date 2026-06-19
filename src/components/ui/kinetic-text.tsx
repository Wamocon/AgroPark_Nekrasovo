"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function KineticText({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.02,
  once = true,
}: KineticTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });
  const words = children.split(" ");

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={cn(className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split("").map((char, charIndex) => {
            const globalIndex =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              charIndex;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 24, rotateX: -90 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : { opacity: 0, y: 24, rotateX: -90 }
                }
                transition={{
                  duration: 0.5,
                  delay: delay + globalIndex * stagger,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
