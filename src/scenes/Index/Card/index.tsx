import { DateTime } from "luxon";

import { JobsQuery } from "../../../generated/graphql";
import { shortString } from "../../../modules/limit-string-length";

import styles from "./styles.module.css";

type Props = Omit<JobsQuery["jobs"][number], "__typename">;

export function Card({ id, status, createdAt }: Props) {
  return (
    <article className={styles.container}>
      <h1 className={styles.title} title={id}>
        {shortString(id)}
      </h1>
      <div className={styles.subtitle}>
        {new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(DateTime.fromISO(createdAt).toJSDate())}
      </div>
      <div>{status}</div>
    </article>
  );
}
