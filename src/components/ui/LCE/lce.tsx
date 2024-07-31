import React, { ReactNode } from "react";

export type LCEStatus = "loading" | "data" | "error";

type Props = {
  children: ReactNode | ReactNode[];
  status: LCEStatus;
  loading?: ReactNode;
  error: ReactNode;
};

export default function LCE({
  status,
  loading = "در حال بارگذاری",
  error,
  children,
}: Props) {
  if (status === "loading") return loading;
  if (status === "error") return error;
  return children;
}
