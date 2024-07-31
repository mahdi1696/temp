import { get, set } from "lodash";
import React, { CSSProperties } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";

export type ColumnType<T> =
  | {
      name: string;
      key: string;
      component?: <R extends any>(
        row: T,
        defaultValue: R,
        key: string
      ) => JSX.Element;
    }[]
  | null;

interface Props<T> {
  style?: CSSProperties;
  addRow?: boolean;
  columns: ColumnType<T>;
  data: T[] | null;
  updateCb?: (
    item: T,
    key: string,
    value: string
  ) => boolean | undefined | Promise<boolean>;
}

const EditAbleTable = <T extends { id: number }>({
  style,
  columns,
  data,
  updateCb,
}: Props<T>) => {
  //======
  const onDoubleClick = (
    e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>
  ) => {
    e.currentTarget.readOnly = false;
  };

  //=====on lost focus
  const onBlur = (
    e: React.FocusEvent<HTMLTextAreaElement, Element>,
    item: T,
    key: string
  ) => {
    if (!e.currentTarget.readOnly) {
      e.currentTarget.readOnly = true;
      if (e.currentTarget.value !== get(item, key)) {
        e.currentTarget.value = get(item, key);
      }
    }
  };

  //=====when hit enter
  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>, item: T) => {
    if (e.code == "Enter") {
      e.preventDefault();

      const readOnly = e.currentTarget.readOnly;
      if (!readOnly) {
        const target = e.currentTarget;
        const key = e.currentTarget.name;
        const currentValue = e.currentTarget.value;
        target.value = "updating...";

        const setValue = () => {
          set(item, key, currentValue);
          target.defaultValue = get(item, key);
          target.value = get(item, key);
        };

        const setDefault = () => {
          target.value = get(item, key);
        };

        if (updateCb) {
          const result = updateCb(item, key, currentValue);
          if (typeof result === "boolean" || typeof result === "undefined") {
            if (result) {
              setValue();
              return;
            }

            setDefault();
          } else {
            result
              .then((res) => setValue())
              .catch((err) => {
                console.error(err);

                setDefault();
              });
          }
        } else {
          setValue();
        }

        //item[key] = e.currentTarget.value;

        //updateItem(item, key);
        //setFundList(fundList)
      }
    }
  };

  //=====editable input
  const editableInput = (
    item: T,
    defaultValue: string | number,
    key: string
  ) => (
    <textarea
      className="resize-none bg-transparent"
      name={key}
      defaultValue={defaultValue}
      readOnly
      onDoubleClick={onDoubleClick}
      onBlur={(e) => onBlur(e, item, key)}
      onKeyPress={(e) => {
        onKeyPress(e, item);
      }}
    />
  );

  const editableTD = (item: T, defaultValue: string | number, key: string) => (
    <TableCell key={key}>{editableInput(item, defaultValue, key)}</TableCell>
  );

  if (!data || !columns) {
    return null;
  }

  return (
    <div style={style} /* className={tableStyle.container} */>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            {columns.map((it) => (
              <TableHead key={it.key}>{it.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {data.length > 0 && (
          <TableBody>
            {data?.map((it, index) => (
              <TableRow key={it.id}>
                <TableCell>{index}</TableCell>
                {columns.map((col) => {
                  const component = col.component;
                  if (component) {
                    return (
                      <TableCell key={col.key}>
                        {component(it, get(it, col.key, ""), col.key)}
                      </TableCell>
                    );
                  }
                  return editableTD(
                    it,
                    get(it, col.key, "") as string | number,
                    col.key
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default EditAbleTable;
