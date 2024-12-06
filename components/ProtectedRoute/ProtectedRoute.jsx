"use client";

import { useAuthStore, useMenuStore } from "@/store/globalStore";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import labels from "@/lib/labels/labels.json";
import Text from "../Text/Text";
import Page from "../Page/Page";
import Button from "../Button/Button";
import Container from "../Container/Container";

const { unavailablePage, unavailablePageMessage } = labels.login;

const { login, returnToHome } = labels.commons

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const toggleModalLogin = useMenuStore((state) => state.toggleModalLogin);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user || !user.fullName) {
      setOpen(true);
    }
    return () => {
      setOpen(false);
    };
  }, [user]);

  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };

  if (!user || !user.fullName) {
    return (
      <>
        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Container
              colorVariant={"primary"}
                customClasses={`modal-container-base`}
              >
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Text
                      variant={"dialogTitle"}
                      dialogTitleVariant={"h3"}
                      weight={"font-semibold"}
                      colorType={"text-modal-title"}
                      customClasses={`text-base leading-6`}
                      sizeVariant={"text-sm"}
                    >
                      {unavailablePage}
                    </Text>
                    <div className="mt-2">
                      <Text

                        sizeVariant={"text-sm"}
                        colorType={"text-modal-description"}
                      >
                        {unavailablePageMessage}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 flex sm:flex-row-reverse gap-4 ">
                  <Button
                    variant={"primary"}
                    onClick={() => toggleModalLogin()}
                  >
                    {login}
                  </Button>
                  <button
                    type="button"
                    onClick={goHome}
                    className="md:mt-3 inline-flex justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-0 "
                  >
                    {returnToHome}
                  </button>
                </div>
              </Container>
            </div>
          </div>
        </Dialog>
        <Page></Page>
      </>
    );
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
