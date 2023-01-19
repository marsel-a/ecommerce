import cache from 'memory-cache';

const URL = 'https://dummyjson.com/products/?limit=100';

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

  const { pid } = req.query;
  const { products } = data;

  const product = products.find((product) => product.id == pid);

  res.status(200).json(product);
}

