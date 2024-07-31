"use client";

import { Button } from "@/components/primitives/button";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{error.message}</h2>
      <Button onClick={reset}>دوباره سعی کنید</Button>
    </div>
  );
}
