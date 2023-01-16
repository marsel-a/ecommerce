import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Products = () => {
  const { data, isLoading } = useSWR('https://dummyjson.com/products/?limit=10', fetcher);

  return (
    <div className="prose w-full max-w-4xl flex-grow">
      <h1>Products</h1>
      <div className="flex justify-between">
        <div>Filter</div>
        {/* <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> */}
        <input type="text" placeholder="Search Product" className="input input-bordered input-md w-full max-w-xs" />
      </div>
      <div className="overflow-x-auto flex flex-col items-end">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr align="center">
                <td colSpan={6}>loading...</td>
              </tr>
            ) : (
              <>
                {data.products.map((product, idx) => (
                  <tr key={idx}>
                    <td></td>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
            </tr>
          </tfoot>
        </table>
        <div className="btn-group">
          <button className="btn btn-sm">1</button>
          <button className="btn btn-sm btn-active">2</button>
          <button className="btn btn-sm">3</button>
          <button className="btn btn-sm">4</button>
        </div>
      </div>
    </div>
  );
};

export default Products;

