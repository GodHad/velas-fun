'use client'
import { useData } from "@/contexts/PageContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateAdmin } from "@/utils/api";
import { errorAlert, successAlert } from "@/components/ToastGroup";

export interface FooterSettingProps {
    footerContent: string;
}

const FooterSetting = () => {
    const { adminData, setAdminData } = useData();
    const { watch, register, handleSubmit, reset } = useForm<FooterSettingProps>({
        defaultValues: {
            footerContent: adminData?.footerContent
        }
    });

    const onSubmit: SubmitHandler<FooterSettingProps> = async (_data) => {
        try {
            const data = await updateAdmin(_data)
            setAdminData(data)
            successAlert('Update Footer Info Successfully')
        } catch {
            errorAlert('Failed to update footer info')
        }
    }

    const watchedValues = watch();

    const isDisabled = watchedValues.footerContent === adminData?.footerContent
       
    return (
        <div className="mx-auto my-2">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Footer
                        </h3>
                    </div>
                    <div className="p-7">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="footerContent"
                                >
                                    Footer Content
                                </label>
                                <textarea
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    id="footerContent"
                                    rows={6}
                                    placeholder="Velas Fun"
                                    {...register('footerContent')}
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-4.5">
                                <button
                                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    type="button"
                                    onClick={() => {
                                        reset({
                                            footerContent: adminData?.footerContent
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

export default FooterSetting;