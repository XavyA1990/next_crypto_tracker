"use client";

import { sendAiCryptoSuggestionRequest } from "@/services/ai";
import Button from "../Button/Button";
import Icons from "../Icons/Icons";
import labels from "@/lib/labels/labels";
import { useState } from "react";

const { aiLabel } = labels.ai;

const AiSuggestions = ({ name, info, web, symbol }) => {
  const [aiSuggestion, setAiSuggestion] = useState(null);
  console.log("🚀 ~ AiSuggestions ~ aiSuggestion:", aiSuggestion)

  const handleAiSuggestionButton = () => {
    const data = {
      name,
      info,
      web,
      symbol,
    };

    sendAiCryptoSuggestionRequest(data).then((res) => {
      setAiSuggestion(res);
    });
  };

  return (
    <>
      <Button variant={"primary"} onClick={handleAiSuggestionButton}>
        {aiLabel}
        <Icons type={"sparkles"} className={"w-5 h-5"} />
      </Button>
    </>
  );
};

export default AiSuggestions;
