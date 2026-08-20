import { UIKitHeader } from '../components/ui-kit/ui-kit-header';
import { Slider } from '../components/slider';
import { sliderFeatured } from '@json/data';

export default function SliderPage() {
  // const { t } = useTranslation('uiKit');
  const headerObj = {
    kicker: '',
    title: 'Projects Slider',
  };

  return (
    <>
      <div className="max-w-300 w-full top-0 absolute z-10 mx-auto bg-white left-0 right-0 px-4">
        <UIKitHeader header={headerObj} />
      </div>
      <div className="w-screen h-auto md:h-screen overflow-visible md:overflow-hidden relative z-1">
        <Slider
          slides={sliderFeatured}
          ariaLabel="Featured projects carousel"
          className="w-full"
        />
      </div>
    </>
  );
}
