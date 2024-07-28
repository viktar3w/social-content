import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import Auth from "@/components/Auth";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = () => {
  const { userId } = auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 mt-5 lg:px-6 h-14 flex items-center">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Auth />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Ultimate AI content generator
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our Platform offers a suite of powerful tools to help you
                  generate social media contents with the power of AI
                </p>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">
                  Infinite scalability, zero config
                </h3>
                <p className="text-muted-foreground">
                  Enable code to run on-demand without needing to manage your
                  own infrastructure or upgrade hardware.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">
                  Real-time insights and controls
                </h3>
                <p className="text-muted-foreground">
                  Get granular, first-party, real-user metrics on site
                  performance per deployment.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">
                  Personalization at the edge
                </h3>
                <p className="text-muted-foreground">
                  Deliver dynamic, personalized content, while ensuring users
                  only see the best version of your site.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Acme Inc</span>
        </div>
        <p className="text-xs text-muted-foreground ml-auto">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Twitter
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            LinkedIn
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            GitHub
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Page;
