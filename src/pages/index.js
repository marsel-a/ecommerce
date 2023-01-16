import Menus from '@/components/Menus';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      <main>Login Page</main>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return page;
};

export default Home;
