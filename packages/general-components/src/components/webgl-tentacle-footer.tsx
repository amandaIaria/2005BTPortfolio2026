import * as React from 'react';
import { cn } from '../lib/utils';

interface WebGLTentacleFooterProps extends React.ComponentProps<'footer'> {
  text?: string;
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

// Fragment shader — procedural octopus tentacles rising from the bottom.
// Uses aspect-corrected coordinates so tentacles look correct at any size.
const FRAG = `
  precision mediump float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform float u_tentacleCount;

  // --- helpers ---

  float hash(float n) {
    return fract(sin(n) * 43758.5453);
  }

  // Signed distance to a line segment (in pixel space)
  float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  // Tentacle point in pixel space — grows upward from bottom
  vec2 tentaclePoint(float baseX, float t, float seed, float time, float h) {
    float sway = sin(time * 0.8 + seed * 6.0 + t * 4.0) * (20.0 + 15.0 * sin(seed * 3.0));
    float curl = sin(time * 0.5 + seed * 4.0 + t * 6.0) * 10.0 * t;
    float x = baseX + (sway + curl) * t;
    float maxH = h * (0.7 + 0.25 * sin(seed * 5.0));
    float y = t * maxH;
    return vec2(x, y);
  }

  // Thickness in pixels — tapers from base to tip
  float tentacleThickness(float t, float seed) {
    float base = 6.0 + 3.0 * hash(seed * 7.0);
    return base * (1.0 - 0.8 * t);
  }

  // Precompute bounding box for a tentacle to skip pixels far away
  vec4 tentacleBounds(float baseX, float seed, float time, float h) {
    vec2 p0 = tentaclePoint(baseX, 0.0, seed, time, h);
    vec2 p1 = tentaclePoint(baseX, 0.25, seed, time, h);
    vec2 p2 = tentaclePoint(baseX, 0.5, seed, time, h);
    vec2 p3 = tentaclePoint(baseX, 0.75, seed, time, h);
    vec2 p4 = tentaclePoint(baseX, 1.0, seed, time, h);

    float maxThick = 6.0 + 3.0 * hash(seed * 7.0);
    float pad = maxThick + 6.0;

    float minX = min(min(min(p0.x, p1.x), min(p2.x, p3.x)), p4.x) - pad;
    float maxX = max(max(max(p0.x, p1.x), max(p2.x, p3.x)), p4.x) + pad;
    float minY = min(min(min(p0.y, p1.y), min(p2.y, p3.y)), p4.y) - pad;
    float maxY = max(max(max(p0.y, p1.y), max(p2.y, p3.y)), p4.y) + pad;

    return vec4(minX, minY, maxX, maxY);
  }

  // Draw one tentacle — returns (body, sucker glow)
  vec2 drawTentacle(vec2 pos, float baseX, float seed, float time, float h) {
    vec4 bounds = tentacleBounds(baseX, seed, time, h);
    if (pos.x < bounds.x || pos.x > bounds.z ||
        pos.y < bounds.y || pos.y > bounds.w) {
      return vec2(0.0);
    }

    float minDist = 9999.0;
    float suckerGlow = 0.0;

    const int STEPS = 32;
    vec2 prev = tentaclePoint(baseX, 0.0, seed, time, h);

    for (int i = 1; i <= STEPS; i++) {
      float t = float(i) / float(STEPS);
      vec2 cur = tentaclePoint(baseX, t, seed, time, h);
      float d = sdSegment(pos, prev, cur);
      float thick = tentacleThickness(t, seed);
      minDist = min(minDist, d - thick);

      // Suckers at regular intervals
      float suckerMod = mod(float(i), 4.0);
      if (suckerMod < 0.5 && i < STEPS - 2) {
        vec2 mid = (prev + cur) * 0.5;
        vec2 dir = normalize(cur - prev);
        vec2 normal = vec2(-dir.y, dir.x);
        vec2 suckerPos = mid + normal * thick * 0.6;
        float sd = length(pos - suckerPos);
        float suckerR = thick * 0.5;
        float pulse = 0.8 + 0.2 * sin(time * 2.0 + float(i) + seed * 5.0);
        suckerGlow += smoothstep(suckerR, suckerR * 0.1, sd) * pulse * 0.5;
      }
      prev = cur;
    }

    float body = smoothstep(1.5, -0.5, minDist);
    return vec2(body, suckerGlow);
  }

  // Ink particles
  float inkParticle(vec2 uv, float time, float seed) {
    float px = hash(seed) * 0.8 + 0.1;
    float baseY = hash(seed + 1.0) * 0.3;
    float py = baseY + mod(time * 0.03 + hash(seed + 2.0), 0.6);
    float size = 0.006 + hash(seed + 3.0) * 0.008;
    float d = length(uv - vec2(px, py));
    return smoothstep(size, size * 0.2, d) * (0.15 + 0.1 * sin(time + seed));
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;           // 0..1
    vec2 pos = gl_FragCoord.xy;                          // pixel coords
    pos.y = pos.y;                                       // y=0 at bottom
    float w = u_resolution.x;
    float h = u_resolution.y;
    float time = u_time;
    int count = int(u_tentacleCount);

    vec3 col = vec3(0.0);

    // Ink particles (in UV space — resolution independent)
    float ink = 0.0;
    for (int i = 0; i < 12; i++) {
      ink += inkParticle(uv, time, float(i) * 1.7);
    }
    col += vec3(0.6, 0.5, 0.8) * ink;

    // Tentacles (in pixel space)
    float totalBody = 0.0;
    float totalSucker = 0.0;

    for (int i = 0; i < 16; i++) {
      if (i >= count) break;
      float seed = float(i);
      float baseX = (float(i) + 0.5) / u_tentacleCount * w;
      baseX += (hash(seed * 3.3) - 0.5) * w * 0.06;

      vec2 result = drawTentacle(pos, baseX, seed, time, h);
      totalBody  = max(totalBody, result.x);
      totalSucker += result.y;
    }

    // Tentacle color — deep purple / teal gradient
    vec3 tentColor = mix(
      vec3(0.25, 0.1, 0.35),
      vec3(0.1, 0.4, 0.45),
      uv.y * 2.0
    );
    vec3 highlight = vec3(0.5, 0.3, 0.6);

    col = mix(col, tentColor, totalBody * 0.9);
    col += highlight * totalSucker * 0.3;

    // Subtle vignette
    float vig = 1.0 - 0.3 * length((uv - 0.5) * vec2(1.0, 0.5));
    col *= vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ------------------------------------------------------------------ */
/*  WebGL bootstrap                                                    */
/* ------------------------------------------------------------------ */

function initWebGL(
  canvas: HTMLCanvasElement,
  tentacleCount: number,
): (() => void) | null {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: true });
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

  // Full-screen quad
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
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
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

  function start_() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function stop_() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) start_();
      else stop_();
    },
    { threshold: 0 },
  );
  observer.observe(canvas);

  return () => {
    observer.disconnect();
    stop_();
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function WebGLTentacleFooter({
  text,
  tentacleCount = 8,
  className,
  children,
  ...props
}: WebGLTentacleFooterProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanup = initWebGL(canvas, tentacleCount);
    return () => cleanup?.();
  }, [tentacleCount]);

  return (
    <footer
      data-component="webgl-tentacle-footer"
      className={cn('relative overflow-hidden bg-black', className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="block h-48 w-full"
        aria-hidden="true"
      />
      <div className="relative border-t border-white/10 bg-black px-6 py-4 text-center">
        {children ?? (
          <p className="text-sm text-white/60">{text ?? '© 2026'}</p>
        )}
      </div>
    </footer>
  );
}

export { WebGLTentacleFooter };
export type { WebGLTentacleFooterProps };
