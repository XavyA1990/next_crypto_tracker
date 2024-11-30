import labels from "@/lib/labels/footer";
import Text from "../Text/Text";
import Container from "../Container/Container";

const { disclaimer, trademark } = labels;

const YEAR = new Date().getFullYear();

const TRADEMARK_WITH_YEAR = trademark.replace('"year"', YEAR);

const Footer = () => {

  return (
    <Container type={"footer"} colorVariant={"primary"}>
      <div className="mx-auto max-w-7xl px-6 py-3 md:flex-col md:items-center md:justify-between lg:px-8">
        <Text
          colorType="text-white"
          customClasses="mt-8 normal-text md:order-1 md:mt-0"
          sizeVariant={"text-sm/6"}
        >
          {disclaimer}
        </Text>
        <Text
          colorType="text-white"
          customClasses="mt-8 normal-text md:order-1 md:mt-0"
          sizeVariant={"text-sm/6"}
        >
          {TRADEMARK_WITH_YEAR}
        </Text>
      </div>
    </Container>
  );
};

export default Footer;
