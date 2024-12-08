import Page from "@/components/Page/Page";
import PageTitle from "@/components/PageTitle/PageTitle";
import News from "@/components/News/News";
import Labels from "@/components/Labels/Labels";

export const metadata = {
  title: "Next Crypto | Noticias",
  description: "Noticias de criptomonedas y blockchain",
};

const Noticias = () => {
  return (
    <Page>
      <PageTitle
        title={
          <div className="flex gap-4">
            <Labels labelFamily={"commons"} label={"latestNews"} />{" "}
            <Labels labelFamily={"commons"} label={"crypto"} />
          </div>
        }
      />
      <News />
    </Page>
  );
};

export default Noticias;
