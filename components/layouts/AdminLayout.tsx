'use client'
import { useState, ReactNode, useContext, useEffect } from 'react';
import Header from '@/components/Admin/Header';
import Sidebar from '@/components/Admin/Sidebar';
import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import UserContext from '@/contexts/UserContext';
import { useData } from '@/contexts/PageContext';
import { getAdminData } from '@/utils/api';
import ErrorPage from '../Common/Error';

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useContext(UserContext)
    const { setAdminData } = useData()

    useEffect(() => {
        const handleGetData = async () => {
            if (user.admin) {
                const adminData = await getAdminData();
                setAdminData(adminData)
            }
        }

        handleGetData()
    }, [])

    if (!user || !user.admin) {
        return <ErrorPage />
    }

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
