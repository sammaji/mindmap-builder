import Image from "next/image";
import { HeroProps } from "~/shared/types";
import CTA from "../common/CTA";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const data = {
  title: "Build Mindmaps With Ease",
};

const Hero = ({ subtitle, tagline, image }: HeroProps) => {
  return (
    <section id="heroOne">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
            {tagline && (
              <p className="text-base font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-200">
                {tagline}
              </p>
            )}
            {data.title && (
              <h1 className="leading-tighter font-heading mb-6 text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                {data.title}
              </h1>
            )}
            <div className="mx-auto max-w-3xl">
              {subtitle && (
                <p className="mb-6 text-xl font-normal text-gray-600 dark:text-slate-400">
                  {subtitle}
                </p>
              )}
              <div className="flex max-w-none flex-col flex-nowrap gap-4 px-4 sm:flex-row sm:justify-center">
                <Link href="/editor">
                  <Button size="xl">Get Started</Button>
                </Link>
                <Button size="xl" variant="outline">
                  Learn More{" "}
                </Button>
              </div>
            </div>
          </div>
          {image && (
            <div className="relative m-auto max-w-5xl">
              <Image
                className="mx-auto h-auto w-full rounded-md bg-gray-400 dark:bg-slate-700"
                src={image.src}
                alt={image.alt}
                width={1024}
                height={607}
                sizes="(max-width: 64rem) 100vw, 1024px"
                loading="eager"
                placeholder="blur"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
