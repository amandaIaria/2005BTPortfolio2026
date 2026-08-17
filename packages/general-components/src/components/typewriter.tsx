import { forwardRef, useEffect, useState } from 'react';

import { cn, componentName } from '../lib/utils';
import type { TypewriterProps } from '@packages/general-components/src/components/types.ts';
import type { AnimationGeneratorType } from 'framer-motion';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';

// Linear indexOf scan instead of a regex — a lazy `<p[^>]*>([\s\S]*?)<\/p>`
// pattern can be forced into O(n^2) rescans on adversarial input (e.g. many
// unclosed "<p" repetitions), which GitHub's ReDoS scanner flags.
function extractParagraphs(html: string) {
  const result: string[] = [];
  let cursor = 0;
  while (cursor < html.length) {
    const openStart = html.indexOf('<p', cursor);
    if (openStart === -1) break;
    const openEnd = html.indexOf('>', openStart);
    if (openEnd === -1) break;
    const closeStart = html.indexOf('</p>', openEnd);
    if (closeStart === -1) break;
    result.push(html.slice(openEnd + 1, closeStart));
    cursor = closeStart + 4;
  }
  return result;
}

const Typewriter = forwardRef<HTMLDivElement, TypewriterProps>(
  (
    { text, speed = 40, className, delay = 0.5, duration = 0.05, ...props },
    ref,
  ) => {
    const paragraphs = Array.isArray(text) ? text : extractParagraphs(text);

    const paragraphStagger = 0.5;

    const containerVariants = (idx: number) => ({
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay + idx * paragraphStagger,
          staggerChildren: duration,
        },
      },
    });

    const characterVariants = (ind: number) => {
      return {
        hidden: { opacity: 0, y: 5 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring' as AnimationGeneratorType,
            damping: 12 + ind,
            stiffness: 200,
          },
        },
      }
    };

    return (
      <div
        className={`flex items-center ${className}`}
        data-component="typewriter-component"
      >
        <div>
          {paragraphs.map((copy, idx) =>
            !copy.includes('<ul') ? (
              <motion.p
                className="mb-4"
                key={`typewriter__${idx}`}
                variants={containerVariants(idx)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <span className="sr-only">{copy}</span>
                {copy.split(' ').map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    aria-hidden={true}
                    variants={characterVariants(index)}
                  >
                    {word}{'\u00A0'}
                  </motion.span>
                ))}
              </motion.p>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(copy),
                }}
              />
            ),
          )}
        </div>
      </div>
    );
  },
);
Typewriter.displayName = 'Typewriter';

export { Typewriter };
