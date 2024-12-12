import Text from "../Text/Text";
import Container from "../Container/Container";
import Image from "../Image/Image";
import Link from "../Link/Link";
import Icons from "../Icons/Icons";
import NewsCardSkeleton from "../Skeleton/NewsCardSkeleton";
import Labels from "../Labels/Labels";

const Card = ({
  imageSrc,
  title,
  text,
  newsUrl,
  sentiment,
  articleSource,
  date,
  fullWidth = false,
  loading,
}) => {
  if (loading) {
    return <NewsCardSkeleton />;
  }

  return (
    <Container
      colorVariant={"primary"}
      customClasses={
        "overflow-hidden rounded-lg shadow h-[504px] flex flex-col"
      }
    >
      {imageSrc && (
        <Image
          height={192}
          width={fullWidth ? 800 : 400}
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="px-4 py-5 flex-1 overflow-y-auto">
        <div className="grid grid-flow-row grid-cols-5 justify-center ">
          <Icons
            type={
              sentiment.toLowerCase() === "positive"
                ? "arrowTrendingUp"
                : "arrowTrendingDown"
            }
            className={`w-6 h-6 col-span-1 ${
              sentiment.toLowerCase() === "positive"
                ? "text-green-500"
                : "text-red-500"
            }`}
          />
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
        <Text colorType={"text-gray-500"} sizeVariant={"text-sm"}>
          {date}
        </Text>
        <Text colorType={"text-gray-500"} sizeVariant={"text-sm"}>
          {articleSource}
        </Text>
      </div>
      <div className="flex justify-end p-4">
        <Link target="_blank" href={newsUrl}>
          <Labels labelFamily={"commons"} label={"seeMore"} />
        </Link>
      </div>
    </Container>
  );
};

export default Card;
