import Link from "next/link";
import styles from "@/app/styles/page.module.sass";

export function Header(props) {
  return (
    <div className={styles.description}>
      <p>
        This is <span>{props.name}</span> page.&nbsp;
        <code className={styles.code}>src/app/{props.name}/page.js</code>
      </p>
      <div>
        <Link href={props.navLink}>Back to <b>{props.next}</b></Link>
      </div>
    </div>
  )
}
