// import Image from "next/image";
import { Inter } from "next/font/google";
import { Footer } from "../components/Footer";
import { Links } from "../components/Links";
import { Headline } from "../components/Headline";

const inter = Inter({ subsets: ["latin"] });

export default function About() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Headline page="about" />
      <Links />
      <Footer />
    </main>
  );
}
