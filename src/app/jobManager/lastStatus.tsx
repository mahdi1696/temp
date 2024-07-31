"use client";

import LCE from "@/src/components/ui/LCE/lce";
import { useApiCall } from "@/src/hooks/useApiCall";
import { Button } from "@/components/primitives/button";
import { action_job_watchListJobInfo } from "../actions/job";

const LastStatus = () => {
  const { data, error, status, getData } = useApiCall<WatchListJobInfo>("data");

  return (
    <div className="p-2">
      <Button
        onClick={() => {
          getData(action_job_watchListJobInfo.bind(null));
        }}
      >
        Get
      </Button>
      <LCE loading="loading..." error={error} status={status}>
        {data && (
          <>
            <p dir="ltr">
              status :{" "}
              {data?.isPaused ? "paused" : data?.isRunning ? "running" : "stop"}
            </p>
            <p dir="ltr">
              {
                /* data?.lastStatusDate?.toString() */
                data?.lastStatusDate &&
                  new Intl.DateTimeFormat("fa-IR-u-nu-latn", {
                    dateStyle: "short",
                    timeStyle: "medium",
                  }).format(new Date(data.lastStatusDate))
              }
            </p>
            <p dir="ltr">{data?.lastStatusMessage}</p>
            <p dir="ltr">{data?.lastErrorMessage}</p>{" "}
          </>
        )}
      </LCE>
    </div>
  );
};

export default LastStatus;
