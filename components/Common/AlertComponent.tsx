import Image from "next/image"

export default function AlertComponent() {
    return (
        <div className="cursor-pointer px-3 sm:px-4 md:px-5 xl:px-6 fixed z-20 top-[100px] right-0 hidden sm:block">
            <div className="flex items-center gap-2 md:gap-2.5">
                <Image alt="ellipse-4" className="img-fluid block w-4 sm:w-5 md:w-5.5 h-4 sm:h-5 md:h-5.5" src="https://ipfs.fleek.co/ipfs/QmZFh7ZANCjWoFN7vvxX84zutwVw5QAN7upkKpCzV4JUpE" width="20" height="20" />
                <span className="font-medium text-xs sm:text-sm md:text-base xl:text-lg md:leading-normal xl:leading-6 text-white hover:underline whitespace-nowrap">prashanth</span>
                <span className="font-medium text-xs sm:text-sm md:text-base xl:text-lg md:leading-normal xl:leading-6 text-white whitespace-nowrap">Sold 0.000013 ETH of</span>
                <span className="font-medium text-xs sm:text-sm md:text-base xl:text-lg md:leading-normal xl:leading-6 text-white hover:underline whitespace-nowrap">SAND</span>
                <Image alt="ellipse-5" className="img-fluid block w-4 sm:w-5 md:w-5.5 h-4 sm:h-5 md:h-5.5" src="https://ipfs.fleek.co/ipfs/QmZFh7ZANCjWoFN7vvxX84zutwVw5QAN7upkKpCzV4JUpE" width="20" height="20" />
            </div>
        </div>
    )
}