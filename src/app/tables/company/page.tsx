"use client";

import { action_company_search } from "@/app/actions/company";
import Pagination from "@/components/ui/pagination";
import TableColumnsCriteria from "../tableColumnsCriteria";
import CompanyClientTable from "./table";
import { useState, useRef } from "react";
import { Criteria } from "../definition";
import { companyHeaderFormItems } from "./tableInfo";

export default function CompanyTablePage() {
  const [data, setData] = useState<{
    result: Company[];
    total: number;
  }>();

  const takeRef = useRef(20);

  const [query, setQuery] = useState<{
    [key: string]: Criteria;
  }>({});

  const getData = (
    q: { [key: string]: Criteria },
    take: number = takeRef.current,
    skip: number = 0
  ) => {
    action_company_search({
      query: q,
      take,
      skip,
    })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="grid grid-rows-[auto_minmax(0,_1fr)_auto] h-full">
      <TableColumnsCriteria
        columns={companyHeaderFormItems}
        onTake={(q) => {
          setQuery(q);
          getData(q);
        }}
        className="w-[120px]"
      />

      <div className="overflow-auto">
        {data && <CompanyClientTable company={data?.result} />}{" "}
      </div>
      <Pagination
        className="p-2"
        take={20}
        total={data?.total}
        cb={(p) => {
          getData(query, takeRef.current, takeRef.current * p);
        }}
        onPageSizeChange={(size) => {
          takeRef.current = size;
        }}
      />
    </div>
  );
}
