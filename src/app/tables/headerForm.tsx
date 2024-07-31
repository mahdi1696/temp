"use client"

import React, { useState, useRef, Fragment } from "react";
import { Input } from "@/components/primitives/input";
import ListInput from "@/components/ui/input/listInput";
import { GeneralSelect } from "@/components/ui/select";
import { HeaderFormItems } from "./definition";
import { cn } from "@/src/lib/utils";

type Props = {
  item: HeaderFormItems;
  className?: string;
};

export const tableFormItem = ({ item, className }: Props) => {
  switch (item.type) {
    case "string":
      return (
        <Input
          disabled={item.disabled}
          type="text"
          className={cn(className, item.className)}
          defaultValue={item.value}
          onChange={(e) => {
            item.handleChange?.(item.name, {
              type: item.type,
              value: e.target.value,
            });
          }}
        />
      );

    case "number":
      return (
        <Input
          disabled={item.disabled}
          type="number"
          dir="ltr"
          defaultValue={item.value}
          className={cn(
            className,
            "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            item.className
          )}
          onChange={(e) => {
            item.handleChange?.(
              item.name,
              e.target.value
                ? {
                    type: item.type,
                    value: +e.target.value,
                  }
                : null
            );
          }}
        />
      );

    case "list":
      return (
        <ListInput
          disabled={item.disabled}
          values={item.value}
          className={cn(className, item.className)}
          onChange={(e) => {
            item.handleChange?.(item.name, { type: item.type, value: e });
          }}
        />
      );

    case "boolean":
      return (
        <GeneralSelect
          disabled={item.disabled}
          values={[
            { value: "true", name: "اره" },
            { value: "false", name: "نه" },
          ]}
          defaultValue={
            item.value === undefined
              ? undefined
              : item.value == true
              ? "true"
              : "false"
          }
          className={cn(item.className, className)}
          onValueChange={(e) => {
            item.handleChange?.(
              item.name,
              e
                ? {
                    type: item.type,
                    value: e === "true",
                  }
                : null
            );
          }}
        />
      );

    case "enum":
      return (
        <GeneralSelect
          disabled={item.disabled}
          values={item.enum}
          defaultValue={item.value}
          className={cn(item.className, className)}
          onValueChange={(e) => {
            item.handleChange?.(item.name, { type: item.type, value: e });
          }}
        />
      );
  }
};
