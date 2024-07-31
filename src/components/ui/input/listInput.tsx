import React, { useRef, useState } from "react";
import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/primitives/popover";
import { TrashIcon } from "@heroicons/react/24/outline";

type ListType = string[] | number[];

type Props<T extends ListType> = {
  values?: T;
  onChange?: (values: T extends string[] ? string[] : number[]) => void;
  disabled?: boolean;
  className?: string;
};

export default function ListInput<T extends ListType>({
  values,
  onChange,
  disabled,
  className,
}: Props<T>) {
  const [list, setList] = useState(values ?? []);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDeleteItem = (index: number) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    setList(updatedList as unknown as T);
    if (onChange) {
      onChange(updatedList as any);
    }
  };

  return (
    <Popover>
      <PopoverTrigger disabled={disabled} asChild>
        <Button className={className} variant="outline">
          {list?.toString()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-2">
          <div>
            {list?.map((it, i) => (
              <div className="border-t flex p-1 gap-1" key={i}>
                <TrashIcon
                  className="h-6 w-6 text-red-500 "
                  onClick={() => handleDeleteItem(i)}
                />
                <p>{it}</p>
              </div>
            ))}
          </div>
          <Input ref={inputRef} placeholder="اضافه کردن" />
          <Button
            variant="outline"
            onClick={() => {
              const value = inputRef.current?.value;
              if (value) {
                const newValue = [...list, value as any];
                setList(newValue as T);
                onChange?.(newValue);
              }
            }}
          >
            اضافه
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
