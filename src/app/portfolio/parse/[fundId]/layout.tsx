import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { Button } from "@/components/primitives/button";
import LettersListWrapper from "../../lettersListWrapper";

type LayoutProps = {
  children: ReactNode;
  params: {
    fundId: string;
  };
};

export default function Layout({ children, params }: LayoutProps) {
  return (
    <section className="flex flex-col gap-1">
      <Suspense fallback={"loading letters..."}>
        <LettersListWrapper
          fundId={params.fundId ? +params.fundId : undefined}
        />
      </Suspense>
      {children}
    </section>
  );
}
