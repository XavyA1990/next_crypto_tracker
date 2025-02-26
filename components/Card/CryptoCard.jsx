import Link from "../Link/Link";
import Text from "../Text/Text";
import Container from "../Container/Container";
import Image from "../Image/Image";
import Icons from "../Icons/Icons";
import CryptoCardSkeleton from "../Skeleton/CryptoCardSkeleton";
import Labels from "../Labels/Labels";

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
  loading,
}) => {
  if (loading) {
    return <CryptoCardSkeleton fullWidth={fullWidth} />;
  }

  return (
    <Container
      colorVariant={"primary"}
      customClasses={`overflow-hidden rounded-lg shadow h-auto flex flex-col ${
        fullWidth && "md:col-span-2"
      }`}
    >
      <Image
        width={64}
        height={64}
        src={imageSrc}
        alt={name}
        className="w-16 h-16 mx-4 mt-4"
      />
      <div className="px-4 py-5 flex-1">
        <div className="flex items-center mb-2">
          <Icons
            type={
              percentChange24h >= 0 ? "arrowTrendingUp" : "arrowTrendingDown"
            }
            className={`w-6 h-6 ${
              percentChange24h >= 0 ? "text-green-500" : "text-red-500"
            }`}
          />
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
          <Labels labelFamily={"cryptoCard"} label={"currentPrice"} /> $
          {price?.toFixed(2)}
        </Text>
        <Text colorType={"normal-text"}>
          <Labels labelFamily={"cryptoCard"} label={"change24h"} />{" "}
          <span
            className={
              percentChange24h >= 0 ? "text-green-500" : "text-red-500"
            }
          >
            {percentChange24h.toFixed(2)}%
          </span>
        </Text>
        <Text colorType={"normal-text"}>
          <Labels labelFamily={"cryptoCard"} label={"marketCap"} /> $
          {marketCap.toLocaleString()}
        </Text>
        <Text colorType={"normal-text"}>
          <Labels labelFamily={"cryptoCard"} label={"volume24h"} /> $
          {volume24h.toLocaleString()}
        </Text>
        <Text colorType={"text-gray-500"} sizeVariant={"text-sm"}>
          <Labels labelFamily={"cryptoCard"} label={"lastUpdate"} />
          {new Date(lastUpdated).toLocaleString()}
        </Text>
      </div>
      <div
        className={`flex ${
          customButtons.length === 0 ? "justify-end" : "justify-between"
        } p-4`}
      >
        {customButtons.map((button) => button)}
        <Link href={`/criptomonedas/${slug}/`} variant={"primary"}>
          <Labels labelFamily={"commons"} label={"moreInformation"} />
        </Link>
      </div>
    </Container>
  );
};

export default CryptoCard;
