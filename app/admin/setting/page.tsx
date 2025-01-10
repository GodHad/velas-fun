import { Metadata } from "next";
import Setting from '@/components/Admin/Setting'

export const metadata: Metadata = {
    title: "BluePill Fun | Admin",
    description: "BluePill Fun Platform deploying memecoin",
};

const SettingDash = () => {
    return (
        <>
            <Setting />
        </>
    )
}

export default SettingDash;