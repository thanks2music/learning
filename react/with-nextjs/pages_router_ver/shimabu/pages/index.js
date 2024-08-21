// import Image from "next/image";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Links } from "@/components/Links";
import { Headline } from "@/components/Headline";

const inter = Inter({ subsets: ["latin"] });

// default exportを使う場合、import時は{}ではない。
// ファイルシステムルーティング(Page ver)は、export defaultでないといけない。
// export functionなら、{} を使ってimportする。

export default function Home() {
  return (
    <div>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <Headline page="index">
          <code className="font-mono font-bold">pages/index.js</code>
        </Headline>

        <Links />
      </main>
      <Footer />
    </div>
  );
}
