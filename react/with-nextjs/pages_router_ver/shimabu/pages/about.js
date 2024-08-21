// import Image from "next/image";
import { Inter } from "next/font/google";
import { Footer } from "../components/Footer";
import { Links } from "../components/Links";
import { Headline } from "../components/Headline";

const inter = Inter({ subsets: ["latin"] });

export default function About() {
  return (
    <div>
      <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
        <Headline page="about">
          <code className="font-mono font-bold">pages/about.js</code>
        </Headline>
        <Links />
      </main>
      <Footer />
    </div>
  );
}
