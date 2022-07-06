import { DateTime } from "luxon";

import { Job } from "../../../generated/graphql";
import { shortString } from "../../../modules/limit-string-length";

import styles from "./styles.module.css";

export function Card({ id, name, status, createdAt }: Job) {
  return (
    <article className={styles.container}>
      <h1 className={styles.title} title={id}>
        {shortString(name)}
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
