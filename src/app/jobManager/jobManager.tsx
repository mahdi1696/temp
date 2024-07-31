"use client";

import { tableFormItem } from "../tables/headerForm";
import { FC, ReactNode, useRef } from "react";
import { omit } from "lodash";
import { Criteria } from "../tables/definition";

type StartWatchList = {
  startAt: string;
  pauseAt: string;
};

type ChangesType = Partial<StartWatchList> & Partial<StartOptions>;

export default function JobManger({
  criteria,
  onChange,
}: {
  criteria: ChangesType;
  onChange: (c: ChangesType) => void;
}) {
  const changes = useRef<ChangesType>({
    getPriceInfo: true,
    getClientType: true,
    getBids: true,
  });

  const handleChange = (name: string, criteria: Criteria | null) => {
    if (criteria) {
      changes.current = Object.assign(changes.current, {
        [`${name}`]: criteria.value,
      });
    } else {
      changes.current = omit(changes.current, name);
    }
    onChange(changes.current);
  };

  return (
    <div className="flex flex-col items-center overflow-auto">
      <div className="flex flex-col items-center gap-1 max-w-sm">
        <FormSection title="Start Time">
          {tableFormItem({
            item: {
              type: "string",
              name: "startAt",
              handleChange,
              value: criteria.startAt,
            },
          })}
        </FormSection>

        <FormSection title="Stop Time">
          {tableFormItem({
            item: {
              type: "string",
              name: "pauseAt",
              handleChange,
              value: criteria.pauseAt,
            },
          })}
        </FormSection>

        <FormSection title="Interval">
          {tableFormItem({
            item: {
              type: "number",
              name: "interval",
              handleChange,
              value: criteria.interval,
            },
          })}
        </FormSection>

        <FormSection title="Client Type">
          {tableFormItem({
            item: {
              type: "boolean",
              name: "getClientType",
              handleChange,
              value: criteria.getClientType,
            },
          })}
        </FormSection>

        <FormSection title="Get NAV">
          {tableFormItem({
            item: {
              type: "boolean",
              name: "getFipIranNavs",
              handleChange,
              value: criteria.getFipIranNavs,
            },
          })}
        </FormSection>

        <FormSection title="Price Info">
          {tableFormItem({
            item: {
              type: "boolean",
              name: "getPriceInfo",
              value: criteria.getPriceInfo,
              handleChange,
            },
          })}
        </FormSection>

        <FormSection title="Get Bids">
          {tableFormItem({
            item: {
              type: "boolean",
              name: "getBids",
              value: criteria.getBids,
              handleChange,
            },
          })}
        </FormSection>

        <FormSection title="Index Info">
          {tableFormItem({
            item: {
              type: "boolean",
              name: "getIndexInfo",
              handleChange,
              value: criteria.getIndexInfo,
            },
          })}
        </FormSection>
      </div>
    </div>
  );
}

const FormSection: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <p>{title}</p>
      {children}
    </>
  );
};
