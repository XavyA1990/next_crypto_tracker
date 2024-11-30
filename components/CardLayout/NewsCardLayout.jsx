import React from "react";
import Card from "../Card/NewsCard";

const NewsCardLayout = ({ data }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-4 px-6 md:px-0">
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
              />
            </div>
          );
        } else {
          return (
            <div key={index} className="col-span-3 sm:col-span-2 md:col-span-1 ">
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
