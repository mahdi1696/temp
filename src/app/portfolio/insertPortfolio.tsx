"use client";
import { Button } from "@/components/primitives/button";
import Link from "next/link";
import React, { useState } from "react";

import constant from "@/src/constants/content.json";
import FileInput from "@/src/components/ui/input/fileInput";
import { action_funds_parseReportFileWithSuggestion } from "../actions/funds";
import PortfolioWithSuggestionEditTable from "./portfolioWithSuggestionEditTable/PortfolioWithSuggestionEditTable";
import { LCEStatus } from "@/src/components/ui/LCE/lce";
import { action_portfolio_insert } from "../actions/portfolio";
import { useRouter } from "next/navigation";

type Props = {
  letter: Letter;
};

const InsertPortfolio = ({ letter }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [reportTableStatus, setReportTableStatus] = useState<LCEStatus>("data");
  let _get: () => IFundPortfolioTrade[] | undefined;

  const [portfolioWithSuggestion, setPortfolioWithSuggestion] = useState<
    Array<FundCompanySuggestionWithId> | undefined
  >();

  /**
   * add id and convert percent of all property field to fixed 3 decimal
   * @param items
   * @returns items with id
   */
  function prepareReportRows(items: FundCompanySuggestion[]) {
    return items.map((it, index) => {
      const fixed = it.portfolioRow?.percentOfAllProperty?.toFixed(3);
      if (fixed) {
        it.portfolioRow.percentOfAllProperty = Number(fixed);
      }

      return Object.assign(it, { id: index });
    });
  }

  const onAddNewRow = (row: FundCompanySuggestionWithId) => {
    if (portfolioWithSuggestion) {
      const newPortfolio = portfolioWithSuggestion.concat(row);
      setPortfolioWithSuggestion(newPortfolio);
    }
  };

  const onRowDelete = (row: FundCompanySuggestionWithId) => {
    if (portfolioWithSuggestion) {
      const newPortfolio = portfolioWithSuggestion.filter(
        (it) => it.id !== row.id
      );
      setPortfolioWithSuggestion(newPortfolio);
    }
  };

  const onCompanyUpdate = (
    row: FundCompanySuggestionWithId,
    company: Company | null
  ) => {
    if (company) {
      const stockSlice: StockSlice = {
        id: company.id,
        symbol: company.symbol,
        symbolLong: company.symbolLong ?? "",
        namePersian: company.namePersian ?? "",
        nameDisplay: company.nameDisplay ?? "",
        tradeType: company.tradeType,
        alias: company.alias?.split(",") ?? [],
      };

      const compare: CompareType["compare"] = {
        like: -1,
        companyArrLength: -1,
        companyStringLength: -1,
        stockStringLength: -1,
      };

      const newRow = {
        ...row,
        suggestion: {
          company: row.portfolioRow.company,
          stock: stockSlice,
          compare,
        },
      };

      const newS = portfolioWithSuggestion?.map((it) => {
        if (it.id === newRow.id) {
          return newRow;
        }
        return it;
      });
      if (newS) {
        setPortfolioWithSuggestion(newS);
      }
    } else {
      const ob = {
        ...row,
        suggestion: null,
      };
      const newS = portfolioWithSuggestion?.map((it) => {
        if (it.id == ob.id) {
          return ob;
        }
        return it;
      });
      if (newS) {
        setPortfolioWithSuggestion(newS);
      }
    }
  };

  const insertPortfolio = async () => {
    const portfolio = _get?.();
    if (letter && portfolio) {
      const report = {
        fundId: letter.companyId,
        date: letter.date,
        letterId: letter.id,
      };
      const requestBody = {
        report,
        portfolio,
      };
      try {
        setReportTableStatus("loading");
        await action_portfolio_insert(requestBody);
        setReportTableStatus("data");
        router.refresh();
        return true;
      } catch (error) {
        console.error(error);

        setReportTableStatus("error");
        return false;
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <Link href={letter.fileUrl}>
          <Button variant="outline">{constant.fa.downloadFile}</Button>
        </Link>
        <FileInput
          key={letter.id}
          loading={loading}
          onFile={(file) => {
            setLoading(true);
            action_funds_parseReportFileWithSuggestion(file)
              .then((res) => {
                setPortfolioWithSuggestion(prepareReportRows(res));
              })
              .catch((err) => {
                console.error(err);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        />
        <p className="whitespace-nowrap">اصلاحیه : {letter.isCorrection ? "آره" : "خیر"}</p>
        <Button variant="outline" onClick={insertPortfolio}>
          ثبت
        </Button>
      </div>
      <PortfolioWithSuggestionEditTable
        key={letter.companyId}
        onCompanyUpdate={onCompanyUpdate}
        portfolio={portfolioWithSuggestion}
        onRowDelete={onRowDelete}
        onRowAdd={onAddNewRow}
        getPortfolio={(get) => {
          _get = get;
        }}
      />
    </div>
  );
};

export default InsertPortfolio;
