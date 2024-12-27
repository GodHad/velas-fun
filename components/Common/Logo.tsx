import { useData } from "@/contexts/PageContext";
import Link from "next/link"
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/'

const Logo = () => {
    const { metaData } = useData()
    return (
        <Link
            href="/"
            className={`header-logo w-full py-4 lg:py-2 flex items-center gap-3`}
        >
            {metaData?.logoUrl &&
                <Image
                    src={BACKEND_URL + metaData.logoUrl}
                    alt={'logo'}
                    width={60}
                    height={60}
                    className="w-10 h-10 rounded-b-lg object-cover z-0 left-0 top-0 blur-bg hover:scale-110 transition-[0.5]"
                />
            }
            <h1 className="text-[30px] font-extrabold">{metaData?.logoTitle || 'Velas'}</h1>
        </Link>
    )
}

export default Logo;