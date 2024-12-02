'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from 'react-hook-form';
import Image from "next/image";

interface FormInputs {
    name: string;
    ticker: string;
    description: string;
    telegram: string;
    twitter: string;
    website: string;
    logo: File | null;
}

const CreateToken = () => {
    const router = useRouter();

    const { register, getValues, handleSubmit, setValue, formState: { errors } } = useForm<FormInputs>();
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const [mainCurrency, setMainCurrency] = useState<boolean>(false);

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log("Form Data: ", data);

        setShowModal(true);

        if (data.logo) {
            const uploadedFile = data.logo;
            console.log("Uploaded File:", uploadedFile);
        }
    }

    const handleFileChange = (files: FileList | null) => {
        if (!files || files.length === 0) {
            console.error("No file selected");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewSrc(reader.result as string);
        };
        reader.readAsDataURL(files[0] as Blob);
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const files = event.dataTransfer.files;
        handleFileChange(files);
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const clearImage = () => {
        setValue("logo", null);
        setPreviewSrc(null)
    }

    return (
        <section className="dark:bg-gray-dark bg-white relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
            <div className="container">
                <a className="flex gap-2 sm:gap-3 mb-5 text-gray-8 items-center group cursor-pointer" onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-body-color group-hover:text-primary transition-all duration-300">
                        <path d="M20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2Z" fill="currentColor"></path>
                        <path d="M12.8041 19.8037C12.4693 20.1384 12.4693 20.6811 12.8041 21.0159L18.2589 26.4707C18.5936 26.8054 19.1363 26.8054 19.4711 26.4707C19.8058 26.136 19.8058 25.5933 19.4711 25.2585L14.6223 20.4098L19.4711 15.5611C19.8058 15.2263 19.8058 14.6836 19.4711 14.3489C19.1363 14.0141 18.5936 14.0141 18.2589 14.3489L12.8041 19.8037ZM29.4102 19.5526L13.4102 19.5526V21.2669L29.4102 21.2669V19.5526Z" fill="white"></path>
                    </svg>
                    <span className="text-gray-8 text-base md:text-lg lg:text-xl leading-10 tracking-tighter">Back</span>
                </a>
                <p className="text-body-color text-sm md:text-base pb-10">
                    Launch your own meme coin in just a few clicks with our easy-to-use platform. No coding skills needed—simply design, create, and share your coin with the world. Start building your community today
                </p>
                <div className="p-6 md:p-8 lg:p-10 rounded-[20px] border dark:border-gray-700 border-gray-200 shadow-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-12 gap-[0px]">
                            <div className="col-span-12 sm:col-span-3 lg:col-span-2 mb-5 sm:mb-0">
                                <label htmlFor="logo" className="block text-gray-3 text-sm md:text-base pb-2.5 leading-6">Upload File <span className="error text-red-600">*</span></label>
                                <div className="center flex flex-col items-center justify-center w-full border dark:border-gray-700 border-gray-200 rounded-xl bg-black-2 text-gray-700 text-sm md:text-base" onDrop={handleDrop} onDragOver={handleDragOver}>
                                    <div className="flex flex-col items-center gap-4 justify-center p-4 md:p-6">
                                        <Image src="/images/upload.svg" alt="Upload Image" width="50" height="50" className="cursor-pointer" onClick={() => document.getElementById('logo')?.click()} />
                                        <p className="text-center text-xs font-light text-black-6 leading-6 text-body-color">
                                            <label htmlFor="logo" className="pl-1 underline cursor-pointer" >
                                                Click to Upload
                                            </label> (or) Drag and Drop
                                        </p>
                                        <input
                                            id="logo"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            {...register("logo", {
                                                required: 'Logo is required',
                                            })}
                                            onChange={(e) => { console.log(e.target.files); handleFileChange(e.target.files); }}
                                        />
                                    </div>
                                    {previewSrc &&
                                        <div className="flex flex-col items-center group gap-4 justify-center hover:before:border hover:before:border-blue-1 rounded-xl hover:before:rounded-xl relative hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:bg-black hover:before:opacity-80 hover:before:w-full hover:before:h-full ng-star-inserted">
                                            <Image
                                                width={155}
                                                height={168}
                                                alt="Preview Image"
                                                src={previewSrc}
                                                className="w-full h-[168px] object-cover rounded-xl ng-star-inserted"
                                            />
                                            <div className="gap-4 absolute hidden group-hover:flex transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                                                <button className="rounded-lg bg-white w-8 h-8 flex justify-center items-center transition-transform duration-300 ease-in-out transform group-hover:scale-110" onClick={clearImage}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M2.02637 4H14.3689" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.65527 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.7373 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.79785 4L3.56926 13.5997C3.56926 14.024 3.7318 14.431 4.02114 14.731C4.31047 15.0311 4.70289 15.1997 5.11207 15.1997H11.2833C11.6925 15.1997 12.0849 15.0311 12.3743 14.731C12.6636 14.431 12.8261 14.024 12.8261 13.5997L13.5975 4" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.02246 3.99971V1.59978C6.02246 1.38761 6.10373 1.18414 6.2484 1.03411C6.39307 0.884088 6.58928 0.799805 6.79387 0.799805H9.8795C10.0841 0.799805 10.2803 0.884088 10.425 1.03411C10.5696 1.18414 10.6509 1.38761 10.6509 1.59978V3.99971" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {errors.logo && <p className="text-red-600">{errors.logo.message}</p>}
                            </div>
                            <div className="col-span-12 sm:col-span-9 lg:col-span-10 pl-0 sm:pl-[20px] md:pl-[30px] xl:pl-[50px]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-[20px] md:gap-[30px] xl:gap-[50px]">
                                    <div>
                                        <div className="mb-[22px]">
                                            <label htmlFor="token_name" className="block text-gray-3 text-sm md:text-base pb-2.5 leading-6">
                                                Name <span className="error text-red-600">*</span>
                                            </label>
                                            <input
                                                id="token_name"
                                                className="border rounded-xl placeholder:text-body-color text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 dark:border-gray-700 border-gray-200 bg-transparent"
                                                type="text"
                                                placeholder="Enter Name"
                                                {...register('name', { required: 'Name is required' })}
                                            />
                                            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                                        </div>
                                        <div className="mb-[22px]">
                                            <label htmlFor="token_ticker" className="block text-gray-3 text-sm md:text-base pb-2.5 leading-6">
                                                Ticker <span className="error text-red-600">*</span>
                                            </label>
                                            <input
                                                id="token_ticker"
                                                className="border rounded-xl placeholder:text-body-color text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 dark:border-gray-700 border-gray-200 bg-transparent"
                                                type="text"
                                                placeholder="Enter Ticker"
                                                {...register('ticker', { required: 'Ticker is required' })}
                                            />
                                            {errors.ticker && <p className="text-red-600">{errors.ticker.message}</p>}
                                        </div>
                                        <div className="mb-[22px]">
                                            <label htmlFor="token_telegram" className="block text-gray-3 text-sm md:text-base pb-2.5 leading-6">
                                                Telegram Link
                                            </label>
                                            <input
                                                id="token_telegram"
                                                className="border rounded-xl placeholder:text-body-color text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 dark:border-gray-700 border-gray-200 bg-transparent"
                                                type="text"
                                                placeholder="Enter Telegram Link(optional)"
                                                {...register('telegram')}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-[22px]">
                                            <label htmlFor="token_twitter" className="block text-gray-3 text-sm md:text-base pb-2.5 leading-6">
                                                Twitter Link
                                            </label>
                                            <input
                                                id="token_twitter"
                                                className="border rounded-xl placeholder:text-body-color text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 dark:border-gray-700 border-gray-200 bg-transparent"
                                                type="text"
                                                placeholder="Enter Twitter Link(optional)"
                                                {...register('twitter')}
                                            />
                                        </div>
                                        <div className="mb-[22px]">
                                            <label htmlFor="token_website" className="block text-gray-3 text-sm md:text-base pb-2.5 leading-6">
                                                Website Link
                                            </label>
                                            <input
                                                id="token_website"
                                                className="border rounded-xl placeholder:text-body-color text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 dark:border-gray-700 border-gray-200 bg-transparent"
                                                type="text"
                                                placeholder="Enter Website Link(optional)"
                                                {...register('website')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <label htmlFor="description" className="block text-gray-3 text-sm md:text-base pb-2.5 leading-6">
                                    Description <span className="error text-red-600">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    placeholder="Enter Description"
                                    className="border rounded-xl bg-black-2 placeholder:text-gray-7 text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 h-[122px] mb-5 md:mb-2 dark:border-gray-700 border-gray-200 bg-transparent"
                                    {...register('description')}
                                />
                            </div>
                            {errors.description && <p className="text-red-600">{errors.description.message}</p>}
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 flex justify-end items-end">
                                <button type="submit" className="rounded-lg bg-primary text-gray-3 text-base md:text-lg px-7 py-3 w-[160px] md:w-[200px] focus:outline-0 leading-6 text-center disabled:cursor-not-allowed disabled:opacity-50">
                                    Create Coin
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div
                className={`flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none overflow-x-hidden overflow-y-auto transition-all duration-150 ${showModal
                    ? 'opacity-100 visible'
                    : 'opacity-0 invisible'
                    }`}
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl dark:bg-gray-dark dark:shadow-sticky-dark bg-white z-50">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                        <div className="relative p-6 flex-auto">
                            <div className="modal-content">
                                <h2 className="text-base sm:text-lg md:text-xl lg:text-[22px] font-semibold mb-5 sm:mb-6 text-white leading-5 sm:leading-6 md:leading-7">Choose how many [{getValues('name')}] you want to buy (optional)</h2>
                                <p className="m-[15px] font-small">tip: its optional but buying a small amount of coins helps protect your coin from snipers</p>
                                <div className="mb-2.5 relative">
                                    <input type="number" placeholder="0.0 (optional)" className="border rounded-xl bg-black-2 placeholder:text-body-color text-sm md:text-base px-5 py-4 w-full focus:outline-0 leading-5 hide-arrows" />
                                    {mainCurrency ?
                                        <div className="absolute right-5 top-[16px] text-sm md:text-base font-normal flex gap-1.5 items-center leading-5">
                                            <div className="flex item-center gap-1 rounded-full">
                                                <span className="relative top-[2px] leading-4">{getValues('name')}</span>
                                                <Image width={10} height={10} alt="Token Image" className="w-10 sm:w-10 h-10 sm:h-10 rounded-full" src={previewSrc!} />
                                            </div>
                                        </div>
                                        :
                                        <div className="absolute right-5 top-[16px] text-sm md:text-base text-white font-normal flex gap-1.5 items-center leading-5">
                                            <div className="flex item-center gap-1 ng-star-inserted">
                                                <span className="relative top-[2px] leading-4">VLX</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                    <rect x="0.571289" width="20" height="20" rx="10" fill="#8247E5"></rect>
                                                    <mask id="mask0_508_7931" maskUnits="userSpaceOnUse" x="4" y="4" width="13" height="12" style={{ maskType: 'luminance' }}>
                                                        <path d="M16.5869 4.79248H4.58691V15.3082H16.5869V4.79248Z" fill="white"></path>
                                                    </mask>
                                                    <g mask="url(#mask0_508_7931)">
                                                        <path d="M13.6473 7.99427C13.4275 7.86818 13.1465 7.86818 12.8979 7.99427L11.1471 9.03179L9.95827 9.69105L8.23987 10.725C8.02012 10.8511 7.73912 10.8511 7.49055 10.725L6.14681 9.90721C5.92705 9.78112 5.77214 9.52894 5.77214 9.24794V7.67724C5.77214 7.42507 5.89823 7.17649 6.14681 7.01798L7.49055 6.23263C7.7103 6.10654 7.9913 6.10654 8.23987 6.23263L9.58361 7.05041C9.80337 7.17649 9.95827 7.42867 9.95827 7.70967V8.74719L11.1471 8.05551V6.98916C11.1471 6.73699 11.021 6.48841 10.7724 6.3299L8.27229 4.85287C8.05254 4.72678 7.77154 4.72678 7.52297 4.85287L4.96158 6.36232C4.713 6.48841 4.58691 6.74059 4.58691 6.98916V9.93963C4.58691 10.1918 4.713 10.4404 4.96158 10.5989L7.49415 12.0759C7.7139 12.202 7.9949 12.202 8.24347 12.0759L9.96188 11.0708L11.1507 10.3791L12.8691 9.37403C13.0889 9.24794 13.3699 9.24794 13.6184 9.37403L14.9622 10.1594C15.1819 10.2855 15.3368 10.5376 15.3368 10.8186V12.3893C15.3368 12.6415 15.2107 12.8901 14.9622 13.0486L13.6509 13.834C13.4311 13.96 13.1501 13.96 12.9015 13.834L11.5542 13.0486C11.3344 12.9225 11.1795 12.6703 11.1795 12.3893V11.3842L9.9907 12.0759V13.1135C9.9907 13.3656 10.1168 13.6142 10.3654 13.7727L12.8979 15.2497C13.1177 15.3758 13.3987 15.3758 13.6473 15.2497L16.1798 13.7727C16.3996 13.6466 16.5545 13.3944 16.5545 13.1135V10.1306C16.5545 9.87839 16.4284 9.62981 16.1798 9.4713L13.6473 7.99427Z" fill="white">
                                                        </path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    }
                                    <br /><br />
                                    <div className="text-[15px] font-medium leading-none">
                                    </div>
                                    <div >
                                        <a className="text-gray-3 mb-6 text-right underline text-[10px] font-normal block cursor-pointer" onClick={() => setMainCurrency(prev => !prev)}>Switch to {mainCurrency ? 'VLX' : getValues('name')}</a>
                                        <div className="flex gap-5">
                                            <button type="button" className="rounded-lg border border-primary hover:bg-primary hover:text-white text-sm sm:text-base md:text-lg p-2 md:p-3 focus:outline-0 leading-6 text-center w-[160px] md:w-[200px]"> Cancel </button>
                                            <button className="rounded-lg bg-primary hover:bg-white text-white hover:text-black-3 text-sm sm:text-base md:text-lg p-2 md:p-3 focus:outline-0 leading-6 text-center w-[160px] md:w-[200px]"> Create Coin </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full absolute opacity-50 bg-black z-40" onClick={() => setShowModal(false)}></div>
            </div>
        </section>
    )
}

export default CreateToken;