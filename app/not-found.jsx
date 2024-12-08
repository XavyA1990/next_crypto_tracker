import Labels from "@/components/Labels/Labels";
import Link from "@/components/Link/Link";
import Page from "@/components/Page/Page";
import Text from "@/components/Text/Text";

const NotFound = () => {
  return (
    <Page>
      <main className="mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
        <Text
          variant={"p"}
          weight="font-semibold"
          colorType={"text-indigo-600"}
          sizeVariant={"text-4xl"}
        >
          <Labels labelFamily="notFound" label="code" />
        </Text>
        <Text
          variant={"h1"}
          customClasses="mt-4 text-pretty font-semibold tracking-tight"
          colorType={"text-title"}
        >
          <Labels labelFamily="notFound" label="title" />
        </Text>
        <Text
          variant={"p"}
          weight="font-medium"
          colorType={"normal-text"}
          sizeVariant={"text-lg sm:text-xl/8"}
          customClasses="mt-6 text-pretty"
        >
          <Labels labelFamily="notFound" label="message" />
        </Text>
        <div className="mt-10">
          <Link
            variant={"no-styles"}
            href="/"
            className="text-sm/7 font-semibold text-indigo-600"
          >
            <span aria-hidden="true">&larr;</span>{" "}
            <Labels labelFamily="commons" label="returnToHome" />
          </Link>
        </div>
      </main>
    </Page>
  );
};

export default NotFound;
