// React.Fragmentは、子要素をグループ化するためのコンポーネント
// 1. import React from "react";
// 2. React.Fragmentを使う
// 3. or 省略形は<>を使う

export function Headline(props) {
  console.log(props);
  return (
    <div>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          {props.children}
        </p>
      </div>

      <h1 className="text-4xl font-bold text-slate-8000 capitalize">{props.page}</h1>

      {/* <button onClick={props.onClick}>Click Me!</button> */}
    </div>
  );
}