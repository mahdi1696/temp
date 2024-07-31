"use client";
import { Button } from "@/components/primitives/button";
import {
  action_job_startWatchListJob,
  action_job_stopWatchList,
} from "../actions/job";

import { useState } from "react";

type StartWatchList = {
  startAt: string;
  pauseAt: string;
};

type ChangesType = Partial<StartWatchList> & Partial<StartOptions>;

export default function JobMangerButtons({
  criteria,
  initStatus,
}: {
  criteria: ChangesType;
  initStatus: {
    isRunning: boolean;
    isPaused: boolean;
  };
}) {
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [status, setStatus] = useState({ ...initStatus });
  const onStartClick = () => {
    if (!checkTime(criteria.startAt as string)) {
      alert("Invalid startAt time format");
      return;
    }

    if (!checkTime(criteria.pauseAt as string)) {
      alert("Invalid pauseAt time format");
      return;
    }

    if (!criteria.interval) {
      alert("Interval is required");
      return;
    }

    const body = {
      startAt: criteria.startAt as string,
      pauseAt: criteria.pauseAt as string,
      options: {
        getPriceInfo: criteria.getPriceInfo,
        getBids: criteria.getBids,
        getIndexInfo: criteria.getIndexInfo,
        interval: criteria.interval,
        getClientType: criteria.getClientType as boolean,
        getFipIranNavs: criteria.getFipIranNavs,
      },
    };

    setIsStarting(true);
    action_job_startWatchListJob(body)
      .then((res) => {
        setStatus({ isRunning: true, isPaused: false });
      })
      .catch((err) => {
        alert("can not start the job");
        console.error(err);
      })
      .finally(() => {
        setIsStarting(false);
      });
  };

  const onStopClick = () => {
    setIsStopping(true);
    action_job_stopWatchList()
      .then((res) => {
        setStatus({ isRunning: false, isPaused: false });
      })
      .catch((err) => {
        alert("can not stop the job");
        console.error(err);
      })
      .finally(() => {
        setIsStopping(false);
      });
  };

  const checkTime = (time?: string) => {
    if (!time) return false;
    let [hour, min] = time.split(":");
    if (!hour || !min) {
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center gap-1">
      status :{" "}
      {status.isPaused ? "paused" : status.isRunning ? "running" : "stop"}
      <Button disabled={isStarting} variant="success" onClick={onStartClick}>
        {isStarting ? "starting" : "start"}
      </Button>
      <Button disabled={isStopping} variant="destructive" onClick={onStopClick}>
        {isStopping ? "stopping" : "stop"}
      </Button>
    </div>
  );
}
