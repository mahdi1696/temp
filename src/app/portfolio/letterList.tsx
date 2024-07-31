"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/primitives/button";
import { orderBy } from "lodash";
import { cn } from "@/src/lib/utils";
import EditPortfolio from "./editPortfolio";
import InsertPortfolio from "./insertPortfolio";

type Props = {
  lettersList: Letter[];
};

export default function LettersList({ lettersList }: Props) {
  const params = useParams<{ fundId: string; letterId: string }>();
  const selectedLetter = useMemo(
    () => lettersList.find((it) => it.id == +params.letterId),
    [lettersList, params.letterId]
  );
  // orderBy(lettersList, "date", "desc");
  return (
    <>
      <div className="flex gap-1 overflow-auto">
        {orderBy(lettersList, "persianDate", "desc").map((it) => (
          <Link
            key={it.id}
            href={`/portfolio/parse/${params.fundId}/${it.id}`}
            shallow
            replace
          >
            <Button
              variant="outline"
              className={cn(
                it.reportId ? "bg-orange-400" : "",
                it.id == (params.letterId ? +params.letterId : -1)
                  ? "bg-red-400"
                  : ""
              )}
            >
              {it.persianDate}
            </Button>
          </Link>
        ))}
      </div>
      <div className="overflow-auto">
        {selectedLetter &&
          (selectedLetter.reportId ? (
            <EditPortfolio letter={selectedLetter} />
          ) : (
            <InsertPortfolio letter={selectedLetter} />
          ))}
      </div>
    </>
  );
}
