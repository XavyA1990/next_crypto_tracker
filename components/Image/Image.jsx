import React from "react";
import NextImage from "next/image";

const Image = ({
  src,
  width,
  height,
  alt,
  fill,
  loading = "lazy",
  placeholder,
  className,
}) => {
  return (
    <NextImage
      src={src}
      width={width}
      height={height}
      alt={alt}
      fill={fill}
      loading={loading}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Image;
