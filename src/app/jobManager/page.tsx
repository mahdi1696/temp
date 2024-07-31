import { action_job_watchListJobInfo } from "../actions/job";
import JobMangerWrapper from "./jobMangerWrapper";
import LastStatus from "./lastStatus";

export default async function JobMangerPage() {
  const info = await action_job_watchListJobInfo();

  return (
    <div className="flex flex-wrap overflow-auto h-full">
      <JobMangerWrapper info={info} />
      <LastStatus />
    </div>
  );
}
