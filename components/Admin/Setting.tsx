const Setting = () => {
    return (
        <>
            <div className="mx-auto">
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Setting
                            </h3>
                        </div>
                        <div className="p-7">
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
                                        name="creationFee"
                                        id="creationFee"
                                    />
                                </div>

                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="txFee"
                                    >
                                        Transaction Fee(%)
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="number"
                                        name="txFee"
                                        id="txFee"
                                        min={0}
                                        max={100}
                                    />
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
                                    name="feeAddress"
                                    id="feeAddress"
                                    placeholder="0x1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                                />
                            </div>

                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="maxBalance"
                            >
                                Maximum Available Withdraw Balance: 100000 VLX
                            </label>
                            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row items-center">
                                <div className="w-full sm:w-1/2">
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="number"
                                        name="maxBalance"
                                        id="maxBalance"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <button
                                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                    >
                                        Withdraw
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setting;
