import { useSocket } from "@/contexts/SocketContext"
import Image from "next/image"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AlertComponent() {
    const { alertState } = useSocket();
    const [sticky, setSticky] = useState<boolean>(false);
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

    return (
        <div
            className={`${alertState?.open ? "opacity-100 scale-100" : "opacity-0 scale-95"
                } ${alertState?.severity === "success"
                    ? "bg-meta-3"
                    : alertState?.severity === "error"
                        ? "bg-meta-1"
                        : "bg-meta-5"
                } cursor-pointer px-3 sm:px-4 md:px-5 xl:px-6 fixed z-20 ${sticky ? 'top-[85px]' : 'top-[67px]'} hidden xs:block ${alertState?.open ? "right-2" : "-right-full"
                } py-2 rounded-sm transition-all duration-500 ease-in-out`}>
            {alertState?.open && alertState?.coin && alertState?.user && alertState?.severity && (
                <div className="flex items-center gap-2 md:gap-2.5">
                    <Image
                        alt="ellipse-4"
                        className="img-fluid block rounded-full w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 border"
                        src={alertState?.user?.avatar || ""}
                        width="20"
                        height="20"
                    />
                    <Link href={`/profile/${alertState.user._id}`}>
                        <span className="font-medium text-xs sm:text-sm md:text-base xl:text-lg md:leading-normal xl:leading-6 hover:underline text-meta-6 whitespace-nowrap">
                            {alertState?.user?.name}
                        </span>
                    </Link>
                    {alertState.severity === "success" || alertState.severity === "error" ? (
                        <span className="font-medium text-xs sm:text-sm md:text-base xl:text-lg md:leading-normal xl:leading-6 text-white whitespace-nowrap">
                            {alertState.severity === "success" ? "Bought" : "Sold"} {alertState.amount} VLX of
                        </span>
                    ) : (
                        <span className="font-medium text-xs sm:text-sm md:text-base xl:text-lg md:leading-normal xl:leading-6 text-white whitespace-nowrap">
                            Created
                        </span>
                    )}
                    <Link href={`/coin/${alertState.coin._id}`}>
                        <span className="font-medium text-xs sm:text-sm md:text-base xl:text-lg md:leading-normal xl:leading-6 text-meta-6 hover:underline whitespace-nowrap">
                            {alertState.coin.ticker}
                        </span>
                    </Link>
                    <Image
                        alt="ellipse-5"
                        className="img-fluid block rounded-full w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 border"
                        src={alertState.coin.url}
                        width="20"
                        height="20"
                    />
                </div>
            )}
        </div>
    );
}
