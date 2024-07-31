import { action_portfolio_dbLettersAndCodalLettersDiff } from "@/app/actions/portfolio";
import LetterDiff from "./letterDiff";

type LetterReportProps = {
  params: {
    fundId: string;
  };
};

export default async function LetterReportPage({ params }: LetterReportProps) {
  const { fundId } = params;

  const data = await action_portfolio_dbLettersAndCodalLettersDiff(+fundId);
  return (
    <div>
      <LetterDiff letters={data.flatMap((it) => it.diff)} />
    </div>
  );
}
