import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type As = 'div' | 'section' | 'span' | 'li' | 'ul' | 'header' | 'article';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds of delay before the reveal begins. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: 'up' | 'down' | 'left' | 'right' | 'none';
  as?: As;
  /** Re-trigger each time it enters the viewport. */
  once?: boolean;
  amount?: number;
}

/**
 * A scroll-triggered entrance wrapper. Honours prefers-reduced-motion by
 * rendering content immediately with no transform or opacity animation.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  from = 'up',
  as = 'div',
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as as 'div';
    return <Tag className={className}>{children}</Tag>;
  }

  const offset = 26;
  const offsets: Record<string, { x?: number; y?: number }> = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  };

  const variants: Variants = {
    hidden: { opacity: 0, ...offsets[from] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
