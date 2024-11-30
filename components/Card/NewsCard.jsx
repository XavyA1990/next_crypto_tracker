"use client";
import useTheme from "@/hooks/useTheme";
/* eslint-disable @next/next/no-img-element */
import { Button } from "@headlessui/react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import labels from "@/lib/labels/news";
import Text from "../Text/Text";
import Container from "../Container/Container";

const { seeMore } = labels;

const Card = ({
  imageSrc,
  title,
  text,
  newsUrl,
  sentiment,
  articleSource,
  date,
}) => {
  const { mounted, theme } = useTheme();

  if (!mounted) return null;
  return (
    <Container
    colorVariant={"primary"}
    customClasses={"overflow-hidden rounded-lg shadow h-[504px] flex flex-col"}
    >
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="px-4 py-5 flex-1 overflow-y-auto">
        <div className="grid grid-flow-row grid-cols-5 justify-center ">
          {sentiment.toLowerCase() === "positive" ? (
            <ArrowTrendingUpIcon className="w-full h-8 text-green-500 col-span-1" />
          ) : (
            <ArrowTrendingDownIcon className="w-8 h-8 text-red-500 col-span-1" />
          )}
          <Text
            variant={"h2"}
            colorType={"text-title"}
            sizeVariant={"text-xl"}
            weight="font-semibold"
            customClasses={`col-span-4 mb-2`}
          >
            {title}
          </Text>
        </div>
        <Text colorType={"normal-text"}>{text}</Text>
        <Text colorType={"text-gray-500"} sizeVariant={"text-sm"}>{date}</Text>
        <Text colorType={"text-gray-500"} sizeVariant={"text-sm"}>{articleSource}</Text>
      </div>
      <div className="flex justify-end p-4">
        <Button
          as="a"
          target="_blank"
          href={newsUrl}
          className={`btn-primary ${theme} inline-flex items-center px-3 py-2 rounded-md font-bold`}
        >
          {seeMore}
        </Button>
      </div>
    </Container>
  );
};

export default Card;
