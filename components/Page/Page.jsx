import React from "react";
import Container from "../Container/Container";

const Page = ({ children }) => {
  return (
    <>
    <Container customClasses={"flex-1"}>
        <div
          className={`mx-auto max-w-7xl md:px-6 py-3 md:flex-col md:items-center md:justify-between lg:px-8 gap-8`}
        >
          {children}
        </div>
    </Container>
    </>
  );
};

export default Page;
