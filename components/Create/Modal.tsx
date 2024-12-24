import Image from "next/image";
import { useState } from "react";

const Modal = ({
    showModal,
    setShowModal,
    createTokenCallback,
    tokenTicker,
    tokenImage,
}: ({
    showModal: boolean,
    setShowModal: (_: boolean) => void,
    createTokenCallback: (_: number) => void,
    tokenTicker: string,
    tokenImage: string,
})) => {
    const [amount, setAmount] = useState<string>('');
    const [isVLX, setIsVLX] = useState<boolean>(true);

    const handleCreate = () => {
        const _amount = isVLX ? Number(amount) : Number(amount) * 300_000 / 1_072_892_901
        createTokenCallback(_amount);
    }

    return (
        <div
            className={`flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none overflow-x-hidden overflow-y-auto transition-all duration-150 ${showModal
                ? 'opacity-100 visible'
                : 'opacity-0 invisible'
                }`}
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl rounded-[20px] shadow-lg dark:bg-gray-dark dark:shadow-sticky-dark bg-white z-50 border border-gray-1">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                    <div className="relative p-6 flex-auto">
                        <div className="modal-content">
                            <div className="p-5 sm:p-6 md:p-8 w-[300px] sm:w-[350px] md:w-[410px] lg:w-[478px]">
                                <h2
                                    className="text-base sm:text-lg md:text-xl lg:text-[22px] font-semibold mb-5 sm:mb-6 leading-5 sm:leading-6 md:leading-7">
                                    Choose how many [{tokenTicker}] you want to buy (optional)
                                </h2>
                                <div>
                                    <div className="mb-2.5 relative">
                                        <input
                                            value={amount}
                                            type="number"
                                            placeholder="0.0 (optional)"
                                            className="border-main rounded-xl bg-black-2 placeholder:text-gray-7 text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 hide-arrows border"
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                        <div className="absolute right-5 top-[16px] text-sm md:text-base font-normal flex gap-1.5 items-center leading-5">
                                            {isVLX ?
                                                <div className="flex item-center gap-1 justify-center">
                                                    <span className="relative top-[2px] leading-4">VLX</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={24} version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 42 42" xmlSpace="preserve">
                                                        <path fill="#0037C1" d="M28.9,13.9L21,27.7l-7.9-13.9H28.9z M36.8,9.2H5.2L21,37L36.8,9.2z M0,0l2.6,4.6h36.7L42,0H0z" />
                                                    </svg>
                                                </div>
                                                :
                                                <div className="flex item-center gap-1 justify-center">
                                                    <span className="relative top-[2px] leading-4">{tokenTicker}</span>
                                                    <Image width={24} height={24} src={tokenImage} alt={tokenTicker} />
                                                </div>
                                            }
                                        </div>
                                        <br /><br />
                                        <div>
                                            <a className="text-gray-3 mb-6 text-right underline text-[10px] font-normal block cursor-pointer" onClick={() => setIsVLX(prev => !prev)}>Switch to {isVLX ? tokenTicker : 'VLX'}</a>
                                            <div className="flex gap-5">
                                                <button type="button" className="rounded-lg bg-blue-2 border border-blue-1 hover:bg-blue-1 text-sm sm:text-base md:text-lg p-2 md:p-3 focus:outline-0 leading-6 text-center w-[160px] md:w-[200px]" onClick={() => setShowModal(false)}>
                                                    Cancel
                                                </button>
                                                <button className="rounded-lg bg-primary hover:text-black-3 text-sm sm:text-base md:text-lg p-2 md:p-3 focus:outline-0 leading-6 text-center w-[160px] md:w-[200px] text-white" onClick={handleCreate}>
                                                    Create Coin
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full absolute opacity-50 bg-black z-40" onClick={() => setShowModal(false)}></div>
        </div>
    )
}

export default Modal;