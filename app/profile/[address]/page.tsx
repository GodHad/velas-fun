import Profile from "@/components/Profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BluePill Fun | Profile",
    description: "BluePill Fun Platform deploying memecoin",
  };  

export default function ProfilePage() {
    return (
        <>
            <Profile />
        </>
    )
}