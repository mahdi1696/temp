"use server";

import async from "../portfolio/fundsListWrapper";
import {
  GetPortfolioUrl,
  UpdatePortfolioRowUrl,
  DeletePortfolioRowUrl,
  AddRowToPortfolioUrl,
  DeletePortfolioUrl,
  InsertPortfolioUrl,
  letters_post_DbAndCodalLettersDiff,
  letters_post_insert,
} from "@/src/constants/urls";
import { revalidatePath } from "next/cache";

export const action_portfolio_getByReportId = async (reportId: number) => {
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

export const action_portfolio_updateRow = async (
  rowId: number,
  field: Partial<IFundPortfolioTrade>
) => {
  const response = await fetch(UpdatePortfolioRowUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([rowId, field]),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_portfolio_deleteRow = async (id: number) => {
  const response = await fetch(DeletePortfolioRowUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([id]),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_portfolio_addRow = async (row: PortfolioRow) => {
  const response = await fetch(AddRowToPortfolioUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_portfolio_delete = async (ids: {
  letterId: number;
  reportId: number;
}) => {
  const response = await fetch(DeletePortfolioUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_portfolio_insert = async (request: {
  report: { fundId: number; letterId: number; date: Date };
  portfolio: IFundPortfolioTrade[];
}) => {
  const response = await fetch(InsertPortfolioUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_portfolio_dbLettersAndCodalLettersDiff = async (
  companyId: number
): Promise<Diff[]> => {
  const requestBody = {
    id: companyId,
  };

  const response = await fetch(letters_post_DbAndCodalLettersDiff, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_portfolio_saveLetterList = async (
  letters: Letter[]
): Promise<"done"> => {
  const response = await fetch(letters_post_insert, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(letters),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  revalidatePath(`/updateReports/${letters[0].companyId}`);
  return response.json();
};
