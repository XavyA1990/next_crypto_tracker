import CryptocurrencyIndex from "@/components/CryptocurrencyIndex/CryptocurrencyIndex";
import Labels from "@/components/Labels/Labels";
import Page from "@/components/Page/Page";
import PageTitle from "@/components/PageTitle/PageTitle";

export const metadata = {
  title: "Next Crypto | Cryptos",
  description: "Listado de las mejores criptomonedas del mercado",
};

const Criptomonedas = () => {
  return (
    <Page>
      <PageTitle title={<Labels labelFamily={"cryptoIndex"} label={"title"}/>} />
      <CryptocurrencyIndex />
    </Page>
  );
};

export default Criptomonedas;
