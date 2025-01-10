import CreateToken from "@/components/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bluepill Fun | Create New Token",
  description: "Bluepill Fun Platform deploying memecoin",
};

const CreatePage = () => {
    return (
        <>
            <CreateToken />
        </>
    )
}

export default CreatePage;