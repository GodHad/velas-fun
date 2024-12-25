import { Metadata } from "next";
import Setting from '@/components/Admin/Setting'

export const metadata: Metadata = {
    title: "Velas Fun | Admin",
    description: "Velas Fun Platform deploying memecoin",
};

const SettingDash = () => {
    return (
        <>
            <Setting />
        </>
    )
}

export default SettingDash;