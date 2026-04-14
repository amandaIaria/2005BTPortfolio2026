import { Container, ScrollArea, TempNav } from '@general/components';
import { ImageHeader } from '../components/image-header';
import { SidebarOld } from '../components/sidebar-old';

export default function HomePage() {
  return (
    
      <Container>
        <header>
          <ImageHeader
            pageName="Home"
            src="./temp-header.jpg"
            alt=""
          />
          <div className="p-4 border mt-4">
            <TempNav />
          </div>
        </header>
        <section className="grid grid-cols-[150px_1fr] gap-8 mt-4">
          <SidebarOld />
          <section className=" h-[calc(100vh-670px)] border p-4 overflow-hidden">
            <ScrollArea className='h-1/2'>
              This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. 
            </ScrollArea>
            <ScrollArea className="h-1/2 mt-8 w-[calc(100%-130px)]">
              This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. This is the home page of the portfolio. 
            </ScrollArea>
          </section>
        </section>
        <footer className="mt-4 border p-4 w-[calc(100%-150px)]">footer</footer>
        <div className="absolute -bottom-10 -right-20 w-[256px] h-[500px]">
          <img src="./side-image.png" alt="" className="w-full h-full object-cover" />
        </div>
      </Container>
   
  );
}
