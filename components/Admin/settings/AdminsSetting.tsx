'use client'
import { useState } from 'react';
import { updateAdmin } from '@/utils/api';
import { useData } from '@/contexts/PageContext';
import { errorAlert, successAlert } from '@/components/ToastGroup';

const AdminsSetting = () => {
    const { adminData, setAdminData } = useData();

    const [adminAddress, setAdminAddress] = useState<string>('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (adminData?.admin) {
            try {
                const data = await updateAdmin({ admin: [...adminData!.admin, adminAddress] });
                setAdminData(data);
                setAdminAddress('');
                successAlert('Update Admin Info successfully')
            } catch {
                errorAlert('Failed to update Admin Info')
            }
        }
    };

    const handleDelete = async (wallet: string) => {
        try {
            if (adminData?.admin) {
                const data = await updateAdmin({ admin: adminData.admin.filter(_admin => _admin !== wallet) });
                setAdminData(data);
                successAlert('Update Admin Info successfully')
            }
        } catch {
            errorAlert('Failed to update Admin Info')
        }
    };

    return (
        <div className="mx-auto my-2">
            <div className="col-span-5 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Admins
                        </h3>
                    </div>
                    <div className="p-7">
                        <div className='space-y-4'>
                            <form onSubmit={handleSubmit} className='space-y-2'>
                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="adminAddress"
                                    >
                                        Admin address
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        id="adminAddress"
                                        value={adminAddress}
                                        onChange={(e) => setAdminAddress(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                    type="submit"
                                >
                                    Add
                                </button>
                            </form>
                            <div className='mt-4'>
                                {adminData?.admin.map((admin) => (
                                    <div key={admin} className='border-b py-2 flex justify-between'>
                                        <h4 className='font-bold'>{admin}</h4>
                                        <button className="rounded-lg w-8 h-8 flex justify-center items-center transition-transform duration-300 ease-in-out transform group-hover:scale-110" onClick={() => {
                                            handleDelete(admin)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none"><path d="M2.02637 4H14.3689" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.65527 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9.7373 7.19971V11.9996" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.79785 4L3.56926 13.5997C3.56926 14.024 3.7318 14.431 4.02114 14.731C4.31047 15.0311 4.70289 15.1997 5.11207 15.1997H11.2833C11.6925 15.1997 12.0849 15.0311 12.3743 14.731C12.6636 14.431 12.8261 14.024 12.8261 13.5997L13.5975 4" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.02246 3.99971V1.59978C6.02246 1.38761 6.10373 1.18414 6.2484 1.03411C6.39307 0.884088 6.58928 0.799805 6.79387 0.799805H9.8795C10.0841 0.799805 10.2803 0.884088 10.425 1.03411C10.5696 1.18414 10.6509 1.38761 10.6509 1.59978V3.99971" stroke="#DA1E28" strokeWidth="1.02854" strokeLinecap="round" strokeLinejoin="round"></path>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminsSetting;
