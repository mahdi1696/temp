"use client";
import Image, { ImageLoaderProps } from "next/image";
import returnsDecorator from "../utils/returnsDecorator";

type Props = {
  symbol: string;
  Id?: string;
  returns?: {
    seven: string | number;
    thirty: string | number;
    ninety: string | number;
    sixMon: string | number;
    year: string | number;
  };
};

export default function FundSymbolAndReturnBox({ symbol, returns }: Props) {
  return (
    <div className="w-max flex rounded  shadow-lg border p-2 hover:ring-1 hover:cursor-pointer">
      <div>
        <Image
          src="/fundsLogo/logo-2.png"
          alt="Picture of the author"
          width={56}
          height={56}
          className="rounded"
        />
        <p className="w-[56px] text-center">{symbol}</p>
      </div>
      <table className="mx-4 [&_td]:min-w-16 [&_td]:text-center">
        <tr>
          <td>۷روز</td>
          <td>{returnsDecorator(returns?.seven)}</td>
          <td>۶ ماه</td>
          <td>{returnsDecorator(returns?.sixMon)}</td>
        </tr>
        <tr>
          <td>۱ ماه</td>
          <td>{returnsDecorator(returns?.thirty)}</td>
          <td>سال</td>
          <td>{returnsDecorator(returns?.year)}</td>
        </tr>
        <tr>
          <td>۳ ماه</td>
          <td>{returnsDecorator(returns?.ninety)}</td>
        </tr>
      </table>
    </div>
  );
}


