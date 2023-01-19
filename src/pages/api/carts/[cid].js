import cache from 'memory-cache';

const URL = 'https://dummyjson.com/carts/?limit=100';

export default async function handler(req, res) {
  let data;

  const cacheData = cache.get(URL);
  if (cacheData) {
    data = cacheData;
  } else {
    const results = await fetch(URL).then((r) => r.json());

    cache.put(URL, results, 1 * 1000 * 60 * 60);
    data = results;
  }

  const { cid } = req.query;
  const { carts } = data;

  const { products, ...rest } = carts.find((cart) => cart.id == cid);

  const user = await fetch(`https://dummyjson.com/users/${rest.userId}`).then((r) => r.json());

  for (let i = 0; i < products.length; i++) {
    const product = await fetch(`http://${req.headers.host}/api/products/${products[i].id}`).then((r) => r.json());
    products[i].details = product;
  }

  res.status(200).json({ ...rest, products, user });
}

