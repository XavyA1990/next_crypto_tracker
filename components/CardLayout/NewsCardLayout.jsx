import Card from "../Card/NewsCard";

const SkeletonCard = ({ fullWidth }) => (
  <div
    className={
      fullWidth
        ? "col-span-3 md:col-span-2"
        : "col-span-3 sm:col-span-3 md:col-span-1"
    }
  >
    <Card loading fullWidth={fullWidth} />
  </div>
);

const NewsCardLayout = ({ data, loadingCount = 5, finalCardDifferent = false }) => {
  
  if (data?.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-4 px-3 md:px-0">
        {[...Array(loadingCount)].map((_, index) => (
          <SkeletonCard key={index} fullWidth={index === 0 || (index === loadingCount - 1 && finalCardDifferent)} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-4 px-3 md:px-0">
      {data?.map((item, index) => {
        if (index === 0 || index === 9) {
          return (
            <div key={index} className="col-span-3 md:col-span-2">
              <Card
                sentiment={item.sentiment}
                newsUrl={item.news_url}
                imageSrc={item.image_url}
                title={item.title}
                text={item.text}
                articleSource={item.source_name}
                date={item.date}
                fullWidth
              />
            </div>
          );
        } else {
          return (
            <div
              key={index}
              className="col-span-3 sm:col-span-3 md:col-span-1 "
            >
              <Card
                sentiment={item.sentiment}
                newsUrl={item.news_url}
                imageSrc={item.image_url}
                title={item.title}
                text={item.text}
                articleSource={item.source_name}
                date={item.date}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default NewsCardLayout;
