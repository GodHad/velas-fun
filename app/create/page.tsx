import CreateToken from "@/components/Create";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Velas Fun | Create New Token",
  description: "Velas Fun Platform deploying memecoin",
};

const CreatePage = () => {
    return (
        <>
            <CreateToken />
        </>
    )
}

export default CreatePage;