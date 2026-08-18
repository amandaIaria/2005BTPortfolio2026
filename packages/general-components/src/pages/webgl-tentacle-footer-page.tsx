import { WebGLTentacleFooter } from '../components/webgl-tentacle-footer';
import { WebGLTentacleWall } from '../components/webgl-tentacle-wall';
import { TempNav } from '../components/temp-nav';
import { Separator } from '../components/ui/separator';
import { Button } from '../components/ui/button';
import { Link } from '@tanstack/react-router';

export default function WebGLTentacleFooterPage() {
  return (
    <main className="page-wrap bg-background border text-foreground space-y-10 px-4 pb-16 pt-14">
      <header>
        <TempNav />
      </header>

      <div>
        <Button variant="link" className="mb-2 px-0" asChild>
          <Link to="/ui-kit">&larr; Back to UI Kit</Link>
        </Button>
        <h1 className="display-title">
          WebGL Tentacle Footer
        </h1>
        <p className="mt-3 max-w-xl text-white/60">
          GPU-rendered octopus tentacles using a WebGL fragment shader.
          Procedural bezier ribbons with suckers and floating ink particles.
        </p>
      </div>

      <Separator />

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default (8 tentacles)</h2>
        <WebGLTentacleFooter text="© 2026 Portfolio" className="rounded-lg" />
      </section>

      {/* Dense */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dense (14 tentacles)</h2>
        <WebGLTentacleFooter
          tentacleCount={14}
          text="🐙 Dense tentacles"
          className="rounded-lg"
        />
      </section>

      {/* Minimal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Minimal (3 tentacles)</h2>
        <WebGLTentacleFooter
          tentacleCount={3}
          text="Just a few tentacles"
          className="rounded-lg"
        />
      </section>

      {/* With custom children */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom footer content</h2>
        <WebGLTentacleFooter tentacleCount={10} className="rounded-lg">
          <div className="flex items-center justify-center gap-4 text-sm text-white/60">
            <span>Built with WebGL</span>
            <span className="text-white/20">|</span>
            <span>No dependencies</span>
            <span className="text-white/20">|</span>
            <span>60fps</span>
          </div>
        </WebGLTentacleFooter>
      </section>

      <Separator />

      {/* Tentacle Wall — full viewport */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tentacle Wall (100vh × 100vw)</h2>
        <p className="text-sm text-white/60">
          Black wall on the left with tentacles reaching out horizontally.
          Scroll down to see it.
        </p>
      </section>
      <WebGLTentacleWall tentacleCount={6} />
    </main>
  );
}
