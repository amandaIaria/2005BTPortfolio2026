import { useTranslation } from 'react-i18next';
import { Section } from '../section';
import { Playlist } from '../../2005/playlist';

function PlaylistSection() {
  const { t } = useTranslation('uiKit');
  return (
    <Section title={t('sections.playlist.title')}>
      <Playlist
        videos={[
          {
            id: 'vteCosE9qnM',
            title: t('sections.playlist.track1Title'),
          },
        ]}
      />
    </Section>
  );
}

export { PlaylistSection };
