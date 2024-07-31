"use client";
import { Button } from "@/components/primitives/button";
import Link from "next/link";
import React, { useState } from "react";

import constant from "@/src/constants/content.json";
import FileInput from "@/src/components/ui/input/fileInput";
import { action_funds_parseReportFileWithSuggestion } from "../actions/funds";

type Props = {
  letter?: Letter;
};

export default function LetterHeader({ letter }: Props) {
  const [loading, setLoading] = useState(false);

  if (!letter) {
    return null;
  }
  if (letter.reportId) {
    return (
      <div className="flex gap-1">
        <Link href={letter.fileUrl}>
          <Button variant="outline">{constant.fa.downloadFile}</Button>
        </Link>
        <p className="whitespace-nowrap">
          اصلاحیه : {letter.isCorrection ? "آره" : "خیر"}
        </p>
        <Button variant="outline">نمایش</Button>
        <Button variant="outline">حذف</Button>
      </div>
    );
  }

  return (
    <div className="flex gap-1">
      <Link href={letter.fileUrl}>
        <Button variant="outline">{constant.fa.downloadFile}</Button>
      </Link>
      <FileInput
        loading={loading}
        onFile={(file) => {
          setLoading(true);
          action_funds_parseReportFileWithSuggestion(file)
            .then((res) => {
              // console.log(res);
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      />
      <p className="whitespace-nowrap">
        اصلاحیه : {letter.isCorrection ? "آره" : "خیر"}
      </p>
      <Button variant="outline">ثبت</Button>
    </div>
  );
}
