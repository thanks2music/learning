import { Footer } from "@/components/Footer";
import { Main } from "@/components/Main";

// default exportを使う場合、import時は{}ではない。
// ファイルシステムルーティング(Page ver)は、export defaultでないといけない。
// export functionなら、{} を使ってimportする。

export default function Home() {
  return (
    <>
      <Main page="index" href="/">
      </Main>
      <Footer />
    </>
  );
}
