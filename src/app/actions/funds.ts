"use server";

import {
  company_get_allFunds_url,
  GetPortfolioUrl,
  letters_get_ByFundsId_url,
  portfolio_parseReportExcelAndGetPortfolioWithStockSuggestion_url,
} from "@/src/constants/urls";

export const action_funds_getAll = async (): Promise<FundListItem[]> => {
  const response = await fetch(company_get_allFunds_url, {
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

export const action_funds_getLetterByFundId = async (
  fundId: number
): Promise<Letter[]> => {
  const response = await fetch(letters_get_ByFundsId_url + "/" + fundId, {
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

export const action_funds_parseReportFileWithSuggestion = async (
  file: File
) => {
  var data = new FormData();
  data.append("excelFile", file);

  const response = await fetch(
    portfolio_parseReportExcelAndGetPortfolioWithStockSuggestion_url,
    {
      method: "POST",
      body: data,
    }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_funds_getPortfolio = async (reportId: number) => {
  const response = await fetch(GetPortfolioUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reportId }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
