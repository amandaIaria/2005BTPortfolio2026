import { useRef } from 'react';
import { Section } from '../components/ui-kit/section';
import { UIKitShell } from '../components/ui-kit/ui-kit-shell';
import { useTranslation } from 'react-i18next';
import { useUIkitNavigation } from '../hooks/use-uikit-navigation';

export default function TypeographyPage() {
  const { t } = useTranslation('uiKit');
  const contentRef = useRef<HTMLDivElement>(null);
  const {tocItems, activeId} = useUIkitNavigation(contentRef)

  const headerObj = {
    kicker: t('typeography.kicker'),
    title: t('typeography.title'),
    description: t('typeography.description'),
  };

  return (
    <UIKitShell header={headerObj} tocItems={tocItems} activeId={activeId}>
      <div
        ref={contentRef}
        data-component="typeography-page"
        className="space-y-10"
      >
        <Section title="Headings" className="sans-serif ">
          <div>
            <h1>h1</h1>
            <h2>h2</h2>
            <h3>h3</h3>
            <h4>h4</h4>
            <h5>h5</h5>
          </div>
        </Section>
        <Section title="Links" className="sans-serif ">
          <div>
            <a href="#"><span>Link</span></a>
            <p>
              Lorem ipsum dolor amet poutine lo-fi intelligentsia cloud bread
              godard, la croix lyft vaporware occupy beard marfa{' '}
              <a href="#"><span>Link</span></a> literally chambray paleo. Pug subway tile
              street art hoodie shaman biodiesel taiyaki affogato coloring
              book.
            </p>
          </div>
        </Section>

        <Section  title="Copy">
            <h3>Heading</h3>
            <p className="font-heading">Lorem ipsum dolor amet poutine lo-fi intelligentsia cloud bread godard, la croix lyft vaporware occupy beard marfa literally chambray paleo. Pug subway tile street art hoodie shaman biodiesel taiyaki affogato coloring book. Edison bulb la croix disrupt, yr neutra cloud bread coloring book helvetica wayfarers VHS keytar man braid. Disrupt hell of lyft fingerstache, banh mi XOXO mustache locavore try-hard meggings cronut chillwave.</p>
            <h3>Sans</h3>
            <p className="font-sans">Lorem ipsum dolor amet poutine lo-fi intelligentsia cloud bread godard, la croix lyft vaporware occupy beard marfa literally chambray paleo. Pug subway tile street art hoodie shaman biodiesel taiyaki affogato coloring book. Edison bulb la croix disrupt, yr neutra cloud bread coloring book helvetica wayfarers VHS keytar man braid. Disrupt hell of lyft fingerstache, banh mi XOXO mustache locavore try-hard meggings cronut chillwave.</p>
            <h3>Serif</h3>
            <p className="font-serif">Lorem ipsum dolor amet poutine lo-fi intelligentsia cloud bread godard, la croix lyft vaporware occupy beard marfa literally chambray paleo. Pug subway tile street art hoodie shaman biodiesel taiyaki affogato coloring book. Edison bulb la croix disrupt, yr neutra cloud bread coloring book helvetica wayfarers VHS keytar man braid. Disrupt hell of lyft fingerstache, banh mi XOXO mustache locavore try-hard meggings cronut chillwave.</p>
            <h3>Mono</h3>
            <p className="font-mono">Lorem ipsum dolor amet poutine lo-fi intelligentsia cloud bread godard, la croix lyft vaporware occupy beard marfa literally chambray paleo. Pug subway tile street art hoodie shaman biodiesel taiyaki affogato coloring book. Edison bulb la croix disrupt, yr neutra cloud bread coloring book helvetica wayfarers VHS keytar man braid. Disrupt hell of lyft fingerstache, banh mi XOXO mustache locavore try-hard meggings cronut chillwave.</p>
        </Section>

        <Section title="Lists">
            <ul>
                <li>List 1</li>
                <li>List 1</li>
                <li>List 1</li>
                <li>List 1</li>
            </ul>
            <ol>
                <li>List 1</li>
                <li>List 1</li>
                <li>List 1</li>
                <li>List 1</li>
            </ol>
        </Section>
      </div>
    </UIKitShell>
  );
}
