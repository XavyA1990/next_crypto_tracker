import CryptocurrencyIndex from "@/components/CryptocurrencyIndex/CryptocurrencyIndex";
import Page from "@/components/Page/Page";
import PageTitle from "@/components/PageTitle/PageTitle";

export const metadata = {
  title: "Next Crypto | Cryptos",
  description: "Listado de las mejores criptomonedas del mercado",
};

const Criptomonedas = () => {
  return (
    <Page>
      <PageTitle title="Listado de Cryptos" />
      <CryptocurrencyIndex />
    </Page>
  );
};

export default Criptomonedas;
