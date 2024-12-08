import Labels from "../Labels/Labels";
import Text from "../Text/Text";

const CommunityVotesDisplay = ({ bullish, bearish, name }) => {
  return (
    <div className="w-full flex mt-4 gap-4 flex-col px-3 md:px-0">
      <Text variant={"h3"} colorType={"normal-text"}>
        <Labels labelFamily={"communityVotes"} label={"title"} />
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
          {bullish > bearish ? `${bullish}%` : `${bearish}%`}
        </div>
      </div>
      <Text colorType={"normal-text"}>
        <Labels labelFamily={"communityVotes"} label={"voteStatement1"} />{" "}
        {`${bullish > bearish ? bullish : bearish}`}
        <Labels labelFamily={"communityVotes"} label={"voteStatement2"} /> {""}
        <span className="font-semibold uppercase">{name}</span>{" "}
        <Labels labelFamily={"communityVotes"} label={"voteStatement3"} />{" "}
        <span
          className={
            bullish > bearish
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          <Labels
            labelFamily={"communityVotes"}
            label={bullish > bearish ? "bullishLabel" : "bearishLabel"}
          />
        </span>
        .
      </Text>
    </div>
  );
};

export default CommunityVotesDisplay;
