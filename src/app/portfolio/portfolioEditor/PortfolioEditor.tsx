import { toNumber } from "lodash";
import React, { useState, useEffect } from "react";
import { action_portfolio_updateRow } from "../../actions/portfolio";
import AddTable from "../editAbleTable/AddTable";
import EditAbleTable, { ColumnType } from "../editAbleTable/EditAbleTable";
import StockReplacer from "../stockReplacer/stockReplacer";

type Props = {
  portfolio?: Required<PortfolioRow>[];
  onRowDelete?: (row: PortfolioRow) => void;
  onRowAdd?: (row: PortfolioRow) => void;
  onUpdateRow?: (
    row: Required<PortfolioRow>,
    field: string,
    value: string | number | null
  ) => void;
};

export default function PortfolioEditor({
  portfolio,
  onRowDelete,
  onRowAdd,
  onUpdateRow,
}: Props) {
  const [_portfolio, setPortfolio] = useState<Required<PortfolioRow>[]>(
    portfolio ?? []
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openId, setOpenId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (portfolio) {
      return setPortfolio(portfolio);
    }
  }, [portfolio]);

  const getHeader = () => {
    const pComponent = (row: PortfolioRow, defaultValue: any, key: string) => {
      return (
        //@ts-ignore
        <p>{typeof row[key] === "object" ? row[key]?.toString() : row[key]}</p>
      );
    };

    const stockReplacer = (
      row: PortfolioRow,
      defaultValue: any,
      key: string
    ) => {
      return (
        <p
          style={{
            margin: 0,
            padding: 0,
            width: "100%",
            minHeight: "1rem",
            backgroundColor: "#e0fad282",
            cursor: "pointer",
          }}
          onClick={() => {
            setOpenId(row.id);
            setModalIsOpen(true);
          }}
        >
          {/* @ts-ignore */}
          {typeof row[key] === "object" ? row[key]?.toString() : row[key]}
        </p>
      );
    };

    if (_portfolio && _portfolio.length > 0) {
      //first row
      const firstRow = _portfolio[0];

      const keys: ColumnType<PortfolioRow> = Object.keys(firstRow).map(
        (it) => ({ key: it, name: it })
      );

      const del = {
        key: "del",
        name: "حذف",
        component: (row: PortfolioRow, defaultValue: any, key: string) => {
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
      };
      keys.unshift(del);

      keys.forEach((it, i) => {
        if (
          (it.key.includes("id") || it.key.includes("Id")) &&
          !it.key.includes("stockId")
        ) {
          keys[i] = { ...keys[i], component: pComponent };
        } else if (it.key.includes("stockId")) {
          keys[i] = { ...keys[i], component: stockReplacer };
        }
      });

      const filter = keys.filter((it) => !it.key.includes("date"));

      return filter;
    }
    return [];
  };

  const getAddRowTableHeader = () => {
    if (_portfolio && _portfolio.length > 0) {
      //first row
      const firstRow = _portfolio[0];

      const keys = Object.keys(firstRow).map((it) => ({ key: it, name: it }));

      const filter = keys.filter((it) => {
        if (it.key.includes("stockId")) {
          return true;
        } else if (it.key.includes("date")) {
          return false;
        } else if (it.key.includes("id")) {
          return false;
        } else if (it.key.includes("Id")) {
          return false;
        } else if (it.key.includes("startValuePercent")) {
          return false;
        } else if (it.key.includes("endValuePercent")) {
          return false;
        } else {
          return true;
        }
      });
      return filter;
    }
    return [];
  };

  const onNewRowAdd = (row: Partial<IFundPortfolioTrade>) => {
    if (portfolio) {
      const canBeNull = [
        "priceInMarket",
        "percentOfAllProperty",
        "startValuePercent",
        "endValuePercent",
      ];

      if (!row.stockId) {
        alert("please choice a stockId");
        return;
      } else if (!row.company) {
        alert("please choice a company");
        return;
      }

      const fRow = portfolio[0];
      const entries: [string, string | number | null | undefined][] = [];
      for (const key in fRow) {
        const item = row[key];
        if (item) {
          entries.push([key, item]);
        } else {
          if (canBeNull.includes(key)) {
            entries.push([key, null]);
          } else if (key.includes("Id") || key.includes("date")) {
            entries.push([
              key,
              //@ts-ignore
              typeof fRow[key] === "object" ? fRow[key]?.toString() : fRow[key],
            ]);
          } else {
            entries.push([key, 0]);
          }
        }
      }
      const { id, ...rest } = Object.fromEntries(entries) as PortfolioRow;
      onRowAdd?.(rest);
    }
  };

  function closeModal() {
    setModalIsOpen(false);
    setOpenId(undefined);
  }

  if (!_portfolio || _portfolio.length < 1) {
    return null;
  }

  return (
    <div>
      <StockReplacer
        open={modalIsOpen}
        onCloseModal={(open_close) => {
          setModalIsOpen(open_close);
        }}
        onUpdateCB={(row) => {
          setModalIsOpen(false);

          const findItem = _portfolio?.find((it) => it.id == openId);

          if (findItem) {
            onUpdateRow?.(findItem, "stockId", row?.id ?? null);
          }
        }}
      />

      <AddTable
        column={getAddRowTableHeader()}
        addCallBack={(_item: Partial<IFundPortfolioTrade>) => {
          onNewRowAdd(_item);
        }}
        converter={(key, value) => {
          if (key == "company") {
            return value;
          } else {
            return toNumber(value);
          }
        }}
      />
      <EditAbleTable
        updateCb={(item, key, value) => {
          //percentOfAllProperty

          return new Promise((res, rej) => {
            let itemValue: string | number | null = value;
            if (
              key === "percentOfAllProperty" &&
              typeof itemValue === "string" &&
              itemValue.length == 0
            ) {
              itemValue = null;
            } else if (typeof itemValue === "string" && itemValue.length == 0) {
              alert("لطفا مقداری انتخاب کنید");
              rej();
              return;
            }

            action_portfolio_updateRow(item.id, {
              [key]: itemValue,
            })
              .then((axiosResult) => {
                res(true);
              })
              .catch((err) => {
                rej();
                console.error(err);
              });
          });
        }}
        data={_portfolio}
        columns={getHeader()}
      />
    </div>
  );
}
