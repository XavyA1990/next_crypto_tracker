"use client";

import { Dialog, DialogBackdrop } from "@headlessui/react";
import { signIn } from "@/services/auth";
import { useMenuStore } from "@/store/globalStore";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import Text from "@/components/Text/Text";
import Container from "@/components/Container/Container";
import Icons from "@/components/Icons/Icons";
import Labels from "@/components/Labels/Labels";


const LoginModal = () => {
  const isModalLoginOpen = useMenuStore((state) => state.isModalLoginOpen);
  const toggleModalLogin = useMenuStore((state) => state.toggleModalLogin);

  return (
    <Dialog
      open={isModalLoginOpen}
      onClose={toggleModalLogin}
      className="relative z-10"
    >
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
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center">
                <Logo />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <Text
                  variant={"dialogTitle"}
                  dialogTitleVariant={"h3"}
                  weight="font-semibold"
                  colorType={"text-modal-title"}
                  customClasses={`text-base leading-6`}
                >
                  <Labels labelFamily={"commons"} label={"login"} />
                </Text>
                <div className="mt-2">
                  <Text
                    sizeVariant={"text-sm"}
                    colorType={"text-modal-description"}
                  >
                    <Labels labelFamily={"login"} label={"welcomeMessage"} />
                  </Text>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
              <Button
                options={{ withOutDefaultClass: true }}
                onClick={() => signIn("facebook")}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:col-start-1 sm:mt-0 items-center gap-2"
              >
                <Icons type={"facebook"} />{" "}
                <Labels labelFamily={"login"} label={"signInFacebook"} />
              </Button>
              <Button
                options={{ withOutDefaultClass: true }}
                onClick={() => signIn("google")}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:col-start-2 sm:mt-0 items-center gap-2"
              >
                <Icons type={"google"} /> <Labels labelFamily={"login"} label={"signInGoogle"} />
              </Button>
              <Button
                options={{ withOutDefaultClass: true }}
                onClick={() => toggleModalLogin()}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:col-start-1 sm:mt-0 items-center gap-4 col-span-2"
              >
                <Labels labelFamily={"login"} label={"cancel"} />
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginModal;
