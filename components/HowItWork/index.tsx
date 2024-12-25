export default function HowItWork({showModal, setShowModal}: {showModal: boolean, setShowModal: (e: boolean) => void}) {
    return (
        <div
        className={`flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none overflow-x-hidden overflow-y-auto transition-all duration-150 ${showModal
          ? 'opacity-100 visible'
          : 'opacity-0 invisible'
          }`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl dark:bg-gray-dark dark:shadow-sticky-dark bg-white z-50">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <div className="modal-content">
                <h2 className="text-center mb-3 text-[20px] font-semibold">How It Works</h2>
                <p className="m-[15px] font-medium">Velas prevents rugs by making sure that all created tokens are safe. Each coin on a velas is a fair-launch with no presale and no team allocation.</p>
                <p className="m-[15px] font-medium">Step 1: pick a coin that you like</p>
                <p className="m-[15px] font-medium">Step 2: buy the coin on the bonding curve</p>
                <p className="m-[15px] font-medium">Step 3: sell at any time to lock in your profits or losses</p>
                <p className="m-[15px] font-medium">Step 4: when enough people buy on the bonding curve it reaches a market cap of $69k</p>
                <p className="m-[15px] font-medium">Step 5: $12k of liquidity is then deposited in Wagyu Dex and burned</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full absolute opacity-50 bg-black z-40" onClick={() => setShowModal(false)}></div>
      </div>
    )
}