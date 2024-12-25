import Image from "next/image";

type BRAND = {
    name: string;
    image: string;
    holders: number;
    marketcap: string;
    transactions: number;
    price: number;
};

const brandData: BRAND[] = [
    {
        name: 'Doge',
        image: 'https://violet-able-landfowl-471.mypinata.cloud/ipfs/QmPszmMVo7spEqekDssgdmRZtRTNbSenysQ4qrJD2J6pNW',
        holders: 3.5,
        marketcap: '5,768',
        transactions: 590,
        price: 4.8,
    },
    {
        name: 'Doge',
        image: 'https://violet-able-landfowl-471.mypinata.cloud/ipfs/QmPszmMVo7spEqekDssgdmRZtRTNbSenysQ4qrJD2J6pNW',
        holders: 2.2,
        marketcap: '4,635',
        transactions: 467,
        price: 4.3,
    },
    {
        name: 'Doge',
        image: 'https://violet-able-landfowl-471.mypinata.cloud/ipfs/QmPszmMVo7spEqekDssgdmRZtRTNbSenysQ4qrJD2J6pNW',
        holders: 2.1,
        marketcap: '4,290',
        transactions: 420,
        price: 3.7,
    },
    {
        name: 'Doge',
        image: 'https://violet-able-landfowl-471.mypinata.cloud/ipfs/QmPszmMVo7spEqekDssgdmRZtRTNbSenysQ4qrJD2J6pNW',
        holders: 1.5,
        marketcap: '3,580',
        transactions: 389,
        price: 2.5,
    },
    {
        name: 'Doge',
        image: 'https://violet-able-landfowl-471.mypinata.cloud/ipfs/QmPszmMVo7spEqekDssgdmRZtRTNbSenysQ4qrJD2J6pNW',
        holders: 3.5,
        marketcap: '6,768',
        transactions: 390,
        price: 4.2,
    },
];

const TableOne = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Top Coins
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm  dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Coin
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Holders
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Market Cap
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Price
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Transactions
                        </h5>
                    </div>
                </div>

                {brandData.map((brand, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === brandData.length - 1
                            ? ''
                            : 'border-b border-stroke dark:border-strokedark'
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex-shrink-0">
                                <Image className="rounded-full" src={brand.image} alt="Brand" width={48} height={48} />
                            </div>
                            <p className="hidden text-black dark:text-white sm:block">
                                {brand.name}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{brand.holders}K</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-5">{brand.price}%</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">${brand.marketcap}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{brand.transactions}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TableOne;
