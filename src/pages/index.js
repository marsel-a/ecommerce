import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home = () => {
  const router = useRouter();
  const [isLogging, setIsLogging] = useState(false);

  const login = () => {
    setIsLogging(true);
    setTimeout(() => {
      router.push('/products');
    }, 900);
  };
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <main className="w-full bg-[url('/bg.svg')] bg-repeat bg-[length:600px_600px]">
        <div className="prose flex flex-col items-center gap-4 justify-center h-screen bg-base-200 ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-40">
            <path
              d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"
              fill="currentColor"
            ></path>
          </svg>
          <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-2xl">
            <span className="lowercase">e-</span>
            <span className="text-base-content uppercase">Dashboard</span>
          </div>
          <input type="text" placeholder="Username" value="admin" className="input input-bordered w-full max-w-xs" />
          <input
            type="password"
            placeholder="Password"
            value="admin"
            className="input input-bordered w-full max-w-xs"
          />
          <button disabled={isLogging} className={`btn ${isLogging && 'loading disabled'}`} onClick={login}>
            {isLogging ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return page;
};

export default Home;
