"use client";

import { Input } from "@/components/primitives/input";
import { useState, useRef } from "react";

type Props = {
  onFile: (file: File) => void;
  defaultFileName?: string;
  loading?: boolean;
  loadingMessage?: string;
};

export default function FileInput({
  defaultFileName = "لطفا فایل را انتخاب کنید",
  loading = false,
  loadingMessage = "در حال بارگذاری...",
  onFile,
}: Props) {
  const [fileName, setFileName] = useState(defaultFileName);
  const inputFile = useRef<HTMLInputElement | null>(null);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files?.item(0)?.name) {
      setFileName(files.item(0)!!.name);
      e.currentTarget.files = null;
      const file = files.item(0);
      if (file) {
        onFile?.(file);
      }
    } else {
      e.currentTarget.files = null;
      setFileName(defaultFileName);
    }
  };

  return (
    <div
      onClick={() => {
        if (!loading) {
          inputFile.current?.click();
        }
      }}
      className={`flex justify-center items-center h-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-52 rounded cursor-pointer ${
        loading ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <p className="whitespace-nowrap text-ellipsis text-center">
        {loading ? loadingMessage : fileName}
      </p>

      <Input
        ref={inputFile}
        type="file"
        accept=".xlsx, .xls"
        onChange={onFileSelect}
        className="hidden"
        disabled={loading}
      />
    </div>
  );
}
