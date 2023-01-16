import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigations = () => {
  const menus = [
    {
      href: '/products',
      label: 'Products',
    },
    {
      href: '/carts',
      label: 'Carts',
    },
  ];
  const router = useRouter();

  return (
    <>
      <ul className="menu menu-compact px-4 rounded-box">
        {menus.map((menu, idx) => (
          <li key={idx}>
            <Link href={menu.href} className={router.pathname === menu.href ? 'active' : ''}>
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navigations;

