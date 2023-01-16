import Link from 'next/link';

const Navigations = () => {
  return (
    <>
      <ul className="menu menu-compact px-4 rounded-box">
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/carts">Carts</Link>
        </li>
      </ul>
    </>
  );
};

export default Navigations;

