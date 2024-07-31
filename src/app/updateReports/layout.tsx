import { Suspense } from "react";
import FundsListWrapper from "../portfolio/fundsListWrapper";

export default function ParsePortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-1 p-1 h-full overflow-auto">
      <Suspense fallback={<p>loading...</p>}>
        <FundsListWrapper baseUrl="/updateReports/" />
      </Suspense>
      {children}
    </div>
  );
}
