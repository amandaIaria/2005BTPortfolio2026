import { Slider } from '../components/slider';
import { sliderFeatured } from '@json/data';

export default function SliderPage() {
  return (
    <div className="w-screen h-auto md:h-screen overflow-visible md:overflow-hidden">
      <Slider
        slides={sliderFeatured}
        ariaLabel="Featured projects carousel"
        className="w-full"
      />
    </div>
  );
}
