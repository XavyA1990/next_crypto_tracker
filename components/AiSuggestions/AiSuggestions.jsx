"use client";

import { sendAiCryptoSuggestionRequest } from "@/services/ai";
import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import { useState } from "react";
import Text from "../Text/Text";
import Container from "../Container/Container";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import Labels from "../Labels/Labels";

const AiSuggestions = ({ name, info, web, symbol }) => {
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAiSuggestionButton = () => {
    setLoading(true);
    const data = {
      name,
      info,
      web,
      symbol,
    };

    sendAiCryptoSuggestionRequest(data)
      .then((res) => {
        setAiSuggestion(res);
      })
      .catch((error) => {
        console.error("Error fetching AI suggestion");
      })
      .finally(() => {
        setLoading(false);
        setOpen(true);
      });
  };

  return (
    <>
      <Button variant={"primary"} onClick={handleAiSuggestionButton}>
        {!loading ? (
          <>
            <Labels labelFamily={"ai"} label={"aiLabel"} />
            <Icons type={"sparkles"} className={"w-5 h-5"} />
          </>
        ) : (
          <Icons type={"arrowPath"} className={"animate-spin w-5 h-5"} />
        )}
      </Button>
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
              <button
                className="absolute top-0 right-0 p-4"
                onClick={() => setOpen(false)}
              >
                <Icons type={"xMark"} className={"w-5 h-5"} />
              </button>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Text
                    variant={"dialogTitle"}
                    dialogTitleVariant={"h3"}
                    weight={"font-semibold"}
                    colorType={"text-modal-title"}
                    customClasses={`text-base leading-6`}
                    sizeVariant={"text-xl md:text-4xl"}
                  >
                    <Labels labelFamily={"ai"} label={"iaDialogTitle"} />
                  </Text>
                  <div className="mt-2">
                    <Text
                      sizeVariant={"text-xl"}
                      colorType={"text-modal-description"}
                    >
                      &quot;{aiSuggestion}&quot; <br />
                      <Labels labelFamily={"commons"} label={"aiGenerated"} />
                    </Text>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AiSuggestions;
