import env from 'dotenv';
env.config();

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

async function getCollection() {
  try {
    await client.connect(); // MongoDBに接続する
    const db = client.db('bookshelf'); // データベースを指定して取得
    return db.collection('books'); // DBからコレクションを指定して取得
  } catch {
    await client.close();
  }
}

getAllBooks();

async function getAllBooks() {
  // db.collection('books')のコレクションを代入
  const col = await getCollection();
  // コレクションに登録された内容を全て取得する
  let cursor = col.find({
    // orオペレーターで「ratingが3以上」または「titleがバックエンド開発」の条件を指定
    $or: [{ rating: 3 }, { title: 'バックエンド開発' }]
  });
  // 「or」以外にもオペレーターは色々用意されている。例えば「in」オペレーターは、指定した配列の中に値が含まれているかを調べることができる
  cursor = col.find({
    title: { $in: ['バックエンド開発', '新宝島'] }
  });
  // 例えば「ratingが2より大きくて、5より小さい場合」を取得するには「gt」「lt」オペレーターを使う
  cursor = col.find({
    rating: { $gt: 2, $lt: 5 }
  });
  // 「2も含めて」、「4も含めて」以上、以下を取得するには「gte」「lte」オペレーターを使う
  cursor = col.find({
    rating: { $gte: 2, $lte: 4 }
  });
  // findに続けて、結果をソートするには「.sort()」を使う
  cursor = col
    .find({
      rating: { $gte: 2, $lte: 4 }
    })
    .sort({ rating: -1 }); // ratingを「1」で昇順、「-1」で降順でソートする
  // ObjectIdを使って、特定のIDを取得するには、MongoDBから「ObjectId()」をimportして使う
  cursor = col.find({
    _id: new ObjectId('633471d481d8ae4ba04fbca9')
  });
  // 正規表現を使って、「あいまいな検索」を行うには「$regex」を使う
  cursor = col.find({
    title: { $regex: /^潮/ } // 「^」(カレット)は先頭を意味し、「i」は大文字小文字を区別しない
  });
  const result = await cursor.toArray(); // 取得した内容を配列に変換する
  console.log(result);

  await client.close();
}
