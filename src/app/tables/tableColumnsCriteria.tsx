"use client";

import { Button } from "@/components/primitives/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";

import React, { useRef, useEffect, useState } from "react";

import { tableFormItem } from "./headerForm";
import { Criteria, HeaderFormItems } from "./definition";
import { omit } from "lodash";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/primitives/dialog";
import { Checkbox } from "@/components/primitives/checkbox";

interface Props {
  onTake: (query: { [key: string]: Criteria }) => void;
  columns: HeaderFormItems[];
  className?: string;
}

export default function TableColumnsCriteria({
  onTake,
  columns,
  className,
}: Props) {
  const changes = useRef<{
    [key: string]: Criteria;
  }>({});

  const [visibleColumns, setVisibleColumns] = useState(columns);
  const [checkBoxes, setCheckBoxes] = useState(
    columns.map((it) => ({
      name: it.name,
      visible: true,
    }))
  );

  useEffect(() => {
    const visible: HeaderFormItems[] = [];
    for (const key in checkBoxes) {
      if (Object.prototype.hasOwnProperty.call(checkBoxes, key)) {
        const item = checkBoxes[key];
        if (item.visible) {
          const col = columns.find((it) => it.name === item.name);
          if (col) {
            visible.push(col);
          }
        }
      }
    }
    setVisibleColumns(visible);
  }, [checkBoxes, columns]);

  const handleChange = (name: string, criteria: Criteria | null) => {
    if (criteria) return (changes.current[name] = criteria);
    changes.current = omit(changes.current, name);
  };

  return (
    <div className="p-4 flex flex-col items-start gap-1 overflow-auto">
      <div className="flex gap-1">
        <Button
          onClick={() => {
            // searchInDb();
            onTake(changes.current);
          }}
        >
          بگیر
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">نمایش</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>نمایش</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col  gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCheckBoxes((pre) =>
                    pre.map((it) => ({
                      ...it,
                      visible: !it.visible,
                    }))
                  );
                }}
              >
                برعکس
              </Button>
              {checkBoxes.map((it) => (
                <div
                  className="flex gap-1 items-center space-x-2"
                  key={it.name}
                >
                  <Checkbox
                    id={it.name}
                    checked={it.visible}
                    onCheckedChange={(checked) => {
                      setCheckBoxes((pre) =>
                        pre.map((item) => {
                          if (item.name == it.name) {
                            return {
                              name: item.name,
                              visible: checked === true,
                            };
                          }
                          return item;
                        })
                      );
                    }}
                  />
                  <label
                    htmlFor={it.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {it.name}
                  </label>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((it) => (
              <TableHead key={it.name}>{it.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {visibleColumns.map((it, i) => {
              return (
                <TableCell key={it.name}>
                  {tableFormItem({
                    item: {
                      ...(it as any),
                      handleChange: handleChange,
                      className,
                    },
                  })}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
