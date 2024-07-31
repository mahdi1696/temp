import { CSSProperties, ChangeEventHandler, ReactNode } from "react";

interface Props {
  size?: "sm" | "lg";
  name?: string;
  style?: CSSProperties;
  value?: string | number;
  borderless?: boolean;
  onChange?: ChangeEventHandler;
  disabled?: boolean;
  defaultValue?: string | number;
  extraClasses?: string;
  children: ReactNode;
}

const Select = ({
  size,
  name,
  style,
  value,
  borderless = false,
  onChange,
  disabled,
  defaultValue,
  extraClasses = "",
  children,
}: Props) => {
  return (
    <div
      className={`ps-2 bg-white ${!borderless ? "input form-control" : ""} ${
        size ? `form-control-${size}` : ""
      } ${extraClasses}`}
    >
      <select
        style={style}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        defaultValue={defaultValue}
        className="border-0 w-full no-focus clickable"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
