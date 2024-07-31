export type Base = {
  name: string;
  disabled?: boolean;
  isRequired?: boolean;
  isId?: boolean;
  relationName?: string;
  kind?: "scalar" | "object";
  handleChange?: (name: string, criteria: Criteria | null) => void;
  className?: string;
  
};

export type String = {
  type: "string";
  value?: string;
} & Base;

export type Number = {
  type: "number";
  value?: number;
} & Base;

export type Enum = {
  type: "enum";
  value?: string;
  enum: { name: string; value: string }[];
} & Base;

export type Boolean = {
  type: "boolean";
  value?: boolean;
} & Base;

export type List = {
  type: "list";
  value?: string[] | number[];
} & Base;

export type HeaderFormItems = String | Number | Enum | Boolean | List;

export type Criteria =
  | {
      type: "string";
      value: string;
    }
  | {
      type: "number";
      value: number;
    }
  | {
      type: "enum";
      value: string;
    }
  | {
      type: "enum";
      value: string;
    }
  | {
      type: "boolean";
      value: boolean;
    }
  | {
      type: "list";
      value: string[] | number[];
    };
