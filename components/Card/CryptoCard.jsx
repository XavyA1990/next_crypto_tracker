"use client";
/* eslint-disable @next/next/no-img-element */
import useTheme from "@/hooks/useTheme";
import Link from "next/link";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Text from "../Text/Text";
import Container from "../Container/Container";
import Image from "../Image/Image";

const CryptoCard = ({
  name,
  symbol,
  price,
  percentChange24h,
  marketCap,
  volume24h,
  lastUpdated,
  slug,
  imageSrc,
  fullWidth = false,
  customButtons = [],
}) => {
  const { mounted, theme } = useTheme();

  if (!mounted) return null;
  return (
    <Container
      colorVariant={"primary"}
      customClasses={`overflow-hidden rounded-lg shadow h-auto flex flex-col ${
        fullWidth && "md:col-span-2"
      }`}
    >
      <Image width={64} height={64} src={imageSrc} alt={name} className="w-16 h-16 mx-4 mt-4" />
      <div className="px-4 py-5 flex-1">
        <div className="flex items-center mb-2">
          {percentChange24h >= 0 ? (
            <ArrowTrendingUpIcon className="w-6 h-6 text-green-500" />
          ) : (
            <ArrowTrendingDownIcon className="w-6 h-6 text-red-500" />
          )}
          <Text
            variant={"h2"}
            sizeVariant={"text-xl"}
            weight="font-semibold"
            colorType={"text-title"}
            customClasses={"ml-2"}
          >
            {name} ({symbol})
          </Text>
        </div>
        <Text colorType={"normal-text"}>
          Precio actual: ${price?.toFixed(2)}
        </Text>
        <Text colorType={"normal-text"}>
          Cambio 24h:{" "}
          <span
            className={
              percentChange24h >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            {percentChange24h.toFixed(2)}%
          </span>
        </Text>
        <Text colorType={"normal-text"}>
          Capitalización de mercado: ${marketCap.toLocaleString()}
        </Text>
        <Text colorType={"normal-text"}>
          Volumen 24h: ${volume24h.toLocaleString()}
        </Text>
        <Text colorType={"text-gray-500"} sizeVariant={"text-sm"}>
          Última actualización: {new Date(lastUpdated).toLocaleString()}
        </Text>
      </div>
      <div
        className={`flex ${
          customButtons.length === 0 ? "justify-end" : "justify-between"
        } p-4`}
      >
        {customButtons.map((button) => button)}
        <Link
          href={`/criptomonedas/${slug}/`}
          className={`btn-primary ${theme} inline-flex items-center px-3 py-2 rounded-md font-bold`}
        >
          Más información
        </Link>
      </div>
    </Container>
  );
};

export default CryptoCard;
