/* eslint-disable @next/next/no-img-element */

import React from "react";
import Text from "../Text/Text";

const PageTitle = ({ title, imgSrc }) => {
  return (
    <div className="flex items-baseline gap-8">
      <Text variant={"h1"} colorType={"text-title"}>
        {title}
      </Text>
      {imgSrc && <img src={imgSrc} alt={title}  className="w-14 h-14"/>}
    </div>
  );
};

export default PageTitle;
