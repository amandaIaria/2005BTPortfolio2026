import { useRef } from 'react';
import {
  Container,
  ScrollArea,
  TempNav,
  useAvoidOverlap,
  ImageHeader,
  SidebarOld,
} from '@general/components';

export default function HomePage() {
  const obstacleRef = useRef<HTMLDivElement>(null);
  const scrollArea1Ref = useRef<HTMLDivElement>(null);
  const scrollArea2Ref = useRef<HTMLDivElement>(null);
  const scrollAreaRefContainer = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useAvoidOverlap(obstacleRef, [scrollArea1Ref, scrollArea2Ref, footerRef], {
    side: 'right',
    gap: 16,
  });

  return (
    <Container>
      <header data-section="header">
        <ImageHeader pageName="Home" src="./temp-header.jpg" alt="" />
        <div className="p-4 border mt-4">
          <TempNav />
        </div>
      </header>
      <section
        className="grid grid-cols-[175px_1fr] gap-4 mt-4 grid-rows-1 max-h-[calc(100vh-704px)] h-full"
        data-section="main-content"
      >
        <SidebarOld />
        <section
          className="h-full  border p-4 overflow-hidden grid grid-rows-[max-content_1fr]"
          ref={scrollAreaRefContainer}
        >
          <ScrollArea>
            <ScrollArea ref={scrollArea1Ref} className="max-h-max h-full">
              This is the home page of the portfolio. This is the home page of
              the portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio.
            </ScrollArea>
            <ScrollArea ref={scrollArea2Ref} className="max-h-1/2 h-full mt-8">
              This is the home page of the portfolio. This is the home page of
              the portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio. This is the home page of the portfolio. This is the
              home page of the portfolio. This is the home page of the
              portfolio.
            </ScrollArea>
          </ScrollArea>
        </section>
      </section>
      <footer ref={footerRef} data-section="footer" className="mt-4 border p-4">
        footer
      </footer>
      <div
        ref={obstacleRef}
        className="absolute -bottom-10 -right-20 w-[256px] h-[500px]"
      >
        <img
          src="./side-image.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </Container>
  );
}
