import { useEffect, useState } from "react";
import Table from "../Table/Table";
import { fetchOneMonthData } from "@/services/crypto";
import { useLabelsStore } from "@/store/globalStore";

const CryptoMonthlyTable = ({ name, symbol }) => {

  const [oneMonthData, setOneMonthData] = useState([]);
  const { labels } = useLabelsStore();
  const {currentLanguage} = useLabelsStore();

  useEffect(() => {
    if (symbol) {
      fetchOneMonthData(symbol, currentLanguage).then((data) => {
        setOneMonthData(data.data);
      });
    }
  }, [symbol, currentLanguage]);

  return (
    <Table
      title={`${labels.cryptoTable.title} ${name}`}
      description={`${labels.cryptoTable.subTitle} ${name}`}
      headers={labels.headers}
      data={oneMonthData}
    />
  );
};

export default CryptoMonthlyTable;
