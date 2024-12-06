import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import labels from "@/lib/labels/labels.json";
import { fetchOneMonthData } from "@/services/crypto";
const { headers } = labels;

const CryptoMonthlyTable = ({ name, symbol }) => {

  const [oneMonthData, setOneMonthData] = useState([]);

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
      headers={headers}
      data={oneMonthData}
    />
  );
};

export default CryptoMonthlyTable;
