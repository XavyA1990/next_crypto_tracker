import React from "react";
import Container from "../Container/Container";
import Text from "../Text/Text";
import labels from "@/lib/labels/labels.json";
import Link from "../Link/Link";

const { cta, heroTitle, heroSubtitle } = labels.hero

const { latestNews } = labels.commons;

const Hero = () => {
  return (
    <Container customClasses="relative isolate ">
      <div className="py-24 lg:px-8 ">
        <div className="mx-auto max-w-2xl text-center">
          <Text
            variant={"h2"}
            colorType={"text-title"}
            weight="font-semibold"
            sizeVariant={"text-4xl sm:text-5xl"}
            customClasses={"text-balance tracking-tight"}
          >
            {heroTitle}
          </Text>
          <Text
            colorType={"text-title"}
            customClasses={
              "mx-auto mt-6 max-w-xl text-pretty text-lg/8 px-2 md:px-0"
            }
          >
            {heroSubtitle}
          </Text>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link variant={"white-fill"} href="/criptomonedas">
              {cta}
            </Link>
            <Link href="/noticias" variant={"no-fill"}>
              <Text variant={"span"} colorType={"text-title"}>
                {latestNews} <span aria-hidden="true">→</span>
              </Text>
            </Link>
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-50 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
      >
        <circle
          r={512}
          cx={512}
          cy={512}
          fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
            <stop stopColor="#7775D6" />
            <stop offset={1} stopColor="#E935C1" />
          </radialGradient>
        </defs>
      </svg>
    </Container>
  );
};

export default Hero;
