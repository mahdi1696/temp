"use client";

import { Button } from "@/components/primitives/button";
import { GeneralSelect } from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function GetByYear({ initYear }: { initYear?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [year, setYear] = useState<string | undefined>(initYear);
  const params = new URLSearchParams();
  return (
    <div className="flex justify-between">
      <Button
        onClick={() => {
          if (year) {
            params.set("year", year);
            router.push(pathname + "?" + params.toString());
          }
        }}
      >
        Get
      </Button>
      <GeneralSelect
        onValueChange={(v) => {
          setYear(v);
        }}
        defaultValue={initYear}
        className="w-72"
        values={[
          { name: "1403", value: "1403" },
          { name: "1402", value: "1402" },
          { name: "1401", value: "1401" },
        ]}
        placeHolder="year"
      />
    </div>
  );
}
