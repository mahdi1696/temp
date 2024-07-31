"use client";

import React, { Fragment, useRef } from "react";
import { Criteria, HeaderFormItems } from "../tables/definition";
import { tableFormItem } from "../tables/headerForm";
import { omit } from "lodash";
import { Button } from "@/components/primitives/button";

interface Props<T> {
  onEdit: (query: { [key: string]: Criteria["value"] | null }) => void;
  columns: HeaderFormItems[];
  row: T;
  loading?: boolean;
}

export default function NewInstrument<
  T extends { [key: string]: Criteria["value"] | null }
>({ onEdit, columns, row, loading }: Props<T>) {
  const changes = useRef<{
    [key: string]: Criteria["value"] | null;
  }>({});

  const handleChange = (name: string, criteria: Criteria | null) => {
    if (criteria) {
      changes.current[name] = criteria.value;
    } else {
      changes.current = omit(changes.current, name);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-[80vh] overflow-auto p-2">
      {columns.map((it, i) => {
        const value = row[it.name] ?? it.value;
        value != null ? (changes.current[it.name] = value) : undefined;
        return (
          <Fragment key={it.name}>
            <p>{it.name}</p>
            {tableFormItem({
              item: {
                ...(it as any),
                handleChange: handleChange,
                value: row[it.name] ?? it.value,
              },
            })}
          </Fragment>
        );
      })}
      <Button
        variant="outline"
        disabled={loading}
        onClick={() => {
          onEdit(changes.current);
        }}
      >
        {loading ? "در حال ثبت" : "ثبت"}
      </Button>
    </div>
  );
}
