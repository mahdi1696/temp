import React, { useRef } from "react";
import { Criteria, HeaderFormItems } from "./definition";
import { tableFormItem } from "./headerForm";
import { omit } from "lodash";
import { Button } from "@/components/primitives/button";

interface Props<T> {
  onEdit: (query: { [key: string]: Criteria }) => void;
  columns: HeaderFormItems[];
  row: T;
  loading?: boolean;
  deleting?: boolean;
  onDelete?: () => void;
}

export default function TableRowEdit<
  T extends { [key: string]: Criteria["value"] | null }
>({ onEdit, columns, row, loading, deleting, onDelete }: Props<T>) {
  const changes = useRef<{
    [key: string]: Criteria;
  }>({});

  const handleChange = (name: string, criteria: Criteria | null) => {
    if (criteria) {
      changes.current[name] = criteria;
    } else {
      changes.current = omit(changes.current, name);
    }
  };

  return (
    <div className="flex flex-col gap-2 h-[80vh] overflow-auto p-2">
      {columns.map((it, i) => {
        return (
          <>
            <p>{it.name}</p>
            {tableFormItem({
              item: {
                ...(it as any),
                handleChange: handleChange,
                value: row[it.name],
              },
            })}
          </>
        );
      })}
      <Button
        variant="outline"
        disabled={loading}
        onClick={() => {
          onEdit(changes.current);
        }}
      >
        {loading ? "در حال ویرایش" : "ویرایش"}
      </Button>
      <Button
        variant="destructive"
        disabled={loading || deleting}
        onClick={() => {
          onDelete?.();
        }}
      >
        {deleting ? "در حال حذف" : "حذف"}
      </Button>
    </div>
  );
}
