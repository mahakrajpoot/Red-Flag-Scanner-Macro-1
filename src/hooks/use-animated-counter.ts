"use client";

import { useState, useEffect, useRef } from "react";

export function useAnimatedCounter(target: number, duration: number = 2000, startOnMount: boolean = true) {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);

  const animate = () => {
    setIsAnimating(true);
    const startTime = Date.now();

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(eased * target);

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    if (startOnMount) {
      const timer = setTimeout(animate, 300);
      return () => {
        clearTimeout(timer);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, startOnMount]);

  return { count, isAnimating, animate };
}
