import { Schema, model } from 'mongoose';

const bookSchema = Schema(
  {
    title: {
      type: String,
      required: true
    },
    deescription: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      required: true,
      // 取得する値を丸める
      // 下記の記述は、引数が1つと処理が1行なので、()と{}を省略出来る
      // get: function(v) {
      //   return Math.round(v);
      // },
      // 暗黙のリターンで以下のように書ける。
      get: v => Math.round(v),
      set: v => Math.round(v)
    }
  },
  { timestamps: true } // createdAtとupdatedAtを自動で追加してくれる
);

// grepで引っかかりやすいように一度変数に格納しておく
const Book = model('Book', bookSchema);
export default Book;
