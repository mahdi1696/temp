"use client";

import React, { useState } from "react";
import NewInstrument from "./newInstrument";
import { insertCompanyCol } from "./rows";
import { action_company_insertInstrument } from "../actions/company";

type Props = {
  company: Required<Company>;
};

export default function NewInsertWrapper({ company }: Props) {
  const [loading, setLoading] = useState(false);
  return (
    <NewInstrument
      columns={insertCompanyCol}
      row={company}
      loading={loading}
      onEdit={(q) => {
        setLoading(true);
        action_company_insertInstrument(q)
          .then((res) => {
            alert("نماد با موفقیت اضافه شد");
          })
          .catch((err) => {
            console.error(err);
            alert("اضافه کردن نماد با مشکلی رو به رو شد");
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    />
  );
}
