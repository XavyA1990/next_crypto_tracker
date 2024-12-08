import Text from "../Text/Text";
import Container from "../Container/Container";
import Labels from "../Labels/Labels";

const Footer = () => {
  return (
    <Container type={"footer"} colorVariant={"primary"}>
      <div className="mx-auto max-w-7xl px-6 py-3 md:flex-col md:items-center md:justify-between lg:px-8">
        <Text
          colorType="text-white"
          customClasses="mt-8 normal-text md:order-1 md:mt-0"
          sizeVariant={"text-sm/6"}
        >
          <Labels labelFamily="footer" label="disclaimer" />
        </Text>
        <Text
          colorType="text-white"
          customClasses="mt-8 normal-text md:order-1 md:mt-0"
          sizeVariant={"text-sm/6"}
        >
          <Labels labelFamily="footer" label="trademark" transform="replaceYear" />
        </Text>
      </div>
    </Container>
  );
};

export default Footer;
