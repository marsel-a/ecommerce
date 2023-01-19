import Link from 'next/link';
import Menus from '@/components/Menus';
import Image from 'next/image';

const MainLayout = ({ children }) => {
  return (
    <main>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* <!-- Navbar --> */}
          <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content">
            <div className="w-full navbar">
              <div className="flex-none lg:hidden">
                <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="flex-1 px-2 mx-2"></div>
              <div className="flex-none hidden items-center lg:flex">
                <span className="font-semibold mr-2">Welcome, Admin</span>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <Image src="https://placeimg.com/80/80/people" alt="" width={80} height={80} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link href="/">Logout</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 xl:pr-2 pb-2">{children}</div>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <div className="bg-base-200 w-80">
            <div className="z-20 bg-base-200 bg-opacity-90 backdrop-blur sticky top-0 items-center gap-2 px-4 py-2 flex ">
              <Link href="/" aria-current="page" aria-label="Homepage" className="flex-0 btn btn-ghost px-2">
                <div className="font-title text-primary inline-flex text-lg transition-all duration-200 md:text-3xl">
                  <span className="lowercase">e-</span>
                  <span className="text-base-content uppercase">Dashboard</span>
                </div>
              </Link>
            </div>
            <div className="h-4"></div>
            <Menus />
            <div className="absolute flex items-center bottom-0 m-auto lg:hidden p-4">
              <div className="dropdown dropdown-top">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image src="https://placeimg.com/80/80/people" alt="" width={80} height={80} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href="/">Logout</Link>
                  </li>
                </ul>
              </div>
              <span className="font-semibold ml-2">Welcome, Admin</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;

