import Profile from "@/components/Profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bluepill Fun | Profile",
    description: "Bluepill Fun Platform deploying memecoin",
  };  

export default function ProfilePage() {
    return (
        <>
            <Profile />
        </>
    )
}