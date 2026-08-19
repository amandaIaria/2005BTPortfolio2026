import { WebGLTentacleFooter } from '../components/webgl-tentacle-footer';
import { WebGLTentacleWall } from '../components/webgl-tentacle-wall';
import { Separator } from '../components/ui/separator';
import { UIKitFooter } from '../components/ui-kit/ui-kit-footer';
import { UIKitHeader } from '../components/ui-kit/ui-kit-header';
import { Section } from '../components/ui-kit/section';
import { useTranslation } from 'react-i18next';

export default function WebGLTentacleFooterPage() {
  const { t } = useTranslation('uiKit');
  const headerObj = {
    kicker: t('webglTentacleFooter.kicker'),
    title: t('webglTentacleFooter.title'),
    description: t('webglTentacleFooter.description'),
  };
  return (
    <>
    <main
      data-component="colors-page"
      className="max-w-300 relative z-10 w-full mx-auto bg-background text-foreground space-y-10 px-4 pb-16 pt-14"
    >
      <UIKitHeader header={headerObj} />
      
      <div>
        <Section title={t('webglTentacleFooter.defaultHeading')}>
          <WebGLTentacleFooter
            text={t('webglTentacleFooter.defaultText')}
            className="rounded-lg"
          />
        </Section>

        <Section title={t('webglTentacleFooter.denseHeading')}>
          <WebGLTentacleFooter
            tentacleCount={14}
            text={t('webglTentacleFooter.denseText')}
            className="rounded-lg"
          />
        </Section>

        <Section title={t('webglTentacleFooter.minimalHeading')}>
          <WebGLTentacleFooter
            tentacleCount={3}
            text={t('webglTentacleFooter.minimalText')}
            className="rounded-lg"
          />
        </Section>

        <Section title={t('webglTentacleFooter.customHeading')}>
          <WebGLTentacleFooter tentacleCount={10} className="rounded-lg">
            <div className="flex items-center justify-center gap-4 text-sm text-white/60">
              <span>{t('webglTentacleFooter.customTagWebgl')}</span>
              <span className="text-white/20">|</span>
              <span>{t('webglTentacleFooter.customTagNoDependencies')}</span>
              <span className="text-white/20">|</span>
              <span>{t('webglTentacleFooter.customTag60fps')}</span>
            </div>
          </WebGLTentacleFooter>
        </Section>

        <Separator />

        {/* h2/description only - WebGLTentacleWall stays outside Section's
            bordered/padded box so it can render full-bleed 100vh x 100vw */}
        <Section
          title={t('webglTentacleFooter.wallHeading')}
          className="overflow-hidden"
        >
          
          <WebGLTentacleWall tentacleCount={6} />
        </Section>
      </div>
    </main>
    <UIKitFooter />
    </>
  );
}
