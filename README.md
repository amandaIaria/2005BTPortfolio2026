# Alex's Portfolio

## Getting Started

To run this application:

```bash
npm install
npm run dev
```

## Building For Production

To build this application for production:

```bash
npm run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall the packages: `npm install @tailwindcss/vite tailwindcss -D`

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from '@tanstack/react-router';
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
});
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

### Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start';

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString();
});

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('');

  useEffect(() => {
    getServerTime().then(setTime);
  }, []);

  return <div>Server time: {time}</div>;
}
```

### API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
});
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people');
    return response.json();
  },
  component: PeopleComponent,
});

function PeopleComponent() {
  const data = Route.useLoaderData();
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  );
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

## Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).

## Packages

The site is broken up into packages to keep it relatively organised. 

### @general-components
This is where all of the components (that has nothing to do with pages except for the UI-Kit), hooks, and lib scripts live.

### @design-system
This is where all of the legacy styles and design tokens live

### @json
This is where all copy and content lives. If content needs to be translated this uses `react-i18next` for copy. You can add other languages in it by adding a folder of the language like `en` for english and `es` for spanish.

Also the Markdown files for the content can also be found here.

### @modern
The Modern version of the site (currently live).

### @2005portfolio
This throwback version of the site. Not live.

__Other than in the vitests there should be no hardcoded copy.__

## AI
This site is set up to use Claude and Copilote (mostly Claude), but as of Nov 2026 I am not using AI.

## Hooks
All can be found in `@general-components/hooks`

### use-active-section.ts
This grabs the active id in the ui-kit so that it can mark the sticky side nav element that is active

used only in ui-kit.

### use-avoid-overlap.ts
This is for the 2005Portfolio throwback version of the site. It detects if there isn't enough room to show the bottom right image and shapes the content section.

Used only in the 2005Portfolio version.

### @use-slider.ts
This is for the project slider. At the moment it is only used for the modern verison of the site.

### use-uikit-navigation.ts
Adds section ids to the sticky sidenav so that the user can easily navigate the page.

Used only in the ui-kit

## Components
These use the ShadeCN component library as a starter for most of them. motion/react' for most of the animation, there are some `Webgl` canvas animation (mostly for the tentacles).

All styles should be added in the TailWind way.

- Shadecn - https://ui.shadcn.com/
- motion/react - https://motion.dev/
- TailwindCSS - https://tailwindcss.com/

## Figma
- Legacy Styles - https://www.figma.com/design/lsoJ4nHcmiuNXLIRIH8BzC/Legacy-Design-System?node-id=0-1&t=3CITtZij8rV5z7YJ-1
- Current Ideas - https://www.figma.com/design/H3TujVNGg8snQwtfqPhKyf/BT2026?node-id=35-31&t=3CITtZij8rV5z7YJ-1

Not for later, this will become the source of truth at some point. But right now it's not set up for design tokens or syncing.

## Testing
This project uses ViTest as a testing suite. All tests should be in the `__tests__` folders.

Don't create a test just to see it be available. Have a real reason to create a test.

### Example
Alert.test.tsx

```ts
describe('Alert', () => {
  afterEach(cleanup);

  it('renders with role="alert" and default variant', () => {
    render(
      <Alert>
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>Something to know.</AlertDescription>
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(screen.getByText('Heads up')).not.toBeNull();
    expect(screen.getByText('Something to know.')).not.toBeNull();
  });

  it('renders the destructive variant', () => {
    render(
      <Alert variant="destructive">
        <AlertDescription>Message</AlertDescription>
      </Alert>,
    );
    expect(screen.getByRole('alert').className).toContain('text-destructive');
  });
});
```

## Github Actions
- Solarcloud
- ViTest
- codeql
- eslint

## More
Some of the instruction files can help you make a bit more sense of the project.

- copilot-instructions - [.github/copilot-instructions.md](.github/copilot-instructions.md)
- component instructions -  [packages/general-components/INSTRUCTIONS.md](packages/general-components/INSTRUCTIONS.md)
- slider instructions - [packages/general-components/src/components/slider/INSTRUCTIONS.md](packages/general-components/src/components/slider/INSTRUCTIONS.md)