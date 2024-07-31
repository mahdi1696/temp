"use server";

import {
  dataManager_get_allFundsLastNAV_url,
  dataManager_get_allFundsLastTradeInfo,
  dataManager_get_syncFundsNav_url,
  dataManager_get_syncFundsTradeInfoUrl,
  dataManager_post_syncFipIranNAVByTsetmcIds_url,
  dataManager_post_syncFundsTradeInfoByTsetmcId_Url,
} from "@/src/constants/urls";

export const action_tradeInfo_getAllFundsLastTradeInfo = async (): Promise<
  StockTradeInfo[]
> => {
  const response = await fetch(dataManager_get_allFundsLastTradeInfo, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_tradeInfo_syncAllFundsLastTradeInfo =
  async (): Promise<SyncResult> => {
    const response = await fetch(dataManager_get_syncFundsTradeInfoUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  };

export const action_tradeInfo_syncFundsLastTradeInfoByTsetmcId = async (
  tsetmcId: string[]
): Promise<SyncResult> => {
  const response = await fetch(
    dataManager_post_syncFundsTradeInfoByTsetmcId_Url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(tsetmcId),
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_tradeInfo_getAllFundsLastNAV = async (): Promise<
  {
    lastNAV: FipIranFundNav;
    info: FipIranFund;
  }[]
> => {
  const response = await fetch(dataManager_get_allFundsLastNAV_url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_tradeInfo_syncAllFundsNAV =
  async (): Promise<SyncResult> => {
    const response = await fetch(dataManager_get_syncFundsNav_url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  };

export const action_tradeInfo_syncAllFundsNavByTsetmcId = async (
  ids: string[]
): Promise<SyncResult> => {
  const response = await fetch(dataManager_post_syncFipIranNAVByTsetmcIds_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ ids }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
