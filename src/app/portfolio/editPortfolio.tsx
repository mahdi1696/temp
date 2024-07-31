"use client";
import { Button } from "@/components/primitives/button";
import Link from "next/link";

import constant from "@/src/constants/content.json";
import React, { useState, useEffect } from "react";
import {
  action_portfolio_deleteRow,
  action_portfolio_getByReportId,
  action_portfolio_delete,
  action_portfolio_addRow,
  action_portfolio_updateRow,
} from "../actions/portfolio";
import PortfolioEditor from "./portfolioEditor/PortfolioEditor";
import LCE, { LCEStatus } from "@/src/components/ui/LCE/lce";
import { useRouter } from "next/navigation";

type Props = {
  letter: Letter;
};
const EditPortfolio = ({ letter }: Props) => {
  const router = useRouter();
  const [lceStatus, setLceStatus] = useState<{
    status: LCEStatus;
    loadingMs?: string;
  }>({ status: "data" });
  const [portfolio, setPortfolio] = useState<Required<PortfolioRow>[]>();

  useEffect(() => {
    setPortfolio([]);
  }, [letter]);

  const downLoadFile = () => {
    window.open(letter?.fileUrl);
  };

  const onDeleteClickHandler = () => {
    if (portfolio && portfolio.length > 0) {
      if (lceStatus.status !== "loading") {
        setLceStatus({ status: "loading", loadingMs: "در حال حذف" });
        const fRow = portfolio[0];
        const ids = {
          letterId: fRow.letterId,
          reportId: fRow.reportId,
        };
        action_portfolio_delete(ids)
          .then(() => {
            setLceStatus({ status: "data" });
            setPortfolio([]);
            router.refresh();
          })
          .catch(() => {
            setLceStatus({ status: "error" });

            //somehow show that there's a error
          });
      }
    }
  };

  const onRowDelete = (row: PortfolioRow) => {
    if (portfolio) {
      setLceStatus({
        status: "loading",
        loadingMs: `در حال حذف کردن ${row.company}`,
      });

      action_portfolio_deleteRow(row!!.id as number)
        .then(() => {
          const f = portfolio.filter((it) => it.id !== row.id);
          setLceStatus({
            status: "data",
          });
          setPortfolio(f);
        })
        .catch((err) => {
          setLceStatus({
            status: "error",
          });

          setTimeout(() => {
            setLceStatus({
              status: "data",
            });
          }, 2000);
          console.error(err);
        });
    }
  };

  const onRowAdd = (row: Required<PortfolioRow>) => {
    setLceStatus({
      status: "loading",
      loadingMs: `در حال اضافه کردن ${row.company}`,
    });

    action_portfolio_addRow(row)
      .then((res) => {
        setLceStatus({
          status: "data",
        });
        row.id = res.data;
        setPortfolio(portfolio?.concat(row));
      })
      .catch((err) => {
        showErrorForPeriod();
        console.error(err);
      });
  };

  const showErrorForPeriod = (period: number = 2000) => {
    setLceStatus({
      status: "error",
    });

    setTimeout(() => {
      setLceStatus({
        status: "data",
      });
    }, 2000);
  };

  const onRowUpdate = (
    row: Required<PortfolioRow>,
    key: string,
    value: string | number | null
  ) => {
    if (portfolio) {
      setLceStatus({ status: "loading", loadingMs: "در حال به روز رسانی" });

      action_portfolio_updateRow(row.id, {
        [key]: value,
      })
        .then(() => {
          setLceStatus({ status: "data" });
          const mp = portfolio.map((it) => {
            if (it.id === row.id) {
              return { ...it, ...{ [key]: value } };
            }
            return it;
          });
          setPortfolio(mp);
        })
        .catch((err) => {
          showErrorForPeriod();
          console.error(err);
        });
    }
  };

  if (letter.reportId) {
    return (
      <div>
        <div className="flex gap-1">
          <Link href={letter.fileUrl}>
            <Button variant="outline">{constant.fa.downloadFile}</Button>
          </Link>
          <p className="whitespace-nowrap">
            اصلاحیه : {letter.isCorrection ? "آره" : "خیر"}
          </p>
          <Button
            variant="outline"
            onClick={() => {
              action_portfolio_getByReportId(letter.reportId as number)
                .then((res) => {
                  setPortfolio(res);
                })
                .catch((err) => console.error(err));
            }}
          >
            نمایش
          </Button>
          <Button variant="outline" onClick={onDeleteClickHandler}>
            حذف
          </Button>
          <p className="whitespace-nowrap">برای اینکه پرتفوی رو حذف کنی اول باید نمایش رو کلیک کنی</p>
        </div>
        <LCE
          status={lceStatus.status}
          loading={lceStatus.loadingMs}
          error="با خطایی مواجه شدیم"
        >
          <PortfolioEditor
            portfolio={portfolio}
            onRowDelete={onRowDelete}
            onRowAdd={(row) => {
              onRowAdd(row as Required<PortfolioRow>);
            }}
            onUpdateRow={onRowUpdate}
          />
        </LCE>
      </div>
    );
  }
};

export default EditPortfolio;
