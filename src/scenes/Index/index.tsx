import { useEffect } from 'react';
import * as Apollo from '@apollo/client';

import { JobsQuery, JobsQueryVariables, Status, JobsDocument, } from "../../generated/graphql";
import { Card } from "./Card";
import { Column } from "./Column";

import styles from "./styles.module.css";

function useJobsQuery() {
  const { data, error, loading, refetch } = Apollo.useQuery<JobsQuery, JobsQueryVariables>(JobsDocument, {});
  const toDoJobs = data?.jobs.filter(job => job.status === Status.ToDo);
  const inProgressJobs = data?.jobs.filter(job => job.status === Status.InProgress);
  const doneJobs = data?.jobs.filter(job => job.status === Status.Done);
  return { toDoJobs, inProgressJobs, doneJobs, error, empty: !data, loading, refetch };
}

export function Index() {
  const { doneJobs, inProgressJobs, toDoJobs, empty, loading, error, refetch } = useJobsQuery();
  
  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 1000);
  }, []);

  if (empty && loading) {
    return <div>…</div>;
  }

  if (error || empty) {
    return <div>Something went wrong :(</div>;
  }

  return (
    <div className={styles.container}>
      <Column>
        {toDoJobs?.map((it) => (
            <Card key={it.id} {...it} />
          ))}
      </Column>
      <Column>
        {inProgressJobs?.map((it) => (
            <Card key={it.id} {...it} />
          ))}
      </Column>
      <Column>
        {doneJobs?.map((it) => (
            <Card key={it.id} {...it} />
          ))}
      </Column>
    </div>
  );
}
