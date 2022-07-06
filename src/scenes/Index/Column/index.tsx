import type { ReactNode } from "react";

import styles from "./styles.module.css";

type Props = { children?: ReactNode };

export function Column({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.list}>{children}</div>
    </div>
  );
}
