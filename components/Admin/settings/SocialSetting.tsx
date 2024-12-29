'use client'
import { useData } from "@/contexts/PageContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateAdmin } from "@/utils/api";
import { errorAlert, successAlert } from "@/components/ToastGroup";

export interface SocialSettingProps {
    facebook: string;
    youtube: string;
    twitter: string;
    linkedin: string;
}

const SocialSetting = () => {
    const { adminData, setAdminData } = useData();
    const { register, handleSubmit, reset, watch } = useForm<SocialSettingProps>({
        defaultValues: {
            facebook: adminData?.facebook,
            twitter: adminData?.twitter,
            youtube: adminData?.youtube,
            linkedin: adminData?.linkedin
        }
    });

    const onSubmit: SubmitHandler<SocialSettingProps> = async (_data) => {
        try {
            const data = await updateAdmin(_data)
            setAdminData(data)
            successAlert('Update Social Info Successfully')
        } catch {
            errorAlert('Failed to update social info')
        }
    }

    const watchedValues = watch();

    const isDisabled =
        watchedValues.facebook === adminData?.facebook &&
        watchedValues.twitter === adminData?.twitter &&
        watchedValues.youtube === adminData?.youtube &&
        watchedValues.linkedin === adminData?.linkedin;

    return (
        <div className="mx-auto my-2">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Social URLs
                        </h3>
                    </div>
                    <div className="p-7">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="facebook"
                                    >
                                        Facebook
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        id="facebook"
                                        {...register('facebook')}
                                    />
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="twitter"
                                    >
                                        X
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        id="twitter"
                                        {...register('twitter')}
                                    />
                                </div>
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="youtube"
                                    >
                                        YouTube
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        id="youtube"
                                        {...register('youtube')}
                                    />
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="linkedin"
                                    >
                                        LinkedIn
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        id="linkedin"
                                        {...register('linkedin')}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4.5">
                                <button
                                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    type="button"
                                    onClick={() => {
                                        reset({
                                            facebook: adminData?.facebook,
                                            youtube: adminData?.youtube,
                                            twitter: adminData?.twitter,
                                            linkedin: adminData?.linkedin,
                                        })
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                                    disabled={isDisabled}
                                    type="submit"
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

export default SocialSetting;