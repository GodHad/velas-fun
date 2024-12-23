import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { coinInfo, msgInfo, tradeInfo, userInfo } from "@/types";
import UserContext from "@/contexts/UserContext";
import { getMessageByCoin, getTradeByCoin } from "@/utils/api";
import ReplyModal from "./ReplyModal";
import { useSocket } from "@/contexts/SocketContext";
import Message from "./Message";
import Link from "next/link";
import ResponsivePaginationComponent from "react-responsive-pagination";
import 'react-responsive-pagination/themes/classic.css';

export default function Thread({ param, coin }: { param: string, coin: coinInfo }) {
    const [trades, setTrades] = useState<tradeInfo>({} as tradeInfo);
    const [showing, setShowing] = useState<string>('thread');
    const { user, messages, setMessages } = useContext(UserContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { socket } = useSocket();

    const perPage = 30;
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchData = async () => {
            if (param) {
                if (showing === 'thread') {
                    const data = await getMessageByCoin(param, perPage, currentPage);
                    setMessages(data.messages);
                    setTotalPage(data.pagination.totalPages)
                } else {
                    const data = await getTradeByCoin(param, perPage, currentPage);
                    setTrades(data.trade);
                    setTotalPage(data.pagination.totalPages);
                }
            }
        }
        fetchData();
    }, [showing, param, setMessages, perPage, currentPage]);

    useEffect(() => {
        const handler = (data: { isBuy: number, user: userInfo, token: coinInfo, amount: number, ticker: string, price: number, tx: string }) => {
            const { isBuy, user, amount, price, tx } = data;
            if (data.token._id === coin._id && trades.record) {
                setTrades({
                    ...trades,
                    record: [
                        {
                            holder: user,
                            holdingStatus: isBuy,
                            time: new Date(),
                            amount: amount,
                            price: price,
                            tx: tx,
                        },
                        ...trades.record,
                    ],
                });
            }
        };
    
        socket?.on('transaction', handler);
    
        return () => {
            socket?.off('transaction', handler);
        };
    }, [socket, trades, coin]);    

    useEffect(() => {
        const newPostHandler = (data: msgInfo) => {
            if (coin._id === data.coinId)
                setMessages([...messages, { ...data }])
        }

        socket?.on('new-post', newPostHandler);

        return () => {
            socket?.off('new-post', newPostHandler);
        }
    }, [socket])

    return (
        <>
            <div className="tabs mt-4">
                <div className="flex items-center gap-2 pb-4">
                    <div className={`font-semibold text-xs leading-none cursor-pointer w-24 sm:w-28 pb-2 pt-2 px-4 text-center flex justify-center items-center transition-colors duration-300 rounded ${showing === 'thread' ? 'bg-primary text-white' : 'text-gray-500'}`} onClick={() => setShowing('thread')}> Thread </div>
                    <div className={`font-semibold text-xs leading-none cursor-pointer w-24 sm:w-28 pb-2 pt-2 px-4 text-center flex justify-center items-center transition-colors duration-300 rounded ${showing === 'trades' ? 'bg-primary text-white' : 'text-gray-500'}`} onClick={() => setShowing('trades')}> Trades </div>
                </div>
            </div>
            <div className="flex flex-col gap-5">
                {showing === 'thread' ? (
                    <>
                        <div>
                            <div className="dark:bg-gray-800 bg-gray-100 rounded-xl sm:rounded-2xl flex flex-col gap-5 lg:gap-6 p-4 sm:p-5">
                                <div className="flex flex-col gap-3 lg:gap-4">
                                    <div className="flex flex-col gap-2">
                                        <a className="flex items-center group text-sm lg:text-base font-normal">
                                            <Image
                                                className="img-fluid w-5 h-5"
                                                alt="sender avatar"
                                                src={typeof coin.creator !== 'string' && coin.creator.avatar ? coin.creator.avatar : '/images/creator-logos/default.png'}
                                                width={16}
                                                height={16}
                                            />
                                            <div className="flex gap-3">
                                                <span className="text-yellow hover:text-yellow-500 ps-1.5 inline-flex gap-1 transition-all duration-500 ease-in-out hover:underline cursor-pointer"> {(coin.creator as userInfo).name} </span>
                                                <span className="text-body-color">{moment(coin.date).format('MMM DD, YYYY, hh:mm:ss')}</span>
                                            </div>
                                        </a>
                                        <div className="flex gap-4">
                                            <Image alt="comment-image" className="img-fluid w-40 h-40 object-cover rounded-2xl" src={coin.url} width={160} height={160} />
                                            <span className="text-md font-semibold">{coin.description}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 md:gap-4">
                                    </div>
                                    <hr className="border dark:border-gray-700 border-gray-200" />
                                </div>
                            </div>
                        </div>
                        {
                            messages && messages.map((message, index) => (
                                <Message message={message} key={`reply-${index}`} />
                            ))
                        }
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
                        <button className="bg-primary text-white rounded-md py-2 px-4" onClick={() => setShowModal(true)}>Post a reply</button>
                        <ReplyModal showModal={showModal} setShowModal={setShowModal} token={coin} user={user} />
                    </>
                ) : (
                    <div>
                        <div className="flex flex-col color p-3 mb-3 rounded-lg max-w-fit">
                            <div className="flex flex-col justify-start px-3">
                                <div className="flex flex-row justify-between items-center">
                                    <p className="mr-4">Filter by following</p>
                                    <label className="switch m-2">
                                        <input type="checkbox" className="" />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
                            <hr className="border border-gray-200 dark:border-gray-700 line my-2" />
                            {/* <div className="flex flex-col justify-start px-3">
                                <div className="flex flex-row justify-between items-center">
                                    <p className="mr-4">Filter by size</p>
                                    <label className="switch m-2">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div> */}
                        </div>
                        <div className="mb-3 lg:mb-0">
                            <div className="overflow-auto bg-gray-2 rounded-xl sm:rounded-2xl mb-5 md:mb-6 lg:mb-8 ng-star-inserted">
                                <table className="table-auto w-full min-w-max">
                                    <thead>
                                        <tr className="text-sm lg:text-xxs-15 xl:text-base font-medium text-gray-600 border-b dark:border-gray-700 border-gray-200 !leading-none">
                                            <th className="p-4 lg:pb-4 lg:p-5 text-start">Account</th>
                                            <th className="p-4 lg:pb-4 lg:p-5 text-start">Type</th>
                                            <th className="p-4 lg:pb-4 lg:p-5 text-start">VLX</th>
                                            <th className="p-4 lg:pb-4 lg:p-5 text-start">{coin.name}</th>
                                            <th className="p-4 lg:pb-4 lg:p-5 text-start"><p className="flex items-center">Date</p>
                                            </th>
                                            <th className="p-4 lg:pb-4 lg:p-5 text-center">Transaction</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-12">
                                        {trades.record && trades.record.map((transaction, index) => (
                                            <tr className="text-sm lg:text-[15px] xl:text-base font-normal !leading-none ng-star-inserted" key={transaction.tx + index}>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">
                                                    <div className="flex items-center">
                                                        <Image width={16} height={16} alt="token-id" className="w-4 h-4" src={transaction.holder.avatar ? transaction.holder.avatar : '/images/creator-logos/default.png'} />
                                                        <Link href={`/profile/${(transaction.holder as userInfo)._id}`}>
                                                            <span className="font-medium pl-1.5 hover:underline cursor-pointer">{transaction.holder.name}</span>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">
                                                    <span className={`${transaction.holdingStatus === 2 ? 'text-green-500' : 'text-red-500'}`}> {transaction.holdingStatus === 2 ? 'Buy' : 'Sell'} </span>
                                                </td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">{transaction.holdingStatus === 2 ? (transaction.amount).toFixed(3) : (transaction.amount * transaction.price / 1_000_000).toFixed(3)}</td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">{transaction.holdingStatus === 2 ? (transaction.amount / transaction.price).toFixed(3) : (transaction.amount / 1_000_000).toFixed(3)}</td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">{moment(transaction.time).fromNow()}</td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4 text-center">
                                                    <a target="_blank" className="hover:underline" href={`https://explorer.solana.com/tx/${transaction.tx}`}>{transaction.tx.slice(0, 4)}....{transaction.tx.slice(-4)}</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}