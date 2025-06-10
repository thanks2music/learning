// Common.js : const mongoose = require('mongoose');
// ES Moduleに変更
import { mongoose, connect, Schema, model, Mixed } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
/**
String: 文字列
Number: 数値
Date: 日付
Buffer: バイナリデータ
Boolean: 真偽
Mixed: なんでもOK
ObjectId: Mongo固有のID
Array: 配列
Decimal128: 浮動小数点
Map: マップ
Schema: 他のスキーマ
 */
mongoose.set('strictQuery', true);
connect(process.env.MONGO_URI);
const catSchema = new Schema(
  {
    name: { type: String, required: true }, // 必須項目にする
    // 必須項目にする、かつ、enumで保存する値を限定出来る
    size: { type: Number, required: true, enum: [0, 1] },
    // デフォルト値をfalseにする、かつ、エイリアスの別名として「b」でも取得出来る
    bool: { type: Boolean, default: false, alias: 'b' },
    dt: {
      type: Date, // 日付をDate型に変換する
      // 値を設定する際には、setのセッターが呼ばれる
      set: function (newVal) {
        return new Date(newVal);
      },
      // 値を取得する際には、getのゲッターが呼ばれる
      get: function (val) {
        // MongoDBから返ってくる値が、Date型の場合はそのまま「val」を返す
        // そうでない場合は、valをDate型に変換して返す。
        return val instanceof Date ? val : new Date(val);
      }
    },
    array: [String], // 配列の型を文字列として指定する
    obj: Object,
    anything: Mixed
  },
  { timestamps: true } // createdAtとupdatedAtを自動で追加する
);
// モデルを定義する
// MongoDBのコレクションが、Modelの名前に基づいて作成される
// 例えば、Modelの名前がCatの場合、MongoDBのコレクションはcatsになる
// ただし、MongoDBのコレクションは小文字で複数形になる
const Cat = model('Cat', catSchema);
// モデルを使ってデータを保存する
// new Cat()でインスタンスを作成する
const kitty = new Cat();
kitty.name = 'Zildjian4';
kitty.size = 1;
kitty.dt = '2022/12/21';
kitty.array = [0, 1];
// .save()を呼ぶと、そのままMongoDBに保存される (insertOneのようなイメージ)
// ただし、.save()はPromiseを返すので、thenを使う必要がある
// もしくは、async/awaitを使う
// またMongoDBでは、登録した値は「doc」という引数になって渡ってくる
kitty.save().then(doc => console.log(doc.b));
