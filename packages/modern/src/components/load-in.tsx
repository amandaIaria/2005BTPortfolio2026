import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { useRef, useState } from 'react';
import LoadInCard from './load-in-card';

export const boxScale = { scale: 1.4 };

export default function LoadIn({
  json,
}: {
  json: { href: string; text: string }[];
}) {
  const rotate = useMotionValue(0);
  const rotateOpposite = useMotionValue(0);
  const isPaused = useRef(false);
  const [groupHovered, setGroupHovered] = useState(false);

  useAnimationFrame((_t, delta) => {
    if (isPaused.current) return;
    rotate.set(rotate.get() + delta * (360 / 20000));
    rotateOpposite.set(-rotate.get());
  });

  const general = {
    whileHover: { ...boxScale, zIndex: 100 },
  };

  const circle = [
    {
      rest: { x: 124, y: 73 },
      hover: { x: 0, y: 0 },
      ...general,
    },

    {
      rest: { x: 0, y: 73 },
      hover: { x: 0, y: -73 },
      ...general,
    },

    {
      rest: { x: -124, y: 73 },
      hover: { x: 0, y: 0 },
      ...general,
    },

    {
      rest: { x: 124, y: 0 },
      hover: { x: -73, y: 0 },
      ...general,
    },

    {
      rest: { x: 0, y: 0 },
      hover: { x: 0, y: 0 },
      ...general,
    },

    {
      rest: { x: -124, y: 0 },
      hover: { x: 73, y: 0 },
      ...general,
    },

    {
      rest: { x: 124, y: -73 },
      hover: { x: 0, y: 0 },
      ...general,
    },

    {
      rest: { x: 0, y: -73 },
      hover: { x: 0, y: 73 },
      ...general,
    },

    {
      rest: { x: -124, y: -73 },
      hover: { x: 0, y: 0 },
      ...general,
    },
  ];

  return (
    <section className="relative -m-10 -mt-20">
      {/*
        This componet is the first component in the modern site that has a self portrait with bubbles as the navigation.
        hover over the bubbles and tentacles grab the bubble and move it around.
        on click the view port zooms into the bubble and the next page is loaded.
      */}
      <div className="w-screen h-screen p-0 m-1 grid place-items-center">
        <nav>
          <motion.ul
            className="list-none grid grid-cols-3 gap-4 w-full h-full place-items-center"
            // animate={{ rotate: 20, transition: { duration: 0.2 } }}
            style={{ rotate }}
            animate="rest"
            onHoverStart={() => {
              isPaused.current = true;
              setGroupHovered(true);
            }}
            onHoverEnd={() => {
              isPaused.current = false;
              setGroupHovered(false);
            }}
          >
            {json.map((item: { href: string; text: string }, index: number) =>
              index !== 4 ? (
                <motion.li
                  key={index}
                  className="pointer"
                  style={{ rotate: rotateOpposite }}
                  whileHover={circle[index].whileHover}
                  variants={circle[index]}
                  animate={groupHovered ? 'hover' : 'rest'}
                >
                  {item.text !== '' && (
                    <div className="1 bg-pink-500 h-24 w-24">
                      <LoadInCard className="h-full w-full">
                        <a
                          href={item.href}
                          className="h-full w-full text-white grid items-center justify-center text-center"
                        >
                          <span>{item.text}</span>
                        </a>
                      </LoadInCard>
                    </div>
                  )}
                </motion.li>
              ) : (
                <motion.li
                  className="z-10"
                  style={{ rotate: rotateOpposite }}
                  key={index}
                >
                  <div className="rounded-full bg-accent h-40 w-40">
                    <div className="h-full w-full grid place-items-center text-white text-2xl font-bold">
                      Picture
                    </div>
                  </div>
                </motion.li>
              ),
            )}
          </motion.ul>
        </nav>
      </div>
    </section>
  );
}
