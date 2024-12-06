import Link from "@/components/Link/Link";
import Page from "@/components/Page/Page";
import Text from "@/components/Text/Text";
import labels from "@/lib/labels/labels.json";

const { returnToHome } = labels.commons;

const { code, title, message } = labels.notFound;

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
          {code}
        </Text>
        <Text
          variant={"h1"}
          customClasses="mt-4 text-pretty font-semibold tracking-tight"
          colorType={"text-title"}
        >
          {title}
        </Text>
        <Text
          variant={"p"}
          weight="font-medium"
          colorType={"normal-text"}
          sizeVariant={"text-lg sm:text-xl/8"}
          customClasses="mt-6 text-pretty"
        >
          {message}
        </Text>
        <div className="mt-10">
          <Link
            variant={"no-styles"}
            href="/"
            className="text-sm/7 font-semibold text-indigo-600"
          >
            <span aria-hidden="true">&larr;</span> {returnToHome}
          </Link>
        </div>
      </main>
    </Page>
  );
};

export default NotFound;
