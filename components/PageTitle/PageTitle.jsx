import React from "react";
import Text from "../Text/Text";
import Image from "../Image/Image";

const PageTitle = ({ title, imgSrc }) => {
  return (
    <div className="flex items-baseline gap-8 px-3 md:px-0">
      <Text variant={"h1"} colorType={"text-title"}>
        {title}
      </Text>
      {imgSrc && <Image width={56} height={56} src={imgSrc} alt={title}  className="w-14 h-14"/>}
    </div>
  );
};

export default PageTitle;
