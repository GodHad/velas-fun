'use client'
import { useData } from "@/contexts/PageContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateLogoInfo } from "@/utils/api";
import Image from "next/image";
import { useRef, useState } from "react";
import { errorAlert, successAlert } from "@/components/ToastGroup";

export interface LogoSettingProps {
    logoTitle: string;
    logoUrl: File | null;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/'

const LogoSetting = () => {
    const { adminData, setAdminData } = useData();

    const [previewImage, setPreviewImage] = useState<string | null>(adminData?.logoUrl ? (BACKEND_URL + adminData?.logoUrl) : null);

    const fileRef = useRef<HTMLInputElement>(null)

    const { register, watch, setValue, handleSubmit, reset } = useForm<LogoSettingProps>({
        defaultValues: {
            logoTitle: adminData?.logoTitle
        }
    });

    const onSubmit: SubmitHandler<LogoSettingProps> = async (_data) => {
        try {
            const formData = new FormData();
            formData.append('logoTitle', _data.logoTitle);
            if (_data.logoUrl) formData.append('logoUrl', _data.logoUrl);
            else if (previewImage === null) formData.append('logoRemoved', 'yes');
            const data = await updateLogoInfo(formData);
            setAdminData(data)
            successAlert('Update Logo Info Successfully')
        } catch {
            errorAlert('Failed to update logo info')
        }
    }

    const clearImage = () => {
        setValue("logoUrl", null);
        setPreviewImage(null)
    }

    const handleFileChange = (files: FileList | null) => {
        if (!files || files.length === 0) {
            console.error("No file selected");
            return;
        }

        setValue('logoUrl', files[0]);

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(files[0] as Blob);
    }

    const watchedValues = watch();

    const isDisabled =
        watchedValues.logoTitle === adminData?.logoTitle &&
        ((adminData?.logoUrl && previewImage === BACKEND_URL + adminData?.logoUrl) || (!adminData?.logoUrl && !previewImage))


    return (
        <div className="mx-auto my-2">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Logo
                        </h3>
                    </div>
                    <div className="p-7">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-2/3">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="logoTitle"
                                    >
                                        Logo Title
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        id="logoTitle"
                                        placeholder="velas"
                                        {...register('logoTitle')}
                                    />
                                </div>

                                <div className="w-full sm:w-1/3">
                                    <div
                                        id="FileUpload"
                                        className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                                    >
                                        <div className="h-full flex items-center gap-3">
                                            <div className="h-full w-auto rounded-full mx-auto flex items-center">
                                                {
                                                    previewImage &&
                                                    <div className="flex flex-col items-center group gap-4 justify-center hover:before:border hover:before:border-blue-1 rounded-xl hover:before:rounded-xl relative hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:bg-black hover:before:opacity-80 hover:before:w-full hover:before:h-full">
                                                        <Image
                                                            width={155}
                                                            height={168}
                                                            alt="Preview Image"
                                                            src={previewImage}
                                                            className="w-auto h-full object-cover rounded-xl ng-star-inserted"
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
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileRef}
                                            accept="image/*"
                                            className="hidden cursor-pointer p-0 opacity-0 outline-none"
                                            onChange={(e) => { handleFileChange(e.target.files); }}
                                        />
                                        {!previewImage &&
                                            <div className="flex flex-col items-center justify-center space-y-3 relative z-1 text-white" onClick={() => fileRef.current?.click()}>
                                                <span className="flex h-10 w-10 items-center justify-center rounded-full border">
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                                            fill="#3C50E0"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                                            fill="#3C50E0"
                                                        />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                                            fill="#3C50E0"
                                                        />
                                                    </svg>
                                                </span>
                                                <p>
                                                    <span className="text-primary">Click to upload</span> or
                                                    drag and drop
                                                </p>
                                                <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                                                <p>(max, 800 X 800px)</p>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4.5">
                                <button
                                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    type="button"
                                    onClick={() => {
                                        reset({
                                            logoTitle: adminData?.logoTitle,
                                            logoUrl: null
                                        })
                                        setPreviewImage(adminData?.logoUrl ? (BACKEND_URL + adminData?.logoUrl) : null)
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                                    type="submit"
                                    disabled={isDisabled}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogoSetting;