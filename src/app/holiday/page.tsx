import { Button } from "@/components/primitives/button";
import { GeneralSelect } from "@/components/ui/select";
import { Input } from "@/components/primitives/input";
import DataTableContainer from "@/components/ui/dataTable/dataTableContainer";
import GetByYear from "./getByYear";
import HolidayTableWrapper from "./holidayTableWrapper";
import { Suspense } from "react";
import AddNewHoliday from "./addNewHoliday";

type Props = {
  searchParams: {
    year: string;
    [key: string]: string | string[] | undefined;
  };
};
export default function HolidayPage({ searchParams }: Props) {
  const { year } = searchParams;
  return (
    <div className="py-2 h-full">
      <section className="grid grid-rows-[auto_auto_minmax(0,_1fr)]  h-full gap-2 p-1  shadow container max-w-md">
        <GetByYear initYear={year} />
        <AddNewHoliday />
        <Suspense fallback={"loading..."}>
          <HolidayTableWrapper year={year} />
        </Suspense>
      </section>
    </div>
  );
}

type ssProps = {
  params: {
    paramName: string;
  };
};
