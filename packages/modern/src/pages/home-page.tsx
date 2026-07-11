import { Container, WebGLTentacleWall } from '@general/components';

function ModernHomePage() {
  const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/about', label: 'Projects' },
  { href: '/about', label: 'Art' },
  { href: '/about', label: 'Shrines' },
  { href: '/ui-kit', label: 'Ui Kit' },
];

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <WebGLTentacleWall tentacleCount={6} />
      </div>
      <Container data-component="modern-home-page">
        {/* <h1 className="text-3xl font-bold tracking-tight">Modern</h1>
        <p className="mt-2 text-muted-foreground">
          Modern theme — coming soon.
        </p> */}
        <nav className="">
          <ul className="grid gap-4 text-9xl font-bold uppercase text-white mix-blend-difference">
            {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-current underline decoration-8 decoration-current underline-offset-16">{link.label}</a>
          </li>
        ))}
            
          </ul>
        </nav>
      </Container>
    </>
  );
}

export { ModernHomePage };
