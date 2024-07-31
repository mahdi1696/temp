import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/primitives/tooltip";

export function round(value: number, digits: number) {
  const power = Math.pow(10, digits);
  return Math.floor(value * power) / power;
}

export function numberWithCommas(num?: string | number) {
  if ((!num && num !== 0) || !isNumeric(Math.abs(+num).toString())) return num;
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function deleteCommas(num: string | number) {
  return num?.toString().replace(/,/g, "");
}

export function valueFormatter(value: number, type?: string) {
  let valueShort;
  let valuePostfix;
  if (value < 1e6) {
    valueShort = round(value, 3);
    valuePostfix = "";
  } else if (value < 1e9) {
    valueShort = round(value / 1e6, 3);
    valuePostfix = "M";
  } else {
    valueShort = round(value / 1e9, 3);
    valuePostfix = "B";
  }
  if (type == "text_postfix") {
    switch (valuePostfix) {
      case "M":
        valuePostfix = "میلیون";
        break;
      case "B":
        valuePostfix = "میلیارد";
        break;
    }
  }
  return `${valueShort} ${valuePostfix}`;
}

export function addLeadingZero(digit: string) {
  // this function does nothing to negative values
  if (digit) {
    if (digit.length === 1) {
      return "0" + digit;
    } else {
      return digit;
    }
  }
}

export const convertNumbersToEnglish = (str: string) => {
  const convertedStr = str
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => (d.charCodeAt(0) - 1632).toString()) // Convert Arabic numbers
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, (d) => (d.charCodeAt(0) - 1776).toString()); // Convert Persian numbers

  return convertedStr;
};

export const convertNumbersToPersian = (str?: string) => {
  if (!str) return;
  const id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[0-9]/g, (w) => id[+w]);
};

export const humanReadableNumTooltip = (value: number) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger dir="ltr">
          {numberToHumanReadable(value)}
        </TooltipTrigger>
        <TooltipContent>{numberWithCommas(value)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  /*  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={(props) => (
        <Tooltip
          id="button-tooltip"
          {...props}
          className={`${Number(value) < 0 && "ltr"}`}
        >
          {numberWithCommas(value)}
        </Tooltip>
      )}
    >
      <span>
        {isNaN(Number(value))
          ? value
          : numberWithCommas(valueFormatter(Number(value)))}
      </span>
    </OverlayTrigger>
  ); */
};

export const getPercent = (a: number, b: number) => ((a - b) / b) * 100;

export function percentageMapper(value: number) {
  return value ? `${Math.abs(value)}%` : "0%";
}

export function numberToHumanReadable(
  number: number,
  showDecimals: boolean = true
) {
  if (!number) return number;
  let valueShort = 0;
  let valuePostfix = "";

  const numberAbsolute = Math.abs(number);
  if (numberAbsolute < 1e6) {
    valueShort = number;
    if (valueShort % 1 === 0) showDecimals = false;
  } else if (numberAbsolute < 1e9) {
    valueShort = Number(number / 1e6);
    valuePostfix = "M";
  } else {
    valueShort = Number(number / 1e9);
    valuePostfix = "B";
  }
  valueShort = Number(valueShort?.toFixed(showDecimals ? 3 : 0));
  return `${numberWithCommas(valueShort)}${valuePostfix}`;
}

export const isNumeric = (text: string) =>
  /^\d+$/.test(Math.abs(+text).toString());
