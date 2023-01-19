import cache from 'memory-cache';

const URL = 'https://dummyjson.com/carts/?limit=100';
const ITEMS_LIMIT = 10;

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

  const { page } = req.query;

  const { carts, ...rest } = data;
  let fCarts = carts;

  const totalPage = Math.ceil(fCarts.length / ITEMS_LIMIT);

  const p = page || 1;
  fCarts = fCarts.slice(ITEMS_LIMIT * (p - 1), ITEMS_LIMIT * (p - 1) + ITEMS_LIMIT);

  const response = { carts: fCarts, totalPage, ...rest };
  res.status(200).json(response);
}

