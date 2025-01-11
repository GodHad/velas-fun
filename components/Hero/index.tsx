'use client'
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import TokenComponent from "./Token";
import ResponsivePaginationComponent from "react-responsive-pagination";
import 'react-responsive-pagination/themes/classic.css';
import UserContext from "@/contexts/UserContext";
import { getCoinsInfo } from "@/utils/api";
import { coinInfo } from "@/types";
import { useData } from "@/contexts/PageContext";
import KingOfTheHillMain from "./KingOfTheHill";

enum SortMethods {
    lastTrade = 'Last Trade',
    creationTime = 'Creation Time',
    lastReply = 'Last Reply',
    marketCap = 'Market Cap'
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/'

const Hero = () => {
    const { setIsLoading, vlxPrice } = useContext(UserContext);
    const [allTokens, setAllTokens] = useState<coinInfo[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<SortMethods>(SortMethods.lastTrade);
    const [searchTerm, setSearchTerm] = useState<string>('');
    // const [order, setOrder] = useState('desc');
    const perPage = 8;
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000);

        return () => {
            clearTimeout(handler);
        }
    }, [searchTerm]);

    useEffect(() => {
        const fetchData = async () => {
            const { coins, pagination } = await getCoinsInfo({ perPage, sortBy, searchTerm: debouncedSearchTerm, currentPage });
            if (coins !== null) {
                setTotalPage(pagination.totalPages);
                setAllTokens(coins);
                setIsLoading(true);
            }
        }

        fetchData();
    }, [perPage, sortBy, debouncedSearchTerm, currentPage]);

    const handleClickSort = (sortMethod: SortMethods) => {
        setSortBy(sortMethod);
        setShowFilter(false);
        setCurrentPage(1);
    }

    const { metaData } = useData();

    return (
        <>
            <section
                id="home"
                className="dark:bg-gray-dark bg-white relative z-10 overflow-hidden pb-16 pt-[120px]"
            >
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div
                                className={`wow fadeInUp mx-auto text-center ${(!metaData || !metaData.bannerUrl) ? 'bg-create-token' : ''} bg-top bg-contain md:bg-right bg-no-repeat rounded-lg shadow-md`}
                                style={metaData?.bannerUrl ? { backgroundImage: `url('${BACKEND_URL + metaData.bannerUrl}')` } : undefined}
                                data-wow-delay=".2s"
                            >
                                <div className=" rounded-md relative z-10 after:content-[''] after:bg-bg-curve after:bg-cover after:absolute after:bg-no-repeat after:bg-bottom after:bottom-0 after:left-0 after:w-full after:h-full after:-z-10 after:opacity-10 overflow-hidden p-7 sm:pb-9 sm:pt-11 lg:pt-12 xl:pt-12.5 sm:px-11 lg:px-12.2 xl:px-14.5 min-h-[450px] xs:min-h-[480px] sm:min-h-[550px] md:min-h-[360px] flex items-end md:items-center justify-center md:justify-start border dark:border-gray-700 border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 xl:gap-20">
                                        <div className="col-span-1 md:col-span-5">
                                            <div className="flex flex-col flex-wrap gap-4 sm:gap-5.5 mb-4 sm:mb-5 md:mb-7 xl:mb-8">
                                                <h1 className="font-michroma font-bold text-3xl lg:text-4xl xl:text-5xl xl:!leading-lh-55">{metaData?.bannerTitle || 'Build Your Token in Minutes'}</h1>
                                                <hr className="border-gray opacity-50" />
                                                <p className="font-michroma text-body-color font-normal text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"> {metaData?.bannerContent || 'Empower Your Crypto Journey'}</p>
                                            </div>
                                            <Link
                                                href="/create"
                                                className="rounded-sm bg-primary px-8 py-2 sm:py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                                            >
                                                Start a New Coin
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section id="features" className="py-4">
                <KingOfTheHillMain vlxPrice={vlxPrice} />
                <div className="container flex justify-between items-center">
                    <div className="">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <button className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-blue-800" type="button" onClick={() => setShowFilter(true)}>
                            {sortBy}
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {showFilter &&
                            <div className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-12 left-0`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <span className="text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleClickSort(SortMethods.lastTrade)}>Last Trade</span>
                                    </li>
                                    <li>
                                        <span className="text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleClickSort(SortMethods.creationTime)}>Creation Time</span>
                                    </li>
                                    <li>
                                        <span className="text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleClickSort(SortMethods.lastReply)}>Last Reply</span>
                                    </li>
                                    <li>
                                        <span className="text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleClickSort(SortMethods.marketCap)}>Market Cap</span>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <div className="container mt-[50px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-x-6 gap-y-6 md:gap-y-7">
                        {allTokens.map(token => (
                            <TokenComponent token={token} key={token._id} vlxPrice={vlxPrice} />
                        ))}
                    </div>
                    {totalPage > 0 &&
                        <div
                            className="wow fadeInUp -mx-4 flex flex-wrap mt-10"
                            data-wow-delay=".15s"
                        >
                            <div className="w-full px-4">
                                <ResponsivePaginationComponent
                                    className="token-pagination"
                                    pageItemClassName="item"
                                    pageLinkClassName="link"
                                    activeItemClassName="active"
                                    disabledItemClassName="disabled"
                                    current={currentPage}
                                    total={totalPage}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    );
};

export default Hero;
