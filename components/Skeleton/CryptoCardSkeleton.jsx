import React from "react";
import Container from "../Container/Container";

const CryptoCardSkeleton = ({fullWidth = false}) => {
  return (
    <Container
      colorVariant={"primary"}
      customClasses={`overflow-hidden rounded-lg shadow h-auto flex flex-col animate-pulse ${
        fullWidth && "md:col-span-2"
      }`}
    >
      <div className="w-16 h-16 mx-4 mt-4 bg-gray-300 rounded-full" />
      <div className="px-4 py-5 flex-1">
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <div className="ml-2 h-6 w-3/4 bg-gray-300 rounded" />
        </div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-1/3 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-2/3 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
      </div>
      <div className="flex justify-end p-4">
        <div className="h-8 w-24 bg-gray-300 rounded" />
      </div>
    </Container>
  );
};

export default CryptoCardSkeleton;
