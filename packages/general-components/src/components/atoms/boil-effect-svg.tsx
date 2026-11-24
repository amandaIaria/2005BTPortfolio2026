import { useId, useRef } from 'react';

type BoilTextProps = {
  copy: string;
  className?: string;
};

export function BoilText({ copy, className = '' }: BoilTextProps) {
  const id = useId().replace(/:/g, '');

  const seedAnimation = useRef<SVGAnimateElement>(null);

  const startBoil = () => {
    seedAnimation.current?.beginElement();
  };

  const stopBoil = () => {
    seedAnimation.current?.endElement();
  };

  return (
    <div
      className={`inline-block cursor-pointer ${className}`}
      onPointerEnter={startBoil}
      onPointerLeave={stopBoil}
    >
      <svg
        viewBox="0 0 200 40"
        className="w-full h-auto overflow-visible stroke-wid"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={`sketch-${id}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="2"
              seed="2"
              result="noise"
            >
              <animate
                ref={seedAnimation}
                attributeName="seed"
                values="1;5;2;8;3;9;4;1"
                calcMode="discrete"
                dur="0.18s"
                repeatCount="indefinite"
                begin="indefinite"
              />
            </feTurbulence>

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

       <text
  x="100%"
  stroke="black"
  strokeWidth="2"
  strokeLinejoin="round"
  paintOrder="stroke fill"
  textAnchor="end"
  fontSize="30"
  fontWeight="700"
  fill="currentColor"
  className="font-handwriting"
  filter={`url(#sketch-${id})`}
>
  {copy}
</text>
      </svg>
    </div>
  );
}
