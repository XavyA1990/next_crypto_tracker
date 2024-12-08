import Container from "../Container/Container";

const NewsCardSkeleton = () => {
  return (
    <Container
      colorVariant={"primary"}
      customClasses={
        "overflow-hidden rounded-lg shadow h-[504px] flex flex-col animate-pulse"
      }
    >
      <div className="w-full h-48 bg-gray-300" />
      <div className="px-4 py-5 flex-1">
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
        <div className="h-4 bg-gray-300 rounded mb-1 w-5/6" />
        <div className="h-4 bg-gray-300 rounded mb-1 w-2/3" />
        <div className="h-4 bg-gray-300 rounded mb-1 w-1/2" />
      </div>
      <div className="flex justify-end p-4">
        <div className="h-6 bg-gray-300 rounded w-16" />
      </div>
    </Container>
  );
};

export default NewsCardSkeleton;
