import CreateToken from "@/components/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BluePill Fun | Create New Token",
  description: "BluePill Fun Platform deploying memecoin",
};

const CreatePage = () => {
    return (
        <>
            <CreateToken />
        </>
    )
}

export default CreatePage;