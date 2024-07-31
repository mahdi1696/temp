import React, { useRef } from "react";
import tableStyle from "./Table.module.css";

type Props = {
  column: {
    name: string;
    key: string;
    component?: (key: string, ref: React.MutableRefObject<any>) => JSX.Element;
  }[];

  addCallBack?: (items: any) => void;
  converter?: (key: string, value: any) => any;
};

export default function AddTable({ column, addCallBack, converter }: Props) {
  const inputsRef = useRef<Array<any>>([]);

  const onAddClick = () => {
    const values: [string, any][] = [];
    column.forEach((it, i) => {
      const value = inputsRef.current[i].value;
      if (value) {
        values.push([it.key, converter ? converter(it.key, value) : value]);
      }
    });

    if (values.length > 0) {
      const ob = Object.fromEntries(values);
      addCallBack?.(ob);
    }

    //console.log(values);
  };

  return (
    <div className={tableStyle.container}>
      <table>
        <thead>
          <tr>
            <th key={"__add_btn_cl"}>add</th>
            {column.map((it) => (
              <th key={it.key}>{it.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button key={"__add_btn"} onClick={onAddClick}>
                add
              </button>
            </td>
            {column.map((it, i) => {
              const component = it.component;
              if (component) {
                return component(it.key, inputsRef.current[i]);
              }
              return (
                <td key={it.key}>
                  <textarea
                    ref={(el) => (inputsRef.current[i] = el)}
                  ></textarea>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
