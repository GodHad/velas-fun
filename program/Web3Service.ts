import Web3 from "web3";

export interface Contract {
    address: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abi: any;
}

const providerUrl = process.env.NEXT_PUBLIC_VELAS_PROVIDER_URL || 'https://evmexplorer.velas.com/rpc';

export class Web3Service {
    private static instance: Web3Service | null = null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public web3: any;

    private constructor() {
        this.web3 = new Web3(providerUrl);
    }

    public static getInstance(): Web3Service {
        if (!Web3Service.instance) {
            Web3Service.instance = new Web3Service();
        }

        return Web3Service.instance;
    }

    getContractInterface(contract: Contract) {
        return new this.web3.eth.Contract(contract.abi, contract.address);
    }
}