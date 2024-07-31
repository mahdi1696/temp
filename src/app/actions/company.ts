"use server";

import prisma from "@/prisma/db";
import {
  company_post_delete_url,
  company_post_getInFoFromTsetmc_url,
  company_post_insertInstrument_url,
  company_post_search_url,
  company_post_update_url,
} from "@/src/constants/urls";
import { Criteria } from "../tables/definition";

export const action_company_search = async (body: {
  query: { [key: string]: Criteria };
  take: number;
  skip: number;
}): Promise<{
  result: Company[];
  total: number;
}> => {
  const response = await fetch(company_post_search_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

export const action_company_update = async (body: {
  changes: { [key: string]: Criteria };
  companyId: number;
}) => {
  const response = await fetch(company_post_update_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_company_delete = async (id: number) => {
  const response = await fetch(company_post_delete_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_company_getInfoFromTsetmc = async (
  id: string
): Promise<Company> => {
  const response = await fetch(company_post_getInFoFromTsetmc_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_company_insertInstrument = async (
  company: Partial<Company>
) => {
  const response = await fetch(company_post_insertInstrument_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(company),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
