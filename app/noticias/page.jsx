import Page from "@/components/Page/Page";
import labels from "@/lib/labels/news";
import PageTitle from "@/components/PageTitle/PageTitle";
import News from "@/components/News/News";

const { newsPageTitle } = labels;

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
