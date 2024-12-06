import Page from "@/components/Page/Page";
import CryptocurrencyShow from "@/components/CryptocurrencyShow/CryptocurrencyShow";

export const metadata = {
  title: "Next Crypto",
  description: "Página de detalle de una criptomoneda",
};

const Criptomoneda = () => {
  return (
    <Page>
      <CryptocurrencyShow />
    </Page>
  );
};

export default Criptomoneda;
