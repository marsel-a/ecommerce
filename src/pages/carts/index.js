import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

// Third Party
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Carts = () => {
  // Hooks
  const router = useRouter();

  // States
  const [page, setPage] = useState(1);

  // Hooks
  const { data, isLoading: isLoadingProducts } = useSWR(`/api/carts?page=${page}`, fetcher);

  return (
    <>
      <Head>
        <title>Carts</title>
      </Head>
      <div className="prose w-full max-w-4xl flex-grow">
        <h1>Carts</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Cart Id</th>
                  <th>User Id</th>
                  <th>Total Amount</th>
                  <th>Total Products</th>
                  <th>Total Item</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingProducts ? (
                  <tr align="center">
                    <td colSpan={6}>loading...</td>
                  </tr>
                ) : (
                  <>
                    {data.carts.map((cart, idx) => (
                      <tr key={idx} className="cursor-pointer hover" onClick={() => router.push(`/carts/${cart.id}`)}>
                        <td>{idx + 1}</td>
                        <td>#{cart.id}</td>
                        <td>{cart.userId}</td>
                        <td>{cart.total}</td>
                        <td>{cart.totalProducts}</td>
                        <td>{cart.totalQuantity}</td>
                      </tr>
                    ))}
                    {data.carts.length === 0 && (
                      <tr align="center">
                        <td colSpan={6}>No cart found.</td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Cart Id</th>
                  <th>User Id</th>
                  <th>Total Amount</th>
                  <th>Total Products</th>
                  <th>Total Item</th>
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
                Page {page}/{data?.totalPage}
              </button>
              <button
                className={`btn btn-xs btn-ghost ${page === data?.totalPage ? 'btn-disabled' : ''}`}
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
    </>
  );
};

export default Carts;

