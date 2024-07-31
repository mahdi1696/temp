import { action_company_getInfoFromTsetmc } from "@/app/actions/company";
import Instrument from "../instrument";
import NewInstrument from "../newInstrument";
import { insertCompanyCol } from "../rows";
import NewInsertWrapper from "../newInsertWrapper";

type AddInstrumentProps = {
  params: {
    tsetmcId?: string[];
  };
};

export default async function AddInstrumentPage({
  params,
}: AddInstrumentProps) {
  const [tsetmcId] = params.tsetmcId ?? [];

  if (tsetmcId) {
    const data = (await action_company_getInfoFromTsetmc(
      tsetmcId
    )) as Required<Company>;

    return (
      <div className="max-w-screen-md mx-auto">
        <h1>اضافه کردن نماد</h1>
        <Instrument />
        <NewInsertWrapper company={data} />
      </div>
    );
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <h1>اضافه کردن نماد</h1>
      <Instrument />
    </div>
  );
}
