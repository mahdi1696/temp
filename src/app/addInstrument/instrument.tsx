"use client";

import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Instrument() {
  const router = useRouter();
  const [tsetmcId, setTsetmcId] = useState<string | undefined>();
  const params = useParams<{ tsetmcId?: string[] }>();
  const path = usePathname();

  return (
    <div className="flex gap-1">
      <Input
        onChange={(e) => setTsetmcId(e.target.value)}
        className="max-w-48"
        placeholder="شناسه نماد را وارد کنید"
        defaultValue={params.tsetmcId?.[0]}
      />
      <Button
        variant="outline"
        onClick={() => {
          router.push(`/addInstrument/${tsetmcId}`);
        }}
      >
        GET
      </Button>
    </div>
  );
}
