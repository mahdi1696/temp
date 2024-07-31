"use client";

import { Button } from "@/components/primitives/button";
import { useApiCall } from "@/src/hooks/useApiCall";
import { action_tradeInfo_getAllFundsLastTradeInfo } from "../actions/tradeInfo";
import LCE from "@/src/components/ui/LCE/lce";
import DataTable from "@/components/ui/dataTable/dataTable";
import { useState } from "react";
import PriceInfoList from "./priceInfoList";
import SyncPriceInfo from "./syncPriceInfo";

export default function SyncPriceInfoPage() {
  const { data, error, getData, pending, status } =
    useApiCall<StockTradeInfo[]>("data");

  const [showListData, setShowListData] = useState(true);

  const returnTab = () => {
    if (showListData) {
      return <PriceInfoList />;
    }
    return <SyncPriceInfo />;
  };

  return (
    <div className="grid grid-rows-[auto_minmax(0,_1fr)] gap-1 h-full mx-2 pb-1">
      <div className="flex">
        <Button
          variant={showListData ? "secondary" : "outline"}
          onClick={() => {
            setShowListData(true);
          }}
        >
          لیست اطلاعات
        </Button>
        <Button
          variant={showListData ? "outline" : "secondary"}
          onClick={() => {
            setShowListData(false);
          }}
        >
          به روز رسانی اطلاعات
        </Button>
      </div>
      {returnTab()}
    </div>
  );
}


