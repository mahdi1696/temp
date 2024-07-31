import React, { useState, useEffect, useCallback } from "react";
import EditAbleTable from "../editAbleTable/EditAbleTable";
import AddTable from "../editAbleTable/AddTable";
import { get, toNumber } from "lodash";
import { action_company_search } from "@/app/actions/company";
import StockReplacer from "../stockReplacer/stockReplacer";
//import { repository_company_search } from "../../repository/companyRepository";
//import StockReplacer from "../stockReplacer/StockReplacer";

type Props = {
  portfolio?: FundCompanySuggestionWithId[];
  getPortfolio?: (get: () => IFundPortfolioTrade[] | undefined) => void;
  onRowDelete?: (row: FundCompanySuggestionWithId) => void;
  onRowAdd?: (row: FundCompanySuggestionWithId) => void;
  onCompanyUpdate: (
    row: FundCompanySuggestionWithId,
    company: Company | null
  ) => void;
  // onRowEdit? : ()
};

export default function PortfolioWithSuggestionEditTable({
  portfolio,
  getPortfolio,
  onRowAdd,
  onRowDelete,
  onCompanyUpdate,
}: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);
  const [column, setColumn] = useState<{ key: string; name: string }[] | null>(
    null
  );
  //const [suggestionModal, setSuggestionModal] = useState<Suggestion>();
  const [suggestionData, setData] = useState<Array<
    FundCompanySuggestion & { id: number }
  > | null>(null);

  const uploadPortfolio = () => {
    const canBeNull = ["stockId", "percentOfAllProperty", "priceInMarket"];

    const portfolio = suggestionData?.map((it) => {
      const port: IFundPortfolioTrade = {
        ...it.portfolioRow,
        ...{ stockId: it.suggestion?.stock.id ?? null },
      };

      for (const key of canBeNull) {
        const item = port[key];
        if (typeof item === "string" && item.length == 0) {
          port[key] = null;
        }
      }

      return port;
    });

    return portfolio;
  };

  getPortfolio?.(uploadPortfolio);

  const upDateTable = useCallback(
    (data: FundCompanySuggestionWithId[]) => {
      //create background color for suggestion cell
      const backColor = (like?: number, length?: number) => {
        if (!like || !length) {
          return "#9ea39f6d";
        }

        const percent = () => {
          return (like * 100) / length;
        };

        //it's for replaced item
        if (like < 0 && length < 0) {
          return "#688deb";
        }

        if (like == length) {
          return "#7ef586a6";
        } else if (percent() > 70) {
          return "#7ee7f594";
        } else {
          return "#e7f57eab";
        }
      };

      //=========
      const suggestionAndStockIdCol = (): {
        key: string;
        name: string;
        component?: (
          row: FundCompanySuggestionWithId,
          defaultValue: any,
          key: string
        ) => JSX.Element;
      }[] => {
        const column = [
          {
            key: "suggestion.stock.id",
            name: "StockId",
            component: (
              row: FundCompanySuggestionWithId,
              _: any,
              key: string
            ) => {
              return <p>{get(row, key, "")}</p>;
            },
          },
          {
            key: "dele",
            name: "dele",
            component: (row: FundCompanySuggestionWithId) => {
              return (
                <button
                  onClick={() => {
                    onRowDelete?.(row);
                  }}
                >
                  حذف
                </button>
              );
            },
          },
          {
            key: "suggestion.stock.SymbolLong",
            name: "Suggestion",
            component: (
              row: FundCompanySuggestion & {
                id: number;
              }
            ) => {
              return (
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    width: "100%",
                    minHeight: "1rem",
                    cursor: "pointer",
                    backgroundColor: backColor(
                      row.suggestion?.compare?.like,
                      row.suggestion?.compare?.companyArrLength
                    ),
                  }}
                  onClick={(e) => {
                    setOpenId(row.id);
                    /*  setSuggestionModal({
                    id: row.id,
                    stockId: row.suggestion?.stock.id,
                    suggestion: row.suggestion?.stock.symbolLong,
                    symbol: row.suggestion?.stock.symbol,
                    company: row.suggestion?.company,
                  }); */

                    setModalIsOpen(true);
                  }}
                >
                  {row.suggestion?.stock.symbolLong ||
                    row.suggestion?.stock.namePersian ||
                    row.suggestion?.stock.symbol}
                </p>
              );
            },
          },
        ];

        return column;
      };

      //=========
      if (data.length > 0) {
        const firstItem = data[0].portfolioRow;
        const columns = Object.keys(firstItem).map((it) => {
          return {
            key: `portfolioRow.${it}`,
            name: it,
          };
        });

        const persianCol = mapTableTitle(columns);

        const sugCol = suggestionAndStockIdCol();
        sugCol.push(...persianCol);

        setColumn(sugCol);
        setData(data);
      } else {
        //setFileName("جوابی که سرور برگشته هیچ دیتایی توش نیست :(");
      }
    },
    [onRowDelete]
  );

  useEffect(() => {
    setColumn(null);
    setData(null);

    if (!portfolio || portfolio.length === 0) {
      setColumn(null);
    } else {
      upDateTable(portfolio);
    }
  }, [portfolio, upDateTable]);

  const onAddClickHandler = async (item: IFundPortfolioTrade) => {
    if (portfolio) {
      const { stockId, ...rest } = item;
      if (!stockId) {
        alert("please choice stock id");
        return;
      }

      if (!rest.company) {
        alert("please choice company");
        return;
      }
      //=======================
      const canBeNull = ["priceInMarket", "percentOfAllProperty"];
      const fRow =
        portfolio && portfolio.length > 0
          ? portfolio[0].portfolioRow
          : undefined;
      if (!fRow) {
        return;
      }
      const entries: [string, string | number | null][] = [];
      for (const key in fRow) {
        const item = rest[key];
        if (!item && canBeNull.includes(key)) {
          entries.push([key, null]);
        } else {
          entries.push([key, 0]);
        }
      }
      const row: IFundPortfolioTrade = {
        ...Object.fromEntries(entries),
        ...rest,
      };
      //======================
      try {
        const stock = (
          await action_company_search({
            query: { id: { type: "number", value: stockId } },
            take: 1,
            skip: 0,
          })
        ).result[0];
        if (!stock) {
          alert(`can not find ${stockId} in db`);
          return;
        }

        const suggestion: CompareType = {
          company: rest.company,
          stock: { ...stock, alias: stock.alias ? stock.alias.split(",") : [] },
          compare: {
            like: -1,
            companyArrLength: -1,
            companyStringLength: -1,
            stockStringLength: -1,
          },
        };
        const rowWithSuggestion: FundCompanySuggestionWithId = {
          portfolioRow: row,
          suggestion,
          id: portfolio!!.length + 1,
        };

        onRowAdd?.(rowWithSuggestion);
      } catch (error) {
        alert("there is a error for connect to server");
        console.error(error);
      }
    }
  };

  const getAddTableTitle = () => {
    if (portfolio && portfolio.length > 0) {
      const fRow = portfolio[0];
      const keys = Object.keys(fRow.portfolioRow);
      keys.unshift("stockId");
      return keys.map((it) => ({
        key: it,
        name: mapPortfolioRowPropToPersian(it),
      }));
    }
    return [];
  };

  return (
    <div className="h-full">
      {/* stock replacer modal */}
      {/* <StockReplacer
        open={modalIsOpen}
        onCloseModal={(open_close) => {
          setModalIsOpen(open_close);
        }}
        onUpdateCB={(row) => {
          setModalIsOpen(false);

          const findItem = suggestionData?.find((it) => it.id == openId);

          if (findItem) {
            onCompanyUpdate(findItem, row);
          }
        }}
      /> */}
      <StockReplacer
        key={openId}
        open={modalIsOpen}
        onCloseModal={(state) => {
          setModalIsOpen(state);
        }}
        onUpdateCB={(row) => {
          setModalIsOpen(false);

          const findItem = suggestionData?.find((it) => it.id == openId);

          if (findItem) {
            onCompanyUpdate(findItem, row);
          }
        }}
      />
      <div>
        {portfolio && portfolio.length > 0 && (
          <AddTable
            column={getAddTableTitle()}
            converter={(key, value) => {
              switch (key) {
                case "company": {
                  return value;
                }
                case "suggestion": {
                  return value;
                }
                default:
                  return toNumber(value);
              }
            }}
            addCallBack={onAddClickHandler}
          />
        )}
        <EditAbleTable
          columns={column}
          data={suggestionData}
          // updateCb
        />
      </div>
    </div>
  );
}

const mapPortfolioRowPropToPersian = (col: string) => {
  switch (col) {
    case "company":
      return "شرکت";
    case "startQuantity":
      return "تعداد";
    case "startValue":
      return "بهای تما شده";
    case "startSellValue":
      return "خالص ارزش فروش";
    case "buyQuantity":
      return "خرید طی دوره";
    case "buyValue":
      return "بهای تمام شده";
    case "sellQuantity":
      return "فروش طی دوره";
    case "sellValue":
      return "مبلغ فروش";
    case "endQuantity":
      return "تعداد";
    case "priceInMarket":
      return "قیمت بازار";
    case "endValue":
      return "بهای تمام شده";
    case "endSellValue":
      return "خالص ارزش فروش";
    case "percentOfAllProperty":
      return "درصد به کل دارایی";
    default:
      return col;
  }
};

const mapTableTitle = (
  titles: {
    key: string;
    name: string;
    component?: (
      row: FundCompanySuggestionWithId,
      defaultValue: any,
      key: string
    ) => JSX.Element;
  }[]
): {
  key: string;
  name: string;
  component?: (
    row: FundCompanySuggestionWithId,
    defaultValue: any,
    key: string
  ) => JSX.Element;
}[] => {
  return titles.map((it) => {
    return {
      key: it.key,
      name: mapPortfolioRowPropToPersian(it.name),
    };
  });
};
