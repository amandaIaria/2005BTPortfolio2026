import { Container, WebGLTentacleWall } from '@general/components';
import { Button } from '@general/components/button';

function ModernContactPage() {
  return (
    <>
      <div className="fixed -z-10 -bottom-[50vh]">
        <WebGLTentacleWall tentacleCount={6} rotate={-90} />
      </div>
      <Container
        data-component="modern-contact-page"
        className="max-w-5xl h-screen mx-auto grid items-center"
      >
        <div className="grid gap-20 grid-cols-[200px_1fr]">
          <div className="flex flex-col gap-10">
            <h1 className="text-6xl">Contact Me</h1>
            <p className="text-lg font-medium text-accent">
              I&apos;m always open to new opportunities and collaborations. Feel
              free to reach out to me through the contact form or connect with
              me on social media.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <form
              action="/api/contact"
              method="POST"
              className="grid grid-cols-1 gap-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
              />
              <input
                type="email"
                name="email   "
                placeholder="Your Email"
                required
                className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="w-full rounded-lg border border-gray-300 p-4 text-lg focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
              ></textarea>
              <Button
                type="submit"
                size="lg"
                className="rounded-lg bg-accent py-4 px-6 text-lg font-semibold text-white transition-colors duration-300 hover:bg-accent-dark"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}

export { ModernContactPage };
