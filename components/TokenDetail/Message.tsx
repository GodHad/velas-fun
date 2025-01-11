import Image from "next/image";
import moment from "moment";
import { coinInfo, msgInfo, userInfo } from "@/types";
import Link from "next/link";

export default function Message({ message, coinDisplay }: { message: msgInfo, coinDisplay?: boolean }) {
    return (
        <div className="dark:bg-gray-800 bg-gray-100 rounded-xl sm:rounded-2xl flex flex-col gap-5 lg:gap-6 p-4 sm:p-5">
            <div className="flex flex-col gap-3 lg:gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center group text-sm lg:text-base font-normal">
                        <Image
                            className="img-fluid w-5 h-5"
                            alt="sender avatar"
                            src={typeof message.sender !== 'string' && message.sender.avatar ? message.sender.avatar : '/images/creator-logos/default.png'}
                            width={16}
                            height={16}
                        />
                        <div className="flex gap-3">
                            <Link href={`/profile/${(message.sender as userInfo)._id}`}>
                                <span className="text-yellow hover:text-yellow-500 ps-1.5 inline-flex gap-1 transition-all duration-500 ease-in-out hover:underline cursor-pointer"> {(message.sender as userInfo).name} </span>
                            </Link>
                            <span className="text-body-color">{moment(message.time).format('MMM DD, YYYY, hh:mm:ss')}</span>
                            {coinDisplay && <Link href={`/coin/${(message.coinId as coinInfo)._id}`}><span className="text-yellow">{(message.coinId as coinInfo).token}</span></Link>}
                        </div>
                    </div>
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
    )
}