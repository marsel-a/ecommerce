import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Third Party
import useSWR from 'swr';

// Constants
const fetcher = (url) => fetch(url).then((r) => r.json());
const ITEMS_LIMIT = 10;

const CartDetails = () => {
  // Hooks
  const router = useRouter();
  const { cid } = router.query;

  // States
  const [page, setPage] = useState(1);

  // Hooks
  const { data, isLoading } = useSWR(`/api/carts/${cid}`, fetcher);
  const totalPage = Math.ceil(data?.products.length / ITEMS_LIMIT) || 0;

  return (
    <>
      <Head>
        <title>Cart Detail</title>
      </Head>

      <div className="prose w-full max-w-4xl flex-grow">
        <div className="flex align-middle">
          <button className="btn btn-sm btn-circle btn-outline mr-4 mt-2" onClick={() => router.push('/carts')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="48"
                d="M244 400L100 256l144-144"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="square"
                stroke-miterlimit="10"
                stroke-width="48"
                d="M120 256h292"
              ></path>
            </svg>
          </button>

          <h1>Cart {cid}</h1>
        </div>

        <div>
          <h4>Details</h4>
          <div className="bg-base-200 rounded-md p-2">
            {isLoading ? (
              <div>loading...</div>
            ) : (
              data && (
                <div className="grid grid-cols-2 text-sm md:text-md">
                  <div>
                    <div>
                      <span className="font-semibold">User:</span> {data.user.firstName} {data.user.lastName}
                    </div>
                    <div>
                      <span className="font-semibold">Total Amount:</span> ${data.total}
                    </div>
                  </div>
                  <div>
                    <div>
                      <span className="font-semibold"># of items:</span> {data.totalQuantity}
                    </div>
                    <div>
                      <span className="font-semibold"># of products:</span> {data.totalProducts}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <h4>Items per brand</h4>
          <div className="bg-base-200 rounded-md p-2">
            {isLoading ? (
              <div>loading...</div>
            ) : (
              data &&
              (() => {
                const brands = {};
                data.products.forEach((product) => {
                  const { brand } = product.details;

                  if (brands[brand]) {
                    brands[brand] = brands[brand] + 1;
                  } else {
                    brands[brand] = 1;
                  }
                });

                return (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-sm md:text-md">
                    {Object.keys(brands).map((brand, idx) => (
                      <div key={idx}>
                        <span className="font-semibold">{brand}:</span> {brands[brand]}
                      </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        </div>

        <div>
          <h4>Products</h4>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="table table-compact w-full mt-0">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr align="center">
                      <td colSpan={6}>loading...</td>
                    </tr>
                  ) : (
                    data && (
                      <>
                        {data.products.map((product, idx) => (
                          <tr key={idx}>
                            <td></td>
                            <td>{product.title}</td>
                            <td>{product.details.brand}</td>
                            <td>{product.details.category}</td>
                            <td>${product.price}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price * product.quantity}</td>
                          </tr>
                        ))}
                        {data.products.length === 0 && (
                          <tr align="center">
                            <td colSpan={6}>No product found.</td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="flex justify-end mb-6">
              <div className="btn-group">
                <button
                  className={`btn btn-xs btn-ghost ${page === 1 ? 'btn-disabled' : ''}`}
                  onClick={() => {
                    const updatePage = page - 1;
                    setPage(updatePage);
                    router.query.page = updatePage;
                    router.push(router);
                  }}
                >
                  Prev
                </button>
                <button className="btn-xs">
                  Page {page}/{totalPage}
                </button>
                <button
                  className={`btn btn-xs btn-ghost ${page === totalPage ? 'btn-disabled' : ''}`}
                  onClick={() => {
                    const updatePage = page + 1;
                    setPage(updatePage);
                    router.query.page = updatePage;
                    router.push(router);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;

