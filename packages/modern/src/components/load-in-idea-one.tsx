import { Container } from "@general/components";
import { motion, useTime, useTransform, MotionValue } from 'motion/react';
import { useEffect, useState } from "react";

function useOrbitFreeze(rotate: MotionValue<number>, x0: number, y0: number, active: boolean) {
  const x = useTransform(rotate, (r) => {
    const theta = (r * Math.PI) / 180
    return x0 * Math.cos(theta) + y0 * Math.sin(theta)
  })
  const y = useTransform(rotate, (r) => {
    const theta = (r * Math.PI) / 180
    return -x0 * Math.sin(theta) + y0 * Math.cos(theta)
  })
  return active ? { x, y } : {}
}

export default function LoadInIdeaOne() {
  const time = useTime();
  const rotate = useTransform(time, [0, 20000], [0, 360], { clamp: false });

  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    function handleMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const circleOne = {
    rest: { x: 124, y: 73 },
    hover: { x: 0, y: 0 },
    whileHover: { scale: 2, transition: { duration: 0.2 }, x: pos.x, y: pos.y }
  };

  const circleTwo = {
    rest: { x: 0, y: 73 },
    hover: { x: 0, y: -73 }
  };

  const circleThree = {
    rest: { x: -124, y: 73 },
    hover: { x: 0, y: 0 }
  };

  const circleFour = {
    rest: { x: 124, y: 0 },
    hover: { x: -73, y: 0 }
  };

  const circleFive = {
    rest: { x: -124, y: 0 },
    hover: { x: 73, y: 0 }
  };

  const circleSix = {
    rest: { x: 124, y: -73 },
    hover: { x: 0, y: 0 }
  };

  const circleSeven = {
    rest: { x: 0, y: -73 },
    hover: { x: 0, y: 73 }
  };

  const circleEight = {
    rest: { x: -124, y: -73 },
    hover: { x: 0, y: 0 }
  };

  const [hoveredOne, setHoveredOne] = useState(false)
  const [hoveredTwo, setHoveredTwo] = useState(false)
  const [hoveredThree, setHoveredThree] = useState(false)
  const [hoveredFour, setHoveredFour] = useState(false)
  const [hoveredFive, setHoveredFive] = useState(false)
  const [hoveredSix, setHoveredSix] = useState(false)
  const [hoveredSeven, setHoveredSeven] = useState(false)
  const [hoveredEight, setHoveredEight] = useState(false)

  const freezeOne = useOrbitFreeze(rotate, 124, 73, hoveredOne)
  const freezeTwo = useOrbitFreeze(rotate, 0, 73, hoveredTwo)
  const freezeThree = useOrbitFreeze(rotate, -124, 73, hoveredThree)
  const freezeFour = useOrbitFreeze(rotate, 124, 0, hoveredFour)
  const freezeFive = useOrbitFreeze(rotate, -124, 0, hoveredFive)
  const freezeSix = useOrbitFreeze(rotate, 124, -73, hoveredSix)
  const freezeSeven = useOrbitFreeze(rotate, 0, -73, hoveredSeven)
  const freezeEight = useOrbitFreeze(rotate, -124, -73, hoveredEight)

  return (
    <div className="relative w-full h-full">
      {/*
        This componet is the first component in the modern site that has a self portrait with bubbles as the navigation.
        hover over the bubbles and tentacles grab the bubble and move it around.
        on click the view port zooms into the bubble and the next page is loaded.
      */}
      <Container className="">
        <nav>
          <motion.ul
            className="list-none grid grid-cols-3 gap-4 w-full h-full place-items-center"
            // animate={{ rotate: 20, transition: { duration: 0.2 } }}
            style={{ rotate }}
            whileHover="hover" animate="rest"
            >
            <motion.li className="pointer ease-in-out transition-transform" whileHover={circleOne.whileHover} variants={circleOne} style={freezeOne} onHoverStart={() => setHoveredOne(true)} onHoverEnd={() => setHoveredOne(false)} ><div className="1 rounded-full bg-gray-500 h-24 w-24" /></motion.li>
            <motion.li className="pointer ease-in-out transition-transform" whileHover={circleOne.hover} variants={circleTwo} style={freezeTwo} onHoverStart={() => setHoveredTwo(true)} onHoverEnd={() => setHoveredTwo(false)} ><div className="2 rounded-full bg-blue-500 h-24 w-24" /></motion.li>
            <motion.li className="pointer ease-in-out transition-transform" whileHover={circleOne.hover} variants={circleThree} style={freezeThree} onHoverStart={() => setHoveredThree(true)} onHoverEnd={() => setHoveredThree(false)} ><div className="3 rounded-full bg-green-500 h-24 w-24" /></motion.li>
            <motion.li className="pointer ease-in-out transition-transform" whileHover={circleOne.hover} variants={circleFour} style={freezeFour} onHoverStart={() => setHoveredFour(true)} onHoverEnd={() => setHoveredFour(false)} ><div className="4 rounded-full bg-red-500 h-24 w-24" /></motion.li>
            <motion.li className="ease-in-out transition-transform z-10"><div className="rounded-full bg-accent h-40 w-40" /></motion.li>
            <motion.li className="pointer ease-in-out transition-transform" whileHover={circleOne.hover} variants={circleFive} style={freezeFive} onHoverStart={() => setHoveredFive(true)} onHoverEnd={() => setHoveredFive(false)} ><div className="5 rounded-full bg-yellow-500 h-24 w-24" /></motion.li>
            <motion.li className="pointer ease-in-out transition-transform" whileHover={circleOne.hover} variants={circleSix} style={freezeSix} onHoverStart={() => setHoveredSix(true)} onHoverEnd={() => setHoveredSix(false)} ><div className="6 rounded-full bg-purple-500 h-24 w-24" /></motion.li>
            <motion.li className="pointer ease-in-out transition-transform" whileHover={circleOne.hover} variants={circleSeven} style={freezeSeven} onHoverStart={() => setHoveredSeven(true)} onHoverEnd={() => setHoveredSeven(false)} ><div className="7 rounded-full bg-orange-500 h-24 w-24" /></motion.li>
            <motion.li className="pointer ease-in-out transition-transform" whileHover={circleOne.hover} variants={circleEight} style={freezeEight} onHoverStart={() => setHoveredEight(true)} onHoverEnd={() => setHoveredEight(false)} ><div className="8 rounded-full bg-teal-500 h-24 w-24" /></motion.li>
          </motion.ul>
        </nav>
      </Container>
    </div>
  );
}