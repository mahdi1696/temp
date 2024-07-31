import { GeneralSelect } from "../select";
import Select from "./select";

interface Props {
  pageSize?: number;
  sizes?: number[];
  onChange: (arg0: number) => void;
  className?: string;
}

const DataTableSelectSize = ({
  className,
  pageSize = 10,
  sizes = [10, 25, 50, 100],
  onChange,
}: Props) => {
  return (
    <GeneralSelect
      className={className}
      showClear={false}
      defaultValue={pageSize.toString()}
      onValueChange={(v) => {
        onChange(+v);
      }}
      values={[
        {
          name: "10",
          value: "10",
        },
        {
          name: "25",
          value: "25",
        },
        {
          name: "50",
          value: "50",
        },
        {
          name: "100",
          value: "100",
        },
      ]}
    />
  );
};

export default DataTableSelectSize;
