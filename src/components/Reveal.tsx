import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  id?: string;
  className?: string;
}

/**
 * Fades a block in as it enters the viewport.
 * Animations are skipped entirely when the visitor prefers reduced motion.
 */
export function Reveal({ id, className, children }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
