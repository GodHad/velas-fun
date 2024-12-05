import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { coinInfo, tradeInfo, userInfo } from "@/types";
import UserContext from "@/contexts/UserContext";
import { getMessageByCoin, getTradeByCoin } from "@/utils/api";
import ReplyModal from "./ReplyModal";

export default function Thread({ param, coin }: { param: string, coin: coinInfo }) {
    const [trades, setTrades] = useState<tradeInfo>({} as tradeInfo);
    const [showing, setShowing] = useState<string>('thread');
    const { user, messages, setMessages } = useContext(UserContext);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            if (param) {
                if (showing === 'thread') {
                    const data = await getMessageByCoin(param);
                    setMessages(data);
                } else {
                    const data = await getTradeByCoin(param);
                    setTrades(data);
                }
            }
        }
        fetchData();
    }, [showing, param]);

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
                                <div key={`reply${index}`}>
                                    <div className="dark:bg-gray-800 bg-gray-100 rounded-xl sm:rounded-2xl flex flex-col gap-5 lg:gap-6 p-4 sm:p-5">
                                        <div className="flex flex-col gap-3 lg:gap-4">
                                            <div className="flex flex-col gap-2">
                                                <a className="flex items-center group text-sm lg:text-base font-normal">
                                                    <Image
                                                        className="img-fluid w-5 h-5"
                                                        alt="sender avatar"
                                                        src={typeof message.sender !== 'string' && message.sender.avatar ? message.sender.avatar : '/images/creator-logos/default.png'}
                                                        width={16}
                                                        height={16}
                                                    />
                                                    <div className="flex gap-3">
                                                        <span className="text-yellow hover:text-yellow-500 ps-1.5 inline-flex gap-1 transition-all duration-500 ease-in-out hover:underline cursor-pointer"> {(message.sender as userInfo).name} </span>
                                                        <span className="text-body-color">{moment(message.time).format('MMM DD, YYYY, hh:mm:ss')}</span>
                                                    </div>
                                                </a>
                                                <div className="flex gap-4">
                                                    {message.img && 
                                                    <Image alt="comment-image" className="img-fluid w-40 h-40 object-cover rounded-2xl" src={message.img} width={160} height={160} />
                                                    }
                                                    <span className="text-md font-semibold">{message.msg}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 md:gap-4">
                                                {/* <button className="text-sm lg:text-base font-medium text-gray-200 bg-body-color px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 rounded-2xl sm:rounded-20">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.5" className="size-6 ml-1" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
                                                </svg>
                                                <span>{message.likes}</span>
                                            </button> */}
                                                {/* <button onClick={() => setShowModal(true)}>Reply</button> */}
                                            </div>
                                            <hr className="border dark:border-gray-700 border-gray-200" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
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
                            <div className="flex flex-col justify-start px-3">
                                <div className="flex flex-row justify-between items-center">
                                    <p className="mr-4">Filter by size</p>
                                    <label className="switch m-2">
                                        <input type="checkbox" />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>
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
                                                        <span className="font-medium pl-1.5 hover:underline cursor-pointer">{transaction.holder.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">
                                                    <span className={`${transaction.holdingStatus === 2 ? 'text-green-500' : 'text-red-500'}`}> {transaction.holdingStatus === 2 ? 'Buy' : 'Sell'} </span>
                                                </td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">{transaction.holdingStatus === 2 ? (transaction.amount * transaction.price / 100).toFixed(2) : (transaction.amount * transaction.price / 1_000_000).toFixed(2)}</td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">{transaction.amount}</td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4">{moment(transaction.time).fromNow()}</td>
                                                <td className="px-4 lg:px-5 py-3.5 lg:py-4 text-center">
                                                    <a target="_blank" className="hover:underline" href={`https://explorer.solana.com/tx/${transaction.tx}`}>{transaction.tx.slice(0, 4)}....{transaction.tx.slice(-4)}</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}