import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import LettersList from "./letterList";
import { action_funds_getLetterByFundId } from "../actions/funds";
type Props = {
  fundId?: number;
};

export default async function LettersListWrapper({ fundId }: Props) {
  if (!fundId) return null;

  const data = await action_funds_getLetterByFundId(fundId);

  return <LettersList lettersList={data} />;
}
