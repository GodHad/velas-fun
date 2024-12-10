"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import base58 from 'bs58';
import ThemeToggler from "./ThemeToggler";
import UserContext from "@/contexts/UserContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { userInfo } from "@/types";
import { confirmWallet, walletConnect } from "@/utils/api";
import { errorAlert, successAlert } from "../ToastGroup";
import HowItWork from "../HowItWork";

// const velasChainData = {
//   chainId: '0x6A',
//   chainName: 'Velas EVM Mainnet',
//   nativeCurrency: {
//     name: 'Velas',
//     symbol: 'VLX',
//     decimals: 18,
//   },
//   rpcUrls: ['https://evmexplorer.velas.com/rpc'],
//   blockExplorerUrls: ['https://evmexplorer.velas.com'],
// }

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

  // const addVelasNetwork = async () => {
  //   if (typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask) {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_addEthereumChain',
  //         params: [velasChainData],
  //       });
  //       console.log('Velas network added successfully!');
  //       return true;
  //     } catch (e) {
  //       console.log(e)
  //       return false;
  //     }
  //   } else {
  //     alert('MetaMask is not installed! Please install Metamask extension.');
  //     return false;
  //   }
  // };


  // const connectWallet = async () => {
  //   const isNetworkAdded = await addVelasNetwork();
  //   if (!isNetworkAdded) {
  //     alert('Velas network was not added. Wallet connection aborted.');
  //     return;
  //   }
  //   if (typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask) {
  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: 'eth_requestAccounts',
  //       }) as string[];

  //       if (accounts && accounts.length > 0) {
  //         setAccount(accounts[0]);
  //         setConnected(true);

  //         console.log('Connected to Velas with account:', accounts[0]);
  //       } else {
  //         console.log('No account found')
  //       }
  //     } catch (error) {
  //       console.error('Error connecting to wallet: ', error);
  //     }
  //   } else {
  //     alert('MetaMask is not installed!');
  //   }
  // }

  // const disconnectWallet = () => {
  //   setConnected(false);
  //   setAccount(null);
  // };

  const { user, setUser, login, setLogin, setIsLoading } = useContext(UserContext);
  const { publicKey, disconnect, signMessage } = useWallet();
  const { setVisible } = useWalletModal();

  useEffect(() => {
    const handleClick = async () => {
      if (publicKey && !login) {
        const updatedUser: userInfo = {
          name: publicKey.toBase58().slice(0, 6),
          wallet: publicKey.toBase58(),
          isLedger: false,
        };

        await sign(updatedUser);
      }
    }

    handleClick();
  }, [publicKey, login]);

  const sign = async (updatedUser: userInfo) => {
    try {
      const connection = await walletConnect({ data: updatedUser });
      if (!connection) return;
      if (connection.nonce === undefined) {
        const newUser = {
          name: connection.name,
          wallet: connection.wallet,
          _id: connection._id,
          avatar: connection.avatar,
        };
        setUser(newUser as userInfo);
        setLogin(true);
        return;
      }

      const msg = new TextEncoder().encode(
        `Nonce to confirm: ${connection.nonce}`
      );

      const sig = await signMessage?.(msg);
      const res = base58.encode(sig as Uint8Array);
      const signedwallet = { ...connection, signature: res };
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

  const logOut = async () => {
    if (typeof disconnect === 'function') await disconnect();

    setUser({} as userInfo);
    setLogin(false);
    localStorage.clear();
  }

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
                {(!login || !publicKey) ? (
                  <>
                    <button
                      className="rounded-md bg-primary px-4 py-2 md:px-6 md:py-2 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                      onClick={() => setVisible(true)}
                    >
                      Connect <span className="hidden sm:block">Wallet</span>
                    </button>
                  </>
                ) : (
                  <div className="relative connect-btn">
                    <button
                      className="rounded-md bg-primary px-4 py-2 md:px-6 md:py-2 text-base font-semibold duration-300 ease-in-out hover:bg-primary/80 text-white"
                    >
                      {publicKey.toBase58().slice(0, 4)}....{publicKey.toBase58().slice(-4)}
                    </button>
                    <div className="absolute top-10 right-0 mt-2 w-full rounded-md shadow-lg  bg-black border border-blue1 ring-1 ring-black ring-opacity-5 z-50 ng-star-inserted hidden text-white">
                      <div role="none" className="py-0">
                        <Link href={`/profile/${user._id}`} role="menuitem" className="w-full block px-4 py-2 font-syne text-xs sm:text-sm font-medium bg-blue2 hover:bg-blue1 rounded-t-md text-left">View Profile</Link>
                        <button role="menuitem" className="w-full block px-4 py-2 font-syne text-xs sm:text-sm font-medium bg-blue2 hover:bg-blue1 rounded-b-md text-left" onClick={logOut}>Disconnect Wallet</button>
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
