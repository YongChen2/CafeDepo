"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Přímé děti "najedou" opacity 0→1 + translateY(12px)→0 při vstupu do
 * viewportu, se staggerem 60ms mezi nimi (viz .scroll-reveal v globals.css).
 * Jednou, threshold 0.15.
 */
export function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<"pending" | "active" | "settled">(
    "pending",
  );

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Sync se stavem prohlížeče při mountu — legitimní výjimka.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("settled");
      return;
    }
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setState("active");
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const cls =
    state === "pending"
      ? "is-pending"
      : state === "active"
        ? "is-active"
        : "is-settled";

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${cls} ${className}`}
      onTransitionEnd={() => {
        if (state === "active") setState("settled");
      }}
    >
      {children}
    </div>
  );
}
