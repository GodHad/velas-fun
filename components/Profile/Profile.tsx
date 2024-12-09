'use client'
import UserContext from "@/contexts/UserContext";
import { coinInfo, followerInfo, userInfo } from "@/types";
import { followUser, getCoinsInfoBy, getFollowers, getMessagesInfoBy, getUser, unfollowUser } from "@/utils/api";
import Image from "next/image";
import Link from "next/link";
import { CoinBlog } from "@/components/Common/CoinBlog";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import Message from "../TokenDetail/Message";

export default function Profile() {
    const { user, imageUrl, setMessages, messages, setImageUrl } = useContext(UserContext)
    const pathname = usePathname();
    const [param, setParam] = useState<string | null>(null);
    const [index, setIndex] = useState<userInfo>({} as userInfo);
    const [option, setOption] = useState<number>(1);
    const [data, setData] = useState<coinInfo[]>([]);
    const [isModal, setIsModal] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [coinHeld, setCoinHeld] = useState([]);
    const [followers, setFollowers] = useState<followerInfo | null>(null);

    useEffect(() => {
        const segments = pathname.split('/');
        const id = segments[segments.length - 1];
        if (id && id !== param) {
            setParam(id);
            const handle = async () => {
                try {
                    const response = await getUser({ id });
                    setIndex(response);
                } catch (error) {
                    console.error("Error fetching user: ", error);
                }
            }

            handle();
        }
    }, [pathname]);

    useEffect(() => {
        const fetchData = async () => {
            if (param) {
                if (option === 2) {
                    const messages = await getMessagesInfoBy(param);
                    setMessages(messages)
                }
                if (option === 4) {
                    const coinsBy = await getCoinsInfoBy(param);
                    setData(coinsBy);
                }
                if (option === 5) {
                    const followers = await getFollowers(param);
                    setFollowers(followers);
                }
            }
        }

        fetchData();
    }, [option]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleFollow = async () => {
        if (user._id && param) {
            const followers = await followUser(user._id, param);
            setFollowers(followers);
        }
    }

    const handleUnfollow = async () => {
        if (user._id && param) {
            const followers = await unfollowUser(user._id, param);
            setFollowers(followers);
        }
    }

    return (
        <section
            className="dark:bg-gray-dark bg-white relative z-10 overflow-hidden pt-[120px] pb-[280px] md:pt-[150px] xl:pt-[180px] xl:pb-[300px] 2xl:pt-[210px] 2xl:pb-[350px]">
            <div className="h-full w-full ng-star-inserted">
                <div className="flex justify-center">
                    <div className="shadow-md rounded-lg p-3 mt-5 w-full sm:max-w-lg mx-auto flex flex-col sm:flex-row gap-5">
                        <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden">
                            <Image
                                alt="Profile Image"
                                className="w-full h-full object-cover"
                                src={index.avatar ? index.avatar : '/images/creator-logos/default.png'}
                                width={96}
                                height={96}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl sm:text-2xl font-semibold">{index.name}</h2>
                                {user._id !== param && (followers && user._id && followers?.followers.map(follower => follower._id).includes(user._id) ?
                                    <button className="flex items-center rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold px-4 py-2 bg-primary" onClick={handleFollow}>
                                        <span>Follow</span>
                                    </button>
                                    :
                                    <button className="flex items-center rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold px-4 py-2 bg-primary" onClick={handleUnfollow}>
                                        <span>Unollow</span>
                                    </button>
                                )}
                            </div>
                            <p className="mt-1">{followers ? followers.followers.length : 0} followers</p>
                            {user._id === param &&
                                <button className="border border-blue-1 rounded-lg p-1.5 mt-1 flex whitespace-nowrap ng-star-inserted">Edit Profile
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="{1.5}"
                                            stroke="currentColor" className="size-6 w-6 h-6 ml-2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10">
                                            </path>
                                        </svg>
                                    </span>
                                </button>
                            }
                            <div className="flex flex-col sm:flex-row mt-1">
                                {/* <p className="mt-1 text-base flex whitespace-nowrap mr-2">
                                    Likes received: 0
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" className="size-6 ml-1">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z">
                                            </path>
                                        </svg>
                                    </span>
                                </p> */}
                                {/* <p className="mt-1 flex text-base whitespace-nowrap">
                                    Mentions received: 0
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className="size-6 ml-1">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z">
                                            </path>
                                        </svg>
                                    </span>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <p className="text-xs sm:text-sm md:text-base border border-blue-1 rounded-lg p-2.5 mt-1">{index.wallet}</p>
                        <div className="flex justify-end">
                            <a target="_blank" className="mt-2 inline-flex cursor-pointer items-center space-x-2 border-b border-transparent hover:border-white" href={`https://solscan.io/address/${index.wallet}`}>
                                <span>View on Holesky</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-full sm:max-w-3xl mx-auto py-3 sm:p-5 md:p-6 shadow-md rounded-lg">
                        <div
                            className="profile-scroll flex justify-start sm:justify-center whitespace-nowrap overflow-x-auto px-0 pb-4 gap-2">
                            <button className={`tab-button text-sm sm:text-base text-gray-500 py-2 px-2 sm:px-3 font-semibold border-b-2 ${option === 1 ? 'border-blue-600' : 'border-transparent'}`} onClick={() => setOption(1)}>
                                Coins Held
                            </button>
                            {user._id === param &&
                                <button className={`tab-button text-sm sm:text-base text-gray-500 py-2 px-2 sm:px-3 font-semibold border-b-2 ${option === 2 ? 'border-blue-600' : 'border-transparent'}`} onClick={() => setOption(2)}>Replies </button>
                            }
                            {/* <button
                                className={`tab-button text-sm sm:text-base text-gray-500 py-2 px-2 sm:px-3 font-semibold border-b-2 ${option === 3 ? 'border-blue-600' : 'border-transparent'}`} onClick={() => setOption(3)}>
                                Notifications
                            </button> */}
                            <button
                                className={`tab-button text-sm sm:text-base text-gray-500 py-2 px-2 sm:px-3 font-semibold border-b-2 ${option === 4 ? 'border-blue-600' : 'border-transparent'}`} onClick={() => setOption(4)}>
                                Coins Created
                            </button>
                            <button
                                className={`tab-button text-sm sm:text-base text-gray-500 py-2 px-2 sm:px-3 font-semibold border-b-2 ${option === 5 ? 'border-blue-600' : 'border-transparent'}`} onClick={() => setOption(5)}>
                                Followers
                            </button>
                            <button
                                className={`tab-button text-sm sm:text-base text-gray-500 py-2 px-2 sm:px-3 font-semibold border-b-2 ${option === 6 ? 'border-blue-600' : 'border-transparent'}`} onClick={() => setOption(6)}>
                                Following
                            </button>
                        </div>
                        <div>
                            {option === 2 && (
                                <div className="flex flex-col justify-center gap-3">
                                    {
                                        messages.map((message, index) => (
                                            <Message message={message} key={`reply-${index}`} />
                                        ))
                                    }
                                </div>
                            )}
                            {(option == 4) &&
                                <div className="justify-center">
                                    {
                                        data.map((coin, index) => (
                                            <Link key={index} href={`/trading/${coin?.token}`}>
                                                <CoinBlog coin={coin} componentKey="coin" />
                                            </Link>
                                        ))
                                    }
                                </div>
                            }
                            {option === 5 && followers &&
                                <div className="flex flex-col justify-center">
                                    {
                                        followers.followers.map((follower, index) => (
                                            <div className="w-auto" key={index}>
                                                <div className="flex justify-between items-center mt-4 gap-3 ng-star-inserted">
                                                    <div className="flex items-center">
                                                        <Image alt="Profile Picture"
                                                            width={10} height={10} className="rounded-full w-10 h-10 mr-3 ng-star-inserted" src={follower.follower.avatar ? follower.follower.avatar : '/images/creator-logos/default.png'} />
                                                        <Link href={`/profile/${follower.follower._id}`}>
                                                            <span className="font-semibold hover:underline cursor-pointer">{follower.follower.name}</span>
                                                        </Link>
                                                    </div>
                                                    <p className="text-sm text-gray-500 ml-3"> Followers</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}