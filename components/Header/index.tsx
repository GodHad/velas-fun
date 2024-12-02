"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center py-[10px] ${sticky
          ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute bg-transparent"
          }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${sticky ? "py-5 lg:py-2" : "py-8"
                  } `}
              >
                <h1 className="text-[30px] font-extrabold">Velas</h1>
              </Link>
            </div>
            <div className="flex w-full items-center justify-end px-4">
              <div className="flex items-center justify-end lg:pr-0">
                <Link
                  href="#"
                  className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                >
                  Support
                </Link>
                <button
                  className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                  onClick={() => setShowModal(true)}
                >
                  How it works
                </button>
                <button
                  className="rounded-md bg-primary px-4 py-2 md:px-6 md:py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                >
                  Connect <span className="hidden sm:block">Wallet</span>
                </button>
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none overflow-x-hidden overflow-y-auto transition-all duration-150 ${showModal
          ? 'opacity-100 visible'
          : 'opacity-0 invisible'
          }`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl dark:bg-gray-dark dark:shadow-sticky-dark bg-white z-50">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <div className="modal-content">
                <h2 className="text-center mb-3 text-[20px] font-semibold">How It Works</h2>
                <p className="m-[15px] font-medium">Pump prevents rugs by making sure that all created tokens are safe. Each coin on a pump is a fair-launch with no presale and no team allocation.</p>
                <p className="m-[15px] font-medium">Step 1: pick a coin that you like</p>
                <p className="m-[15px] font-medium">Step 2: buy the coin on the bonding curve</p>
                <p className="m-[15px] font-medium">Step 3: sell at any time to lock in your profits or losses</p>
                <p className="m-[15px] font-medium">Step 4: when enough people buy on the bonding curve it reaches a market cap of $69k</p>
                <p className="m-[15px] font-medium">Step 5: $12k of liquidity is then deposited in BX Dex and burned</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full absolute opacity-50 bg-black z-40" onClick={() => setShowModal(false)}></div>
      </div>
    </>
  );
};

export default Header;
