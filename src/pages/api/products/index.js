import cache from 'memory-cache';

const URL = 'https://dummyjson.com/products/?limit=100';
const ITEMS_LIMIT = 10;

export default async function handler(req, res) {
  let data;

  const cacheData = cache.get(URL);
  if (cacheData) {
    data = cacheData;
  } else {
    const { products, ...rest } = await fetch(URL).then((r) => r.json());
    const brands = new Set();
    const categories = new Set();
    let minPrice = 0,
      maxPrice = 0;

    products.forEach((product, idx) => {
      brands.add(product.brand);
      categories.add(product.category);

      if (idx === 0) {
        minPrice = product.price;
        maxPrice = product.price;
      } else {
        if (product.price > maxPrice) maxPrice = product.price;
        if (product.price < minPrice) minPrice = product.price;
      }
    });

    const results = { products, brands: [...brands], categories: [...categories], minPrice, maxPrice, ...rest };

    cache.put(URL, results, 1 * 1000 * 60 * 60);
    data = results;
  }

  const { q, brands, categories, min, max, page } = req.query;

  const { products, ...rest } = data;
  let fProducts = products;

  if (q) {
    fProducts = fProducts.filter((product) => product.title.toLowerCase().includes(q.toLowerCase()));
  }

  if (brands) {
    fProducts = fProducts.filter((product) => brands.includes(product.brand));
  }

  if (categories) {
    fProducts = fProducts.filter((product) => categories.includes(product.category));
  }

  if (min) {
    fProducts = fProducts.filter((product) => product.price >= min);
  }

  if (max) {
    fProducts = fProducts.filter((product) => product.price <= max);
  }

  const totalPage = Math.ceil(fProducts.length / ITEMS_LIMIT);

  const p = page || 1;
  fProducts = fProducts.slice(ITEMS_LIMIT * (p - 1), ITEMS_LIMIT * (p - 1) + ITEMS_LIMIT);

  const response = { products: fProducts, totalPage, ...rest };
  res.status(200).json(response);
}

