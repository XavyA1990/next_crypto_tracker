import React from "react";
import Text from "../Text/Text";
import { ArrowTrendingUpIcon, MinusIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingDownIcon } from "@heroicons/react/20/solid";
import Spinner from "../Spinner/Spinner";

const Table = ({ headers, data, description, title }) => {
  return (
    <div className="px-3 sm:px-0 mt-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Text variant={"h3"} colorType={"text-title"}>
            {title}
          </Text>
          <Text
            colorType={"normal-text"}
            sizeVariant={"text-sm"}
            customClasses="mt-2"
          >
            {description}
          </Text>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <Text
                      key={header.key}
                      variant={"th"}
                      colorType={"text-title"}
                      customClasses={`${
                        index === 0 ? "pl-4 pr-3" : "px-3"
                      } py-3.5 text-left text-sm text-center ${
                        index === headers.length - 1 ? "pl-3 pr-4" : ""
                      }`}
                      weight="font-semibold"
                      sizeVariant={"text-sm"}
                    >
                      {header.label}
                    </Text>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500">
                {(!data || data.length === 0) && (
                  <tr>
                    <td colSpan={headers.length} className="text-center py-4">
                      <div className="flex items-center w-full justify-center">
                        <Spinner />
                      </div>
                    </td>
                  </tr>
                )}
                {data.map((row, index) => (
                  <tr key={row.openTime}>
                    <Text
                      variant={"td"}
                      colorType={"text-title"}
                      weight="font-medium"
                      sizeVariant={"text-sm"}
                      customClasses="py-4 pl-4 pr-3 sm:pl-0"
                    >
                      {row.openTime}
                    </Text>
                    <Text
                      variant={"td"}
                      colorType={"text-title"}
                      weight="font-medium"
                      sizeVariant={"text-sm"}
                      customClasses="px-3 py-4 pr-3 sm:pl-0 text-center"
                    >
                      {row.openPrice}
                    </Text>
                    <Text
                      variant={"td"}
                      colorType={"text-title"}
                      weight="font-medium"
                      sizeVariant={"text-sm"}
                      customClasses="px-3 py-4 pr-3 sm:pl-0 text-center"
                    >
                      {row.highPrice}
                    </Text>
                    <Text
                      variant={"td"}
                      colorType={"text-title"}
                      weight="font-medium"
                      sizeVariant={"text-sm"}
                      customClasses="px-3 py-4 pr-3 sm:pl-0 text-center"
                    >
                      {row.lowPrice}
                    </Text>
                    <Text
                      variant={"td"}
                      colorType={"text-title"}
                      weight="font-medium"
                      sizeVariant={"text-sm"}
                      customClasses="px-3 py-4 pr-3 sm:pl-0 text-center"
                    >
                      {row.closePrice}
                    </Text>
                    <Text
                      variant={"td"}
                      colorType={"text-title"}
                      weight="font-medium"
                      sizeVariant={"text-sm"}
                      customClasses="px-3 py-4 pr-3 sm:pl-0 text-center"
                    >
                      {row.volume}
                    </Text>
                    <Text
                      variant={"td"}
                      colorType={"text-title"}
                      weight="font-medium"
                      sizeVariant={"text-sm"}
                      customClasses="px-3 py-4 pr-3 sm:pl-0 text-center"
                    >
                      {row.closedTime}
                    </Text>
                    <Text
                      variant={"td"}
                      colorType={"text-title"}
                      weight="font-medium"
                      sizeVariant={"text-sm"}
                      customClasses="px-3 py-4 pr-3 sm:pl-0 text-center"
                    >
                      {row.priceIsHigh === "up" ? (
                        <span className="text-green-500 flex justify-center">
                          <ArrowTrendingUpIcon className="w-6 h-6" />
                        </span>
                      ) : row.priceIsHigh === "down" ? (
                        <span className="text-red-500 flex justify-center">
                          <ArrowTrendingDownIcon className="w-6 h-6" />
                        </span>
                      ) : (
                        <span className="text-gray-500 flex justify-center">
                          <MinusIcon className="w-6 h-6" />
                        </span>
                      )}
                    </Text>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
