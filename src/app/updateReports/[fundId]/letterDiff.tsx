"use client";

import { action_portfolio_saveLetterList } from "@/app/actions/portfolio";
import { useApiCall } from "@/src/hooks/useApiCall";
import LCE from "@/src/components/ui/LCE/lce";
import { Button } from "@/components/primitives/button";
import React from "react";

type Props = {
  letters: Letter[];
};

export default function LetterDiff({ letters }: Props) {
  const { data, error, getData, pending, status } = useApiCall("data");

  return (
    <div className="flex flex-col gap-1">
      <div>
        <p>تعداد اطلاعیه های جدید : {letters.length}</p>
        <Button
          variant="outline"
          onClick={() => {
            getData(action_portfolio_saveLetterList.bind(null, letters));
          }}
        >
          ثبت
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {data ? (
          "اطلاعات با موفقیت ذخیره شد"
        ) : (
          <LCE status={status} error={error}>
            {letters.map((it) => (
              <p
                key={it.id}
                className="border rounded-md p-1 hover:bg-muted/50"
              >
                {it.persianDate}
              </p>
            ))}
          </LCE>
        )}
      </div>
    </div>
  );
}
