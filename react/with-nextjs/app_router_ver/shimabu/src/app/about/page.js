import Image from "next/image";
import styles from "@/app/styles/page.module.sass";
import { Header } from "@/components/Header";
import { Doclinks } from "@/components/Doclinks";

export default function About() {
  return (
    <main className={styles.main}>
      <Header name="about" navLink="/" next="index" />

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
