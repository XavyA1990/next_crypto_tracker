import React from "react";
import Container from "../Container/Container";
import Text from "../Text/Text";
import Link from "next/link";

const Hero = () => {
  return (
    <Container customClasses="relative isolate overflow-hidden">
      <div className="py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Text
            variant={"h2"}
            colorType={"text-title"}
            weight="font-semibold"
            sizeVariant={"text-4xl sm:text-5xl"}
            customClasses={"text-balance tracking-tight"}
          >
            Encuentra tu proxima inversión
          </Text>
          <Text
            variant={"p"}
            colorType={"text-title"}
            customClasses={"mx-auto mt-6 max-w-xl text-pretty text-lg/8 "}
          >
            Conoce las criptomonedas más populares y las últimas noticias del mercado.
          </Text>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/criptomonedas"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Empecemos
            </Link>
            <Link
              href="/noticias"
              className="text-sm/6 font-semibold text-white"
            >
              Últimas Noticias <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
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
