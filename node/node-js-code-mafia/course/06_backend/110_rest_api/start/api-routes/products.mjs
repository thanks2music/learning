import express from 'express';
const router = express.Router();

const products = [
  { name: 'table', price: 1000 },
  { name: 'chair', price: 300 },
  { name: 'clock', price: 700 }
];

router.get('/', function (req, res) {
  res.json(products);
});

router.get('/:id', function (req, res) {
  const targetId = req.params.id;
  res.json(products[targetId]);
});

// productsに対して追加を行う
router.post('/', function (req, res) {
  const newProduct = req.body;
  products.push(newProduct);
  console.log(products);
  res.json(newProduct);
});

// productsに対して削除を行う
// 「:id」とする事で、Expressのダイナミックルーティングにより、idの値を取得できる
router.delete('/:id', function (req, res) {
  const deleteId = req.params.id;
  products.splice(deleteId, 1);
  console.log(products);
  res.json({ deleteId });
});

// productsに対して更新を行う
router.patch('/:id', function (req, res) {
  const targetProduct = products[req.params.id];

  // req.bodyオブジェクト内にnameがあれば、nameを更新する
  if (req.body.hasOwnProperty('name')) {
    targetProduct.price = req.body.name;
  }

  // req.bodyオブジェクト内にpriceがあれば、priceを更新する
  if (req.body.hasOwnProperty('price')) {
    targetProduct.price = req.body.price;
  }

  console.log(products);
  res.json(targetProduct);
});

export default router;
