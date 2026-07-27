import * as React from 'react';
import { cn } from '../lib/utils';

interface WebGLTentacleWallProps extends React.ComponentProps<'div'> {
  tentacleCount?: number;
}

/* ------------------------------------------------------------------ */
/*  Shader sources                                                     */
/* ------------------------------------------------------------------ */

const VERT = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Thick organic tentacles emerging from a solid black left wall.
// Inspired by hand-drawn octopus art — big sweeping arcs, curling
// spiral tips, intertwined overlapping arms, varied thickness.
const FRAG = `
  precision mediump float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform float u_tentacleCount;

  float hash(float n) {
    return fract(sin(n) * 43758.5453);
  }

  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  // Organic tentacle path — big sweeping arc with spiral curl at tip.
  vec2 tentaclePoint(float baseY, float t, float seed, float time, float w, float h) {
    // Arc direction oscillates over time — sweeps from up to down
    float arcDir = sin(time * 0.3 + seed * 4.0);
    float arcAmplitude = h * (0.15 + 0.2 * hash(seed * 4.1));
    float arc = arcDir * sin(t * 3.14159 * 0.8) * arcAmplitude;

    // Base bob — the anchor point itself moves slowly
    float baseBob = sin(time * 0.4 + seed * 7.0) * 200.0;

    float sway = sin(time * 1.0 + seed * 5.0 + t * 3.0)
               * (30.0 + 25.0 * hash(seed * 2.0)) * t;

    float curlPhase = time * 5.0 + seed * 4.0;
    float curlStrength = t * t * t * t * t;
    float spiralFreq = 18.0 + 5.0 * hash(seed * 6.0);
    float spiralAmp = (40.0 + 30.0 * hash(seed * 8.0)) * curlStrength;
    float spiral = sin(curlPhase + t * spiralFreq) * spiralAmp;

    float y = baseY + baseBob + arc + sway + spiral;

    float reach = w * (0.2 + 0.2 * hash(seed * 2.7));
    // Base also shifts horizontally a bit
    float baseShift = sin(time * 0.3 + seed * 9.0) * 8.0;
    float xWobble = sin(time * 5.5 + seed * 3.0 + t * 5.0) * 15.0 * t * t;
    float x = t * reach + xWobble + baseShift;

    return vec2(x, y);
  }

  float tentacleThickness(float t, float seed) {
    float base = 50.0 + 18.0 * hash(seed * 7.0);
    float taper = 1.0 - pow(t, 1.5);
    float bulge = 1.0 + 0.15 * sin(t * 3.14159);
    return base * taper * bulge;
  }

  // Precompute bounding box for a tentacle to skip pixels far away
  vec4 tentacleBounds(float baseY, float seed, float time, float w, float h) {
    // Sample a few points to estimate bounds
    vec2 p0 = tentaclePoint(baseY, 0.0, seed, time, w, h);
    vec2 p1 = tentaclePoint(baseY, 0.25, seed, time, w, h);
    vec2 p2 = tentaclePoint(baseY, 0.5, seed, time, w, h);
    vec2 p3 = tentaclePoint(baseY, 0.75, seed, time, w, h);
    vec2 p4 = tentaclePoint(baseY, 1.0, seed, time, w, h);

    float maxThick = 50.0 + 18.0 * hash(seed * 7.0);
    float pad = maxThick + 10.0;

    float minX = min(min(min(p0.x, p1.x), min(p2.x, p3.x)), p4.x) - pad;
    float maxX = max(max(max(p0.x, p1.x), max(p2.x, p3.x)), p4.x) + pad;
    float minY = min(min(min(p0.y, p1.y), min(p2.y, p3.y)), p4.y) - pad;
    float maxY = max(max(max(p0.y, p1.y), max(p2.y, p3.y)), p4.y) + pad;

    return vec4(minX, minY, maxX, maxY);
  }

  // Draw a single arm — 24 steps with bounding-box early-out
  float drawArm(vec2 pos, float baseY, float seed, float time, float w, float h) {
    // Bounding box check
    vec4 bounds = tentacleBounds(baseY, seed, time, w, h);
    if (pos.x < bounds.x || pos.x > bounds.z ||
        pos.y < bounds.y || pos.y > bounds.w) {
      return 0.0;
    }

    float minDist = 9999.0;
    const int STEPS = 24;
    vec2 prev = tentaclePoint(baseY, 0.0, seed, time, w, h);

    for (int i = 1; i <= STEPS; i++) {
      float t = float(i) / float(STEPS);
      vec2 cur = tentaclePoint(baseY, t, seed, time, w, h);
      float d = sdSegment(pos, prev, cur);
      float thick = tentacleThickness(t, seed);
      minDist = min(minDist, d - thick);
      prev = cur;
    }

    return smoothstep(2.0, -1.0, minDist);
  }

  void main() {
    vec2 pos = gl_FragCoord.xy;
    float w = u_resolution.x;
    float h = u_resolution.y;
    float time = u_time;
    int count = int(u_tentacleCount);

    pos.y = h - pos.y;

    float wallEdge = w * 0.48;

    vec3 col = vec3(0.0);
    float alpha = 1.0;
    if (pos.x < wallEdge) {
      col = vec3(0.0);
    }

    // Tentacles relative to wall edge
    vec2 tPos = vec2(pos.x - wallEdge + 50.0, pos.y);

    // Early out — pixels on the wall don't need tentacle checks
    if (pos.x >= wallEdge) {
      float totalBody = 0.0;

      for (int i = 0; i < 16; i++) {
        if (i >= count) continue;
        float seed = float(i);

        float baseY = (float(i) + 0.5) / u_tentacleCount * h;
        baseY += (hash(seed * 3.3) - 0.5) * h * 0.08;

        float body = drawArm(tPos, baseY, seed, time, w, h);
        totalBody = max(totalBody, body);
      }

      col = mix(col, vec3(0.0), totalBody);
      alpha = totalBody;
    }

    gl_FragColor = vec4(col, alpha);
  }
`;

/* ------------------------------------------------------------------ */
/*  WebGL bootstrap                                                    */
/* ------------------------------------------------------------------ */

function initWebGL(
  canvas: HTMLCanvasElement,
  tentacleCount: number,
): (() => void) | null {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
  if (!gl) return null;

  function compileShader(type: number, source: string) {
    const s = gl!.createShader(type)!;
    gl!.shaderSource(s, source);
    gl!.compileShader(s);
    if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl!.getShaderInfoLog(s));
    }
    return s;
  }

  const vs = compileShader(gl.VERTEX_SHADER, VERT);
  const fs = compileShader(gl.FRAGMENT_SHADER, FRAG);

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(prog));
  }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  // prettier-ignore
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, 1, -1, -1, 1,
    -1,  1, 1, -1,  1, 1,
  ]), gl.STATIC_DRAW);

  const aPos = gl.getAttribLocation(prog, 'a_position');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_resolution');
  const uCount = gl.getUniformLocation(prog, 'u_tentacleCount');

  gl.uniform1f(uCount, tentacleCount);

  let raf = 0;
  const start = performance.now();

  function frame() {
    const w = canvas.clientWidth * devicePixelRatio;
    const h = canvas.clientHeight * devicePixelRatio;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl!.viewport(0, 0, canvas.width, canvas.height);
    gl!.uniform1f(uTime, (performance.now() - start) / 1000);
    gl!.uniform2f(uRes, canvas.width, canvas.height);
    gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    raf = requestAnimationFrame(frame);
  }

  raf = requestAnimationFrame(frame);

  return () => cancelAnimationFrame(raf);
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function WebGLTentacleWall({
  tentacleCount = 6,
  className,
  children,
  ...props
}: WebGLTentacleWallProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanup = initWebGL(canvas, tentacleCount);
    return () => cleanup?.();
  }, [tentacleCount]);

  return (
    <div
      data-component="webgl-tentacle-wall"
      className={cn('relative h-dvh w-dvw', className)}
      {...props}
    >
      <div
        data-component="webgl-tentacle-wall-backdrop"
        className="absolute inset-y-0 left-[48%] right-0 bg-white opacity-50 blur-xl"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRef}
        className="relative block h-full w-full"
        aria-hidden="true"
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

export { WebGLTentacleWall };
export type { WebGLTentacleWallProps };
