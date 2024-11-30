/* eslint-disable react-hooks/exhaustive-deps */
import CryptoCard from "../Card/CryptoCard";

const CryptoCardLayout = ({ cryptocurrencies }) => {
  const lastCrypto = cryptocurrencies.length;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 md:px-0">
      {cryptocurrencies.map((crypto, index) => (
        <CryptoCard
          key={crypto.id}
          name={crypto.name}
          symbol={crypto.symbol}
          slug={crypto.slug}
          price={crypto.quote.USD.price}
          volume24h={crypto.quote.USD.volume_24h}
          percentChange24h={crypto.quote.USD.percent_change_24h}
          marketCap={crypto.quote.USD.market_cap}
          lastUpdated={crypto.quote.USD.last_updated}
          imageSrc={crypto.image}
          fullWidth={
            (index === lastCrypto - 1 && lastCrypto % 2 === 0) || index === 0
          }
        />
      ))}
    </div>
  );
};

export default CryptoCardLayout;
