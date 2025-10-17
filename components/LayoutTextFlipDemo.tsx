"use client";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";

export function LayoutTextFlipDemo() {
  return (
    <div>

      <motion.div className="relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center  ">
        <LayoutTextFlip
          text="Welcome to "
          words={["Evalify", "Insights", "Clarity", "The Future"]}
        />
      </motion.div>
      <p className="mt-4 text-center text-base text-neutral-600 dark:text-neutral-400">
        <br />
        Experience the power of AI-driven evaluation that turns learning into instant insight.
      </p>
    </div>
  );
}
