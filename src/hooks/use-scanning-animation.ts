"use client";

import { useState, useCallback } from "react";

export interface ScanStep {
  id: string;
  label: string;
  status: "pending" | "active" | "complete";
}

const defaultSteps: ScanStep[] = [
  { id: "upload", label: "Uploading document", status: "pending" },
  { id: "extract", label: "Extracting text", status: "pending" },
  { id: "analyze", label: "Analyzing clauses", status: "pending" },
  { id: "detect", label: "Detecting risks", status: "pending" },
  { id: "recommend", label: "Generating recommendations", status: "pending" },
  { id: "complete", label: "Analysis complete", status: "pending" },
];

export function useScanningAnimation() {
  const [steps, setSteps] = useState<ScanStep[]>(defaultSteps);
  const [isScanning, setIsScanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  const startScan = useCallback(() => {
    setIsScanning(true);
    setIsComplete(false);
    setSteps(defaultSteps.map((s) => ({ ...s, status: "pending" })));

    const stepDurations = [800, 1200, 1500, 1200, 1000, 500];

    let totalDelay = 0;

    stepDurations.forEach((duration, index) => {
      totalDelay += duration;

      setTimeout(() => {
        setCurrentStep(index);
        setSteps((prev) =>
          prev.map((s, i) => ({
            ...s,
            status: i < index ? "complete" : i === index ? "active" : "pending",
          }))
        );

        if (index === stepDurations.length - 1) {
          setTimeout(() => {
            setSteps((prev) => prev.map((s) => ({ ...s, status: "complete" })));
            setIsScanning(false);
            setIsComplete(true);
          }, 500);
        }
      }, totalDelay);
    });
  }, []);

  const reset = useCallback(() => {
    setSteps(defaultSteps);
    setIsScanning(false);
    setCurrentStep(-1);
    setIsComplete(false);
  }, []);

  return { steps, isScanning, currentStep, isComplete, startScan, reset };
}
