"use client"
import { useLabelsStore } from "@/store/globalStore";

const Labels = ({ labelFamily, label, transform }) => {
  const { labels } = useLabelsStore();

  let labelValue = labels[labelFamily]?.[label] || "";

  if (transform && transform === "replaceYear") {
    const YEAR = new Date().getFullYear();
    labelValue = labelValue.replace('"year"', YEAR);
  }

  return <span>{labelValue}</span>;
};

export default Labels;


