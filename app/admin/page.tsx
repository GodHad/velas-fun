import { Metadata } from 'next';
import TotalBalance from '@/components/Admin/TotalBalance';
import TotalTransactions from '@/components/Admin/TotalTransactions';
import TopCoins from '@/components/Admin/TopCoins';
import Overview from '@/components/Admin/Overview';

export const metadata: Metadata = {
  title: "Velas Fun | Admin",
  description: "Velas Fun Platform deploying memecoin",
};

const AdminDashboard: React.FC = () => {
  return (
    <>
      <Overview />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TotalBalance />
        <TotalTransactions />
        <div className="col-span-12 xl:col-span-10">
          <TopCoins />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
