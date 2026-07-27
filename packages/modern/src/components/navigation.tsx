import { Container, WebGLTentacleWall } from '@general/components';

interface NavigationProps {
  onNavigate?: () => void;
}

function Navigation({ onNavigate }: NavigationProps) {
  const navLinks = [
    { href: '/modern', label: 'Home' },
    { href: '/modern/about', label: 'About' },
    { href: '/modern/projects', label: 'Projects' },
    { href: '/modern/art', label: 'Art' },
    { href: '/modern/shrines', label: 'Shrines' },
    { href: '/modern/contact', label: 'Contact' },
  ];

  return (
    <>
      <div className="absolute inset-0 -z-10">
        <WebGLTentacleWall tentacleCount={6} />
      </div>
      <Container data-component="modern-navigation">
        <nav className="grid h-screen place-content-center">
          <ul className="grid gap-10 text-9xl font-bold uppercase text-white mix-blend-difference">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={onNavigate}
                  className="text-current decoration-8 decoration-current underline-offset-16"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}

export { Navigation };
