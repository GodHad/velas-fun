import Terms from "@/components/Terms";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bluepill Fun | Terms",
    description: "Terms of Bluepill Fun Platform deploying memecoin",
};

const TermsPage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between pt-[40px] md:pt-[50px] xl:pt-[60px] 2xl:pt-[70px] dark:bg-gray-dark bg-white">
            <div className="container mx-auto px-6 py-16 sm:px-8">
                <Terms />
            </div>
        </main>
    )
}

export default TermsPage;