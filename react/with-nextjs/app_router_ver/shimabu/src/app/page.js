import Image from "next/image";
import Link from "next/link";
import styles from "@/app/styles/page.module.sass";
import { Doclinks } from "@/app/components/Doclinks";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <Link href="/about/">Next page to <b>アバウトページ</b></Link>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          src="/ven.jpg"
          alt="Ven"
          className={styles.logo}
          width={320}
          height={256}
          priority
        />
      </div>

      <Doclinks />
    </main>
  );
}
