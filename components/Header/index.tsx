"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import base58 from 'bs58';
import ThemeToggler from "./ThemeToggler";
import UserContext from "@/contexts/UserContext";
import { hooks, metaMask } from "@/connectors/metaMask";
import { userInfo } from "@/types";
import { walletConnect, confirmWallet, getAdminData, getMetaData } from "@/utils/api";
import { errorAlert, successAlert } from "../ToastGroup";
import HowItWork from "../HowItWork";
import { useData } from "@/contexts/PageContext";
import Logo from "../Common/Logo";

const Header = () => {
  const { useIsActivating, useIsActive, useAccount } = hooks;

  const { setAdminData } = useData();

  const isActive = useIsActive();
  const isActivating = useIsActivating();

  const [showModal, setShowModal] = useState(false);

  const account = useAccount()

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    })
  }, []);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  }, []);

  const { user, setUser, login, setLogin, setIsLoading } = useContext(UserContext);

  useEffect(() => {
    const handleSignIn = async () => {
      if (account && !login) {
        const updatedUser: userInfo = {
          name: account.slice(0, 6),
          wallet: account,
          isLedger: false,
          bio: ''
        };

        await sign(updatedUser);
      }
    };

    handleSignIn();
  }, [account, login]);

  const connect = async () => {
    try {
      await metaMask.provider?.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x4268', 
          chainName: 'Holesky',
          nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18,
          },
          rpcUrls: ['https://ethereum-holesky.publicnode.com'], 
        }],
      })
      await metaMask.activate(17000);
    } catch (error) {
      console.warn(`Failed to connect...`, error);
    }
  }

  const sign = async (updatedUser: userInfo) => {
    try {
      const connection = await walletConnect({ data: updatedUser });
      if (!connection) return;
      const { user, token } = connection;
      localStorage.setItem('jwtToken', token)
      const newUser = {
        name: user.name,
        wallet: user.wallet,
        _id: user._id,
        avatar: user.avatar,
        admin: user.admin,
      };

      if (user.nonce === undefined) {
        setUser(newUser as userInfo);
        setLogin(true);
        if (user.admin) {
          const adminData = await getAdminData();
          setAdminData(adminData)
        }
        successAlert("You sign in successfully.");
        return;
      }

      const msg = new TextEncoder().encode(
        `Nonce to confirm: ${user.nonce}`
      );

      const res = base58.encode(msg as Uint8Array);
      const signedwallet = { ...user, signature: res };
      const confirm = await confirmWallet({ data: signedwallet });

      if (confirm) {
        setUser(confirm);
        setLogin(true);
        setIsLoading(false);
      }

      successAlert("You sign in successfully.");
    } catch {
      errorAlert("Sign in failed.");
    }
  }

  const disconnect = async () => {
    if (metaMask.deactivate) await metaMask.deactivate()
    else await metaMask.resetState();
  }

  const logOut = async () => {
    await disconnect();
    setUser({} as userInfo);
    setLogin(false);
    localStorage.clear();
  }
  
  const { setMetaData } = useData()
  const getMetaData_ = async () => {
      try {
          const data = await getMetaData();
          setMetaData(data)
      } catch {
          errorAlert('Failed to get the MetaData');
      }
  }

  useEffect(() => {
      getMetaData_()
  }, [])

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
              <Logo />
            </div>
            <div className="flex w-full items-center justify-end px-4">
              <div className="flex items-center justify-end lg:pr-0">
                {user.admin &&
                  <Link
                    href="/admin"
                    className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                  >
                    Admin Page
                  </Link>
                }
                <Link
                  href="/faq"
                  className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                >
                  FAQ
                </Link>
                <button
                  className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                  onClick={() => setShowModal(true)}
                >
                  How it works
                </button>
                {(!isActive || !account) ? (
                  <>
                    <button
                      className="rounded-md bg-primary px-4 py-2 md:px-6 md:py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                      onClick={connect}
                      disabled={isActivating}
                    >
                      Connect <span className="hidden sm:block">Wallet</span>
                    </button>
                  </>
                ) : (
                  <div className="relative connect-btn">
                    <button
                      className="rounded-md bg-primary px-4 py-2 md:px-6 md:py-2 text-base font-semibold duration-300 ease-in-out hover:bg-primary/80 text-white"
                    >
                      {account.slice(0, 4)}....{account.slice(-4)}
                    </button>
                    <div className="absolute top-8 right-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-black dark:border-none border border-body-color z-500 hidden dark:text-white duration-300 transition-all">
                      <div role="none" className="py-0">
                        <Link href={`/profile/${user._id}`} role="menuitem" className="w-full block px-4 py-2 font-syne text-xs sm:text-sm font-medium rounded-t-md text-left hover:bg-primary hover:text-white">View Profile</Link>
                        <button role="menuitem" className="w-full block px-4 py-2 font-syne text-xs sm:text-sm font-medium rounded-b-md text-left hover:bg-primary  hover:text-white" onClick={logOut}>Disconnect Wallet</button>
                      </div>
                    </div>
                  </div>
                )}
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <HowItWork showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Header;
