import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigations = () => {
  const menus = [
    {
      href: '/products',
      label: 'Products',
      icon: (
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M48 170v196.92L240 480V284L48 170z" fill="currentColor"></path>
          <path d="M272 480l192-113.08V170L272 284zm176-122.36z" fill="currentColor"></path>
          <path d="M448 144L256 32L64 144l192 112l192-112z" fill="currentColor"></path>
        </svg>
      ),
    },
    {
      href: '/carts',
      label: 'Carts',
      icon: (
        <>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <circle cx="176" cy="416" r="32" fill="currentColor"></circle>
            <circle cx="400" cy="416" r="32" fill="currentColor"></circle>
            <path
              d="M456.8 120.78a23.92 23.92 0 0 0-18.56-8.78H133.89l-6.13-34.78A16 16 0 0 0 112 64H48a16 16 0 0 0 0 32h50.58l45.66 258.78A16 16 0 0 0 160 368h256a16 16 0 0 0 0-32H173.42l-5.64-32h241.66A24.07 24.07 0 0 0 433 284.71l28.8-144a24 24 0 0 0-5-19.93z"
              fill="currentColor"
            ></path>
          </svg>
        </>
      ),
    },
  ];
  const router = useRouter();

  return (
    <>
      <ul className="menu menu-compact px-4 rounded-box">
        {menus.map((menu, idx) => (
          <li key={idx}>
            <Link href={menu.href} className={router.pathname.startsWith(menu.href) ? 'active' : ''}>
              <span className="flex-none">{menu.icon}</span>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navigations;

