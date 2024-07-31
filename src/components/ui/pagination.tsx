"use client";
import React, { useState, useEffect, useRef } from "react";
import { range } from "lodash";
import { Button } from "@/components/primitives/button";
import { useSearchParams, useRouter } from "next/navigation";
import { GeneralSelect } from "./select";
import { cn } from "@/src/lib/utils";

type Props = {
  total?: number | undefined;
  take: number;
  page?: number;
  cb?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
};

export default function Pagination({
  total,
  take = 10,
  page = 0,
  cb,
  onPageSizeChange,
  className,
}: Props) {
  const MaxPageNumber = 5;

  const [firstIndex, setFirstIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const takeRef = useRef(take);

  useEffect(() => {
    setCurrentPage(0);
    setFirstIndex(0);
  }, [total]);

  useEffect(() => {
    setCurrentPage(page);

    if (page % MaxPageNumber == 0) {
      setFirstIndex(page);
    } else {
      setFirstIndex(page - (page % MaxPageNumber));
    }
  }, [page]);

  const pageQuantity = total ? Math.ceil(total / takeRef.current) : 0;

  const onPreClick = () => {
    if (firstIndex > 0) {
      setFirstIndex(firstIndex - MaxPageNumber);
    }
  };

  const onNextClick = () => {
    if (pageQuantity > firstIndex + MaxPageNumber) {
      setFirstIndex(firstIndex + MaxPageNumber);
    }
  };

  const getPagesRange = () => {
    return range(
      firstIndex,
      firstIndex + MaxPageNumber >= pageQuantity
        ? pageQuantity
        : firstIndex + MaxPageNumber
    );
  };

  return (
    <div className={cn("flex items-center", className)}>
      {total && (
        <>
          <Button variant="outline" className="p-2 me-1" onClick={onPreClick}>
            قبل
          </Button>
          <div className="flex gap-2">
            {getPagesRange().map((it) => {
              return (
                <Button
                  variant="outline"
                  //className={`p-2 ${it == currentPage ? "bg-cyan-300" : ""}`}
                  style={
                    it == currentPage
                      ? { backgroundColor: "rgb(103, 232, 249)" }
                      : {}
                  }
                  key={it}
                  onClick={() => {
                    setCurrentPage(it);
                    cb?.(it);
                  }}
                >
                  {it + 1}
                </Button>
              );
            })}
          </div>

          <Button variant="outline" className="p-2 ms-1" onClick={onNextClick}>
            بعد
          </Button>
        </>
      )}

      <GeneralSelect
        onValueChange={(v) => {
          takeRef.current = +v;
          onPageSizeChange?.(+v);
        }}
        placeHolder="تعداد"
        defaultValue="10"
        className="w-[100px]"
        showClear={false}
        values={[
          { name: "5", value: "5" },
          { name: "10", value: "10" },
          { name: "15", value: "15" },
          { name: "20", value: "20" },
        ]}
      />
    </div>
  );
}

export const PWrapper = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Pagination
      {...props}
      cb={(page) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.replace(`?${params.toString()}`);
      }}
    />
  );
};
