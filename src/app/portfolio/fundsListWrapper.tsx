import React from "react";
import { action_funds_getAll } from "../actions/funds";
import FundsListLink from "./fundsListLink";

type Props = {
  baseUrl : string;
}


export default async function FundsListWrapper({baseUrl} : Props) {
  const fundsList = await action_funds_getAll();

  return <FundsListLink baseUrl={baseUrl} fundsList={fundsList} />;
}
