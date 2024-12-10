import Profile from "@/components/Profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Velas Fun | Profile",
    description: "Velas Fun Platform deploying memecoin",
  };  

export default function ProfilePage() {
    return (
        <>
            <Profile />
        </>
    )
}