"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** الأجواء: توهّج خفيف يتبع المؤشّر (بلون التمييز) + ملمس حبيبي (grain). */
export function Ambience() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 70, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 70, damping: 22, mass: 0.6 });
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setOn(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      {on && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none fixed left-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.6),transparent_60%)] opacity-[0.06]"
        />
      )}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 -z-10 opacity-[0.04]" />
    </>
  );
}
