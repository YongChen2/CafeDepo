"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createRng, rngInt } from "@/lib/placeholder-hash";

const DIGITS = "0123456789";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ";

const FRAMES_PER_CHAR = 6;
const FRAME_MS = 45;
const STAGGER_MS = 30;

function poolFor(ch: string): string | null {
  if (DIGITS.includes(ch)) return DIGITS;
  if (LETTERS.includes(ch.toUpperCase())) return LETTERS;
  return null; // mezery, dvojtečky, pomlčky atd. — neflipují se
}

/** Deterministická sekvence snímků pro jeden znak, poslední snímek = finální znak. */
function framesForChar(ch: string, seed: string): string[] {
  const pool = poolFor(ch);
  if (!pool) return [ch];
  const rng = createRng(seed);
  const frames: string[] = [];
  for (let i = 0; i < FRAMES_PER_CHAR - 1; i++) {
    frames.push(pool[rngInt(rng, 0, pool.length - 1)]);
  }
  frames.push(ch);
  return frames;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SplitFlap({
  text,
  seed,
  className = "",
  charClassName = "",
  as: Tag = "span",
}: {
  text: string;
  seed?: string;
  className?: string;
  charClassName?: string;
  as?: "span" | "div";
}) {
  const chars = useMemo(() => text.split(""), [text]);
  const baseSeed = seed ?? text;
  const frames = useMemo(
    () => chars.map((ch, i) => framesForChar(ch, `${baseSeed}::${i}`)),
    [chars, baseSeed],
  );

  const [display, setDisplay] = useState<string[]>(() =>
    chars.map((ch, i) => (poolFor(ch) ? frames[i][0] : ch)),
  );
  const [ticks, setTicks] = useState<number[]>(() => chars.map(() => 0));
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      // Sync se stavem prohlížeče při mountu — legitimní výjimka, ne
      // odvozený stav z props/state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(chars);
      return;
    }

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (!started || prefersReducedMotion()) return;

    const startedAt = performance.now();
    let raf: number;

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      let allDone = true;
      const nextDisplay: string[] = [];
      const nextTicks: number[] = [];

      chars.forEach((ch, i) => {
        const localElapsed = elapsed - i * STAGGER_MS;
        const frameSeq = frames[i];
        if (localElapsed < 0) {
          nextDisplay.push(display[i]);
          nextTicks.push(ticks[i]);
          allDone = false;
          return;
        }
        const frameIdx = Math.min(
          Math.floor(localElapsed / FRAME_MS),
          frameSeq.length - 1,
        );
        nextDisplay.push(frameSeq[frameIdx]);
        nextTicks.push(frameIdx);
        if (frameIdx < frameSeq.length - 1) allDone = false;
      });

      setDisplay(nextDisplay);
      setTicks(nextTicks);

      if (!allDone) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return (
    <Tag
      ref={rootRef as never}
      className={`tabular-nums ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">
        {display.map((ch, i) => (
          <span
            key={`${i}-${ticks[i]}`}
            className={`flap-frame inline-block ${charClassName}`}
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </Tag>
  );
}
