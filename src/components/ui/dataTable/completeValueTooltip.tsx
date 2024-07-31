"use client";

import { memo } from "react";

import { numberWithCommas } from "@/src/lib/utils/numUtils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/primitives/tooltip";

interface Props {
  cellValue: number;
  tooltipValue: number;
  toNumberWithCommas?: boolean;
}

const CompleteValueTooltip = ({
  cellValue,
  tooltipValue,
  toNumberWithCommas,
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="ltr">{cellValue}</div>
        </TooltipTrigger>
        <TooltipContent>
          {toNumberWithCommas ? numberWithCommas(tooltipValue) : tooltipValue}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default memo(CompleteValueTooltip);
