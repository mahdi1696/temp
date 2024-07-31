"use client";

import React, { useState } from "react";
import { Button } from "@/components/primitives/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Input } from "@/components/primitives/input";
import constant from "@/src/constants/content.json";
import { debounce } from "lodash";
import { GeneralSelect } from "@/components/ui/select";

type Props = {
  fundsList: FundListItem[];
  baseUrl: string;
};

export default function FundsListLink({ fundsList, baseUrl }: Props) {
  const paths = useParams<{ fundId: string }>();
  const [localFundsList, setLocalFundsList] = useState(fundsList);
  const [selectedFundType, setSelectedFundType] = useState<RealFundType>();
  const [searchSymbol, setSearchSymbol] = useState<string>();

  const onChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSymbol(e.target.value);
    const filterBySymbol = fundsList.filter((it) =>
      it.symbol.includes(e.target.value)
    );

    if (selectedFundType) {
      setLocalFundsList(
        filterBySymbol.filter((it) => it.realFundType == selectedFundType)
      );
      return;
    }

    setLocalFundsList(filterBySymbol);
  }, 300);

  const onSelectChange = (v: string) => {
    setSelectedFundType(v as RealFundType);

    if (!v) {
      if (searchSymbol) {
        setLocalFundsList(
          fundsList.filter((it) => it.symbol.includes(searchSymbol))
        );
        return;
      }
      setLocalFundsList(fundsList);
      return;
    }

    const filteredByType = fundsList.filter((it) => it.realFundType == v);

    if (searchSymbol) {
      setLocalFundsList(
        filteredByType.filter((it) => it.symbol.includes(searchSymbol))
      );
      return;
    }

    setLocalFundsList(filteredByType);
  };

  return (
    <div className="flex flex-col gap-1 p-1">
      <div className="flex gap-1">
        <Input
          className="max-w-48"
          onChange={onChange}
          placeholder={constant.fa.fundsName}
        />
        <GeneralSelect
          className="w-40"
          onValueChange={onSelectChange}
          values={[
            { name: "ETF", value: "ETF" },
            { name: "FixIncome", value: "FixIncome" },
            { name: "Index", value: "Index" },
            { name: "Mix", value: "Mix" },
            { name: "ETC", value: "ETC" },
            { name: "Sector", value: "Sector" },
            { name: "Leverage", value: "Leverage" },
            { name: "FOF", value: "FOF" },
          ]}
        />
      </div>
      <div className="flex gap-1 overflow-auto">
        {localFundsList.map((it) => (
          <Link key={it.symbol} href={`${baseUrl}${it.id}`} shallow replace>
            <Button
              variant="outline"
              className={
                it.id == (paths.fundId ? paths.fundId : -1) ? "bg-red-400" : ""
              }
            >
              {it.symbol}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
