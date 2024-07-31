import { action_funds_getLetterByFundId } from "@/app/actions/funds";

type LetterProps = {
  params: {
    fundId: string;
    letterId: string;
  };
};

export default async function LetterPage({ params }: LetterProps) {
  return null;
}
