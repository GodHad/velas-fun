'use client'
import { useData } from "@/contexts/PageContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateAdmin } from "@/utils/api";
import { errorAlert, successAlert } from "@/components/ToastGroup";
import { updateConstantVariables } from "@/program/VelasFunContractService";
import { useWeb3React } from "@web3-react/core";
import { hooks } from "@/connectors/metaMask";

export interface ContractVariable {
    creationFee: number;
    creatorReward: number;
    feePercent: number;
    feeAddress: string;
    velasFunReward: number;
}

const Variables = () => {
    const { adminData, setAdminData } = useData();
    const { connector } = useWeb3React();
    const { useAccount } = hooks;

    const account = useAccount();

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ContractVariable>({
        defaultValues: {
            creationFee: adminData?.creationFee,
            creatorReward: adminData?.creatorReward,
            feePercent: adminData?.feePercent,
            feeAddress: adminData?.feeAddress,
            velasFunReward: adminData?.velasFunReward
        }
    });

    const onSubmit: SubmitHandler<ContractVariable> = async (_data) => {
        try {
            handleUpdate(_data)
        } catch {
            errorAlert('Failed to update variables')
        }
    }

    const watchedValues = watch();

    const isDisabled =
        watchedValues.creationFee === adminData?.creationFee &&
        watchedValues.creatorReward === adminData?.creatorReward &&
        watchedValues.feePercent === adminData?.feePercent &&
        watchedValues.velasFunReward === adminData?.velasFunReward &&
        watchedValues.feeAddress === adminData?.feeAddress

    const handleUpdate = async (_data: ContractVariable) => {
        if (!connector.provider || !account) {
            errorAlert('Please connect your wallet');
            return;
        }

        if (!adminData?.admin || adminData.admin.length === 0) {
            errorAlert('Admin data is required.');
            return;
        }

        if (!adminData.feeAddress) {
            errorAlert('Fee Address is required.');
            return;
        }

        try {
            const result = await updateConstantVariables(
                connector.provider,
                account,
                adminData.siteKill,
                adminData.admin,
                _data.creationFee || 0,
                _data.feePercent || 0,
                _data.creatorReward || 0,
                _data.velasFunReward || 0,
                _data.feeAddress
            );

            if (result) {
                const data = await updateAdmin(_data)
                setAdminData(data)
                successAlert('Update Variables Successfully')
            } else {
                throw new Error('Failed to update variables');
            }
        } catch {
            errorAlert('Failed to update variables')
        }
    };

    return (
        <div className="mx-auto my-2">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Variables
                        </h3>
                    </div>
                    <div className="p-7">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="creationFee"
                                    >
                                        Creation Fee(VLX)
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="number"
                                        id="creationFee"
                                        {...register('creationFee', {
                                            min: { value: 1, message: 'Creation Fee can\'t be lower than 1' },
                                            required: 'Creation Fee is required'
                                        })}
                                    />
                                    {errors.creationFee && <p className="text-red-600">{errors.creationFee.message}</p>}
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="feePercent"
                                    >
                                        Transaction Fee(%)
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="number"
                                        id="feePercent"
                                        {...register('feePercent', {
                                            required: 'Fee Percent is required',
                                            max: { value: 100, message: 'Fee Percent can\'t be higher than 100' },
                                            min: { value: 1, message: 'Fee Percent can\'t be lower than 1' },
                                        })}
                                    />
                                    {errors.feePercent && <p className="text-red-600">{errors.feePercent.message}</p>}
                                </div>
                            </div>

                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="creatorReward"
                                    >
                                        Creator Reward(VLX)
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="number"
                                        id="creatorReward"
                                        {...register('creatorReward', {
                                            required: 'Creator Reward is required',
                                            min: { value: 0, message: 'Creator Reward can\'t be lower than 0' },
                                        })}
                                    />
                                    {errors.creatorReward && <p className="text-red-600">{errors.creatorReward.message}</p>}
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="velasFunReward"
                                    >
                                        VelasFun Reward(VLX)
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="number"
                                        id="velasFunReward"
                                        {...register('velasFunReward', {
                                            min: { value: 0, message: 'Velas Fun Reward can\'t be lower than 0' },
                                            required: 'Velas Fun Reward is required'
                                        })}
                                    />
                                    {errors.velasFunReward && <p className="text-red-600">{errors.velasFunReward.message}</p>}
                                </div>
                            </div>

                            <div className="mb-5.5">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="feeAddress"
                                >
                                    Fee Address
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    id="feeAddress"
                                    placeholder="0x1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                                    {...register('feeAddress', { required: 'Fee Address is required' })}
                                />
                                {errors.feeAddress && <p className="text-red-600">{errors.feeAddress.message}</p>}
                            </div>

                            <div className="flex justify-end gap-4.5">
                                <button
                                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    type="button"
                                    onClick={() => {
                                        reset({
                                            creationFee: adminData?.creationFee,
                                            creatorReward: adminData?.creatorReward,
                                            feePercent: adminData?.feePercent,
                                            velasFunReward: adminData?.velasFunReward,
                                            feeAddress: adminData?.feeAddress,
                                        })
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

export default Variables;