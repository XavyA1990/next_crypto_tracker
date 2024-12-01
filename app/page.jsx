import CryptoRanking from "@/components/CryptoNewsRanking/CryptoNewsRanking";
import FearGreedIndicator from "@/components/FearGreedIndicator/FearGreedIndicator";
import Hero from "@/components/Hero/Hero";
import Page from "@/components/Page/Page";

const Inicio = () => {
  return (
    <Page>
      <Hero />
      <FearGreedIndicator />
      <CryptoRanking />
    </Page>
  );
};

export default Inicio;
