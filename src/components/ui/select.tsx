"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";

interface Props {
  onValueChange?(value: string): void;
  values: { name: string; value: string }[];
  defaultValue?: string;
  className?: string;
  placeHolder?: string;
  disabled?: boolean;
  showClear?: boolean;
}

export const GeneralSelect = forwardRef<{ value: string | null }, Props>(
  (
    {
      onValueChange,
      values,
      defaultValue,
      className,
      placeHolder = "انتخاب کنید",
      disabled,
      showClear = true,
    },
    ref
  ) => {
    const [value, setValue] = useState<string | null>(defaultValue ?? null);

    const handelValueChange = useCallback(
      (value: string) => {
        setValue(value);
        onValueChange?.(value);
      },
      [onValueChange]
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          value: value,
        };
      },
      [value]
    );

    return (
      <Select
        disabled={disabled}
        onValueChange={handelValueChange}
        defaultValue={defaultValue}
        value={value ?? ""}
      >
        <SelectTrigger
          showClear={showClear && !!value}
          className={className}
          onClear={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handelValueChange("");
          }}
        >
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values?.map((it, i) => (
              <SelectItem key={i} value={it.value}>
                {it.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
);

GeneralSelect.displayName = "GeneralSelect";
