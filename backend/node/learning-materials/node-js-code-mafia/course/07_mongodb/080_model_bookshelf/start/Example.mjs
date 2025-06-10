import mongoose, { connect, Schema, model, Mixed } from 'mongoose';
import env from 'dotenv';
env.config();
mongoose.set('strictQuery', true);
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
connect(process.env.MONGO_URI);

const catSchema = new Schema({
  name: { type: String, required: true },
  size: { type: Number, required: true, enum: [0, 1] },
  bool: { type: Boolean, default: false, alias: 'b' },
  dt: {
    type: Date,
    set: function (newVal) {
      return new Date(newVal);
    },
    get: function (val) {
      return val instanceof Date ? val : new Date(val);
    }
  },
  arry: [String],
  anything: Mixed
});
const Cat = model('Cat', catSchema);

// const kitty = new Cat();
// kitty.name = 'Zildjian';
// kitty.size = 1;
// kitty.arry = [0, 1];
// kitty.dt = '2017/12/21';
// kitty.save().then(doc => console.log('Kitty完了', doc));

// Booksshelfのモデルを定義する
const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5], default: 3 },
    comment: { type: String }
  },
  { timestamps: true }
);
const Book = model('Book', bookSchema);
const book = new Book();

book.title = 'サカナクション';
book.description = 'ネイティブダンサー';
book.rating = 5;
book.comment = 'エレクトロとロックを融合させた最高の音楽';
// book.save().then(book => console.log('book保存完了', book._id));

init();

async function init() {
  const registerBook = await book.save();
  console.log('book id is', registerBook._id);
  mongoose.connection.close();
}
