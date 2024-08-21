import { Inter } from "next/font/google";
import { Links } from "@/components/Links";
import { Headline } from "@/components/Headline";
const inter = Inter({ subsets: ["latin"] });

export function Main(props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Headline page={props.page}>
        <code className="font-mono font-bold">pages/{props.page}</code>
      </Headline>

      <Links />
    </main>
  );
}
