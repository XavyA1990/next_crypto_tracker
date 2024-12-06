import React from "react";
import Text from "../Text/Text";

const CommunityVotesDisplay = ({bullish, bearish, name}) => {
  return (
    <div className="w-full flex mt-4 gap-4 flex-col">
      <Text variant={"h3"} colorType={"normal-text"}>
        Votos de la comunidad
      </Text>
      <div className="w-full bg-gray-200 rounded-full h-6 relative flex overflow-hidden">
        <div
          className="bg-green-600 h-6"
          style={{
            width: `${bullish}%`,
          }}
        ></div>
        <div
          className="bg-red-600 h-6"
          style={{
            width: `${bearish}%`,
          }}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center font-bold">
          {bullish > bearish
            ? `${bullish}%`
            : `${bearish}%`}
        </div>
      </div>
      <Text colorType={"normal-text"}>
        De acuerdo al{" "}
        {bullish > bearish
          ? bullish
          : bearish}
        % de los votantes,{" "}
        <span className="font-semibold uppercase">{name}</span> tiene
        una tendencia{" "}
        <span
          className={
            bullish > bearish
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {bullish > bearish
            ? "ALCISTA"
            : "BAJISTA"}
        </span>
        .
      </Text>
    </div>
  );
};

export default CommunityVotesDisplay;
