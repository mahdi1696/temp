"use server";

import {
  job_get_stopWatchListJob,
  job_get_watchListJobInfo,
  job_post_startWatchListJob,
} from "@/src/constants/urls";

export const action_job_watchListJobInfo =
  async (): Promise<WatchListJobInfo> => {
    const response = await fetch(job_get_watchListJobInfo, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  };

export const action_job_startWatchListJob = async (body: {
  startAt: string;
  pauseAt: string;
  options: StartOptions;
}): Promise<WatchListJobInfo> => {
  const response = await fetch(job_post_startWatchListJob, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};

export const action_job_stopWatchList = async (): Promise<WatchListJobInfo> => {
  const response = await fetch(job_get_stopWatchListJob, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
};
