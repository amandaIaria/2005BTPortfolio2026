export function SliderMiddle() {
  return (
    <>
      <div
        className="absolute top-0 left-1/2 w-1 h-full bg-[var(--line)] z-5 hidden @lg:block pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="js-auto-slider-timer absolute top-0 left-1/2 w-1 h-full bg-[var(--teal)] z-5 hidden pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute top-1/2 z-6 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden @lg:block pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute h-8 w-8 -top-[8px] z-6 left-[19px] rounded-full bg-[var(--lagoon)] mx-auto" />
        <div className="w-12 h-1 bg-[var(--line)] mt-1 ml-5" />
      </div>
    </>
  );
}
