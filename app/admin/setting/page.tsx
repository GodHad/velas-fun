import { Metadata } from "next";
import Setting from '@/components/Admin/Setting'

export const metadata: Metadata = {
    title: "Bluepill Fun | Admin",
    description: "Bluepill Fun Platform deploying memecoin",
};

const SettingDash = () => {
    return (
        <>
            <Setting />
        </>
    )
}

export default SettingDash;