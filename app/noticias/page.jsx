import Page from "@/components/Page/Page";
import labels from "@/lib/labels/labels.json";
import PageTitle from "@/components/PageTitle/PageTitle";
import News from "@/components/News/News";

const { latestNews, crypto } = labels.commons;

const newsPageTitle = `${latestNews} ${crypto}`;

export const metadata = {
  title: 'Next Crypto | Noticias',
  description: 'Noticias de criptomonedas y blockchain',
}


const Noticias = () => {

  return (
    <Page>
      <PageTitle title={newsPageTitle} />
      <News />
    </Page>
  );
};

export default Noticias;
