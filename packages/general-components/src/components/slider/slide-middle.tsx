export function SliderMiddle() {
  return (
    <>
      <div
        className="absolute top-0 left-1/2 w-px h-full bg-[var(--line)] hidden @lg:block pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden @lg:block pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-3 h-3 rounded-full bg-[var(--lagoon)] mx-auto" />
        <div className="w-12 h-px bg-[var(--lagoon)] mt-1" />
      </div>
    </>
  );
}
