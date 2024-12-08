import { useEffect, useState } from "react";
import Table from "../Table/Table";
import { fetchOneMonthData } from "@/services/crypto";
import { useLabelsStore } from "@/store/globalStore";

const CryptoMonthlyTable = ({ name, symbol }) => {

  const [oneMonthData, setOneMonthData] = useState([]);
  const { labels } = useLabelsStore();

  useEffect(() => {
    if (symbol) {
      fetchOneMonthData(symbol).then((data) => {
        setOneMonthData(data.data);
      });
    }
  }, [symbol]);

  return (
    <Table
      title={`Histórico mensual de ${name}`}
      description={`La evolución de ${name}`}
      headers={labels.headers}
      data={oneMonthData}
    />
  );
};

export default CryptoMonthlyTable;
