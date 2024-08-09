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
      <Headline page="about" number={1111} array={[1,2,3,4,5]}
        obj={{name: "John", age: 20}}
        boolean={true}
        undefined={undefined}
        null={null}
        simplebool
        code={<code className="font-mono font-bold">pages/about.js</code>}
        onClick={() => alert("Hello")}
      />
      <Links />
      <Footer />
    </main>
  );
}
