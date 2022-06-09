import type { ReactNode } from "react";

import styles from "./styles.module.css";

type Props = { children?: ReactNode };

export function Column({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}
