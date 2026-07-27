"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Sekce "najede" přes clip-path: inset() zleva při vstupu do viewportu.
 * Žádný pohyb po ose Y — jen odkrytí. Jednou, threshold 0.15.
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
      ? "reveal-pending"
      : state === "active"
        ? "reveal-active"
        : "reveal-settled";

  return (
    <div
      ref={ref}
      className={`${cls} ${className}`}
      onTransitionEnd={() => {
        if (state === "active") setState("settled");
      }}
    >
      {children}
    </div>
  );
}
