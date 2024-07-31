"use client";

import React, { useState } from "react";
import JobMangerButtons from "./jobMangerButtons";
import JobManger from "./jobManager";

type Props = { info: WatchListJobInfo };

export default function JobMangerWrapper({ info }: Props) {
  const [criteria, setCriteria] = useState({
    startAt: info.startTime,
    pauseAt: info.pauseTime,
    ...info.options,
  });
  return (
    <div className="max-w-md mx-auto shadow pb-1 m-1 h-full">
      <JobMangerButtons
        criteria={criteria}
        initStatus={{ isRunning: info.isRunning, isPaused: info.isPaused }}
      />
      <JobManger
        criteria={{
          startAt: info.startTime,
          pauseAt: info.pauseTime,
          ...info.options,
        }}
        onChange={setCriteria as any}
      />
    </div>
  );
}
