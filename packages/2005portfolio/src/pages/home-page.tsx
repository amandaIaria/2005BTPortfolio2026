import { TempNav } from '@general/components';

export default function HomePage() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <header>
        <TempNav />
      </header>
      <section className="">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This is the home page of the portfolio.
        </p>
      </section>
      <footer>footer</footer>
    </main>
  );
}
