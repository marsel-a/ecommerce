import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Third Party
import useSWR from 'swr';
import Head from 'next/head';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Products = () => {
  // Hooks
  const router = useRouter();

  // States
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  // Hooks
  const { data, isLoading: isLoadingProducts } = useSWR(
    `/api/products?page=${page}&q=${q}${brands.reduce((acc, curr) => acc + '&brands=' + curr, '')}${categories.reduce(
      (acc, curr) => acc + '&categories=' + curr,
      ''
    )}&min=${min}&max=${max}`,
    fetcher
  );

  useEffect(() => {
    if (router.isReady) {
      setPage(router.query.page || 1);
      setQ(router.query.q || '');
      document.getElementById('qTextField').value = router.query.q || '';

      if (typeof router.query.brands === 'string') setBrands([router.query.brands]);
      else setBrands(router.query.brands || []);

      if (typeof router.query.categories === 'string') setCategories([router.query.categories]);
      else setCategories(router.query.categories || []);

      setMin(router.query.min || '');
      document.getElementById('minTextField').value = router.query.min || '';

      setMax(router.query.max || '');
      document.getElementById('maxTextField').value = router.query.max || '';
    }
  }, [router.isReady]);

  // Actions
  const resetPage = () => {
    setPage(1);
    delete router.query.page;
  };

  const toggleBrand = (brand) => {
    const newBrands = brands.filter((b) => b !== brand);

    if (newBrands.length === brands.length) {
      newBrands.push(brand);
    }

    setBrands(newBrands);
    router.query.brands = newBrands;

    resetPage();
    router.push(router);
  };

  const toggleCategory = (category) => {
    const newCategories = categories.filter((c) => c !== category);

    if (newCategories.length === categories.length) {
      newCategories.push(category);
    }

    setCategories(newCategories);
    router.query.categories = newCategories;

    resetPage();
    router.push(router);
  };

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <div className="prose w-full max-w-4xl flex-grow">
        <h1>Products</h1>
        <div className="flex justify-between not-prose flex-col-reverse lg:flex-row gap-4">
          <div>
            <div>Filter:</div>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm gap-1 normal-case btn-ghost m-1">
                <span>Brand</span>
                <span>
                  <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="square"
                      stroke-miterlimit="10"
                      stroke-width="48"
                      d="M112 184l144 144l144-144"
                    ></path>
                  </svg>
                </span>
              </label>
              <ul
                tabIndex={0}
                className="p-2 menu dropdown-content bg-base-200 rounded-box w-64 flex-nowrap max-h-[300px] overflow-y-auto shadow-2xl"
              >
                {data?.brands.map((brand, idx) => (
                  <li key={idx} className={brands.includes(brand) ? 'bg-base-300' : ''}>
                    <a onClick={() => toggleBrand(brand)}>{brand}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm gap-1 normal-case btn-ghost m-1">
                <span>Category</span>
                <span>
                  <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="square"
                      stroke-miterlimit="10"
                      stroke-width="48"
                      d="M112 184l144 144l144-144"
                    ></path>
                  </svg>
                </span>
              </label>
              <ul
                tabIndex={0}
                className="p-2 shadow menu dropdown-content bg-base-200 rounded-box w-64 flex-nowrap max-h-[300px] overflow-y-auto shadow-2xl"
              >
                {data?.categories.map((category, idx) => (
                  <li key={idx} className={categories.includes(category) ? 'bg-base-300' : ''}>
                    <a onClick={() => toggleCategory(category)}>{category}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown mobile:dropdown-end">
              <label tabIndex={0} className="btn btn-sm gap-1 normal-case btn-ghost m-1">
                <span>Min Price</span>
                <span>
                  <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="square"
                      stroke-miterlimit="10"
                      stroke-width="48"
                      d="M112 184l144 144l144-144"
                    ></path>
                  </svg>
                </span>
              </label>
              <div tabIndex={0} className="form-control dropdown-content bg-base-200 rounded-box shadow-2xl p-2">
                <label className="input-group">
                  <span>$</span>
                  <input
                    id="minTextField"
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered input-sm"
                    onKeyUp={(e) => {
                      if (e.code === 'Enter') {
                        const minValue = e.target.value;
                        setMin(minValue);
                        resetPage();

                        if (minValue === '') {
                          delete router.query.min;
                        } else {
                          router.query.min = minValue;
                        }

                        router.push(router);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-sm gap-1 normal-case btn-ghost m-1">
                <span>Max Price</span>
                <span>
                  <svg width="12px" height="12px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="square"
                      stroke-miterlimit="10"
                      stroke-width="48"
                      d="M112 184l144 144l144-144"
                    ></path>
                  </svg>
                </span>
              </label>
              <div tabIndex={0} className="form-control dropdown-content bg-base-200 rounded-box shadow-2xl p-2">
                <label className="input-group">
                  <span>$</span>
                  <input
                    id="maxTextField"
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered input-sm"
                    onKeyUp={(e) => {
                      if (e.code === 'Enter') {
                        const maxValue = e.target.value;
                        setMax(maxValue);
                        resetPage();

                        if (maxValue === '') {
                          delete router.query.max;
                        } else {
                          router.query.max = maxValue;
                        }

                        router.push(router);
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          <input
            type="text"
            id="qTextField"
            placeholder="Search product name..."
            className="input input-bordered w-full lg:max-w-xs"
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                const qValue = e.target.value;
                setQ(qValue);

                if (qValue === '') {
                  delete router.query.q;
                } else {
                  router.query.q = qValue;
                }

                resetPage();
                router.push(router);
              }
            }}
          />
        </div>

        <div className="flex gap-1 flex-wrap">
          {brands.map((brand, idx) => (
            <div key={idx} className="badge badge-accent gap-2 cursor-pointer">
              <svg
                onClick={() => toggleBrand(brand)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Brand: {brand}
            </div>
          ))}
          {categories.map((category, idx) => (
            <div key={idx} className="badge badge-accent gap-2 cursor-pointer">
              <svg
                onClick={() => toggleCategory(category)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Category: {category}
            </div>
          ))}
          {min && (
            <div className="badge badge-accent gap-2 cursor-pointer">
              <svg
                onClick={() => {
                  setMin('');
                  document.getElementById('minTextField').value = '';
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Min Price: {min}
            </div>
          )}
          {max && (
            <div className="badge badge-accent gap-2 cursor-pointer">
              <svg
                onClick={() => {
                  setMax('');
                  document.getElementById('maxTextField').value = '';
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Max Price: {max}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
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
                {isLoadingProducts ? (
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
                        <td>${product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.category}</td>
                      </tr>
                    ))}
                    {data.products.length === 0 && (
                      <tr align="center">
                        <td colSpan={6}>No product found.</td>
                      </tr>
                    )}
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

export default Products;

