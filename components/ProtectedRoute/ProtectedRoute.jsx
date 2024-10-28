"use client";

import useTheme from "@/hooks/useTheme";
import { useAuthStore, useMenuStore } from "@/store/globalStore";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import labels from "@/lib/labels/modals";

const { login, unavailablePage, unavailablePageMessage, returnToHome } = labels;

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const toggleModalLogin = useMenuStore((state) => state.toggleModalLogin);
  const [open, setOpen] = useState(false);
  const { mounted, theme } = useTheme();

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

  if (!mounted) {
    return null;
  }
  if (!user || !user.fullName) {
    return (
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className={`modal-container-base modal-container ${theme}`}
            >
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className={`text-base font-semibold leading-6 text-modal-title ${theme}`}
                  >
                    {unavailablePage}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className={`text-sm text-modal-description ${theme}`}>
                      {unavailablePageMessage}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-4">
                <button
                  type="button"
                  onClick={() => toggleModalLogin()}
                  className={`btn-primary-base btn-primary ${theme}`}
                >
                  {login}
                </button>
                <button
                  type="button"
                  onClick={goHome}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  {returnToHome}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    );
  } else {
    return <div>{children}</div>;
  }
};

export default ProtectedRoute;
