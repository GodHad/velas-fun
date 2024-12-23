import Web3 from "web3";
import { Web3Service, Contract } from "./Web3Service";
import VelasFunABI from '@/abi/VelasFunABI.json';
import MemecoinABI from '@/abi/MemecoinABI.json';
import { boughtTokens, createNewCoin, soldTokens } from "@/utils/api";
import { coinInfo } from "@/types";
import axios from "axios";

const PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
const JWT = process.env.NEXT_PUBLIC_PINATA_PRIVATE_JWT;

const VelasFunContract: Contract = {
    address: process.env.NEXT_PUBLIC_VELAS_ADDRESS || '',
    abi: VelasFunABI
}

const web3Service = Web3Service.getInstance();
const contract = web3Service.getContractInterface(VelasFunContract);

const uploadMetadata = async (data: coinInfo): Promise<any> => {
    const urlSeg = data.url.split('/');
    const url = `${PINATA_GATEWAY_URL}/${urlSeg[urlSeg.length - 1]}`;
    const metadata = {
        name: data.name,
        symbol: data.ticker,
        image: url,
        description: data.description,
        telegram: data.telegram,
        twitter: data.twitter,
        website: data.website,
    }

    try {
        const res = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
        })
        return res.data.IpfsHash
    } catch (error) {
        console.error('Error uploading metadata: ', error);
        return error;
    }
}

export const createToken = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: any,
    account: string,
    coin: coinInfo
) => {
    try {
        const web3 = new Web3(provider)
        const { name, ticker, description, url, twitter, telegram, website } = coin;
        const gasPrice = await web3.eth.getGasPrice()
        const metadataURI = await uploadMetadata(coin);
        const creationFee = await contract.methods.CREATION_FEE().call();
        const transaction: {
            from: string;
            to: string;
            value: any;
            data: any;
            gasPrice: string;
            gas?: bigint;
        } = {
            from: account,
            to: VelasFunContract.address,
            value: creationFee,
            data: contract.methods.createToken(name, ticker, description, url, twitter, telegram, website, metadataURI).encodeABI(),
            gasPrice: gasPrice.toString()
        }

        const gas = await web3.eth.estimateGas(transaction);

        transaction.gas = gas;

        const tx = await web3.eth.sendTransaction(transaction)
        await createNewCoin(tx.transactionHash.toString(), coin);
        return true;
    } catch (error) {
        console.error("Error is occurred:", error);
        return false;
    }
}

export const buyTokens = async (provider: any, account: string, token: string, amount: string) => {
    try {
        const web3 = new Web3(provider)
        const gasPrice = await web3.eth.getGasPrice();

        const transaction: {
            from: string;
            to: string;
            value: any;
            data: any;
            gasPrice: string;
            gas?: bigint;
        } = {
            from: account,
            to: VelasFunContract.address,
            value: web3.utils.toWei(amount, 'ether'),
            data: contract.methods.buyTokens(token, web3.utils.toWei(amount, 'ether')).encodeABI(),
            gasPrice: gasPrice.toString()
        }
        const gas = await web3.eth.estimateGas(transaction);
        transaction.gas = gas;

        const tx = await web3.eth.sendTransaction(transaction);
        await boughtTokens(tx.transactionHash.toString());
        await addTokenToMetaMask(provider, token);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const sellTokens = async (provider: any, account: string, token: string, amount: string) => {
    try {
        const web3 = new Web3(provider);
        const tokenContract = new web3.eth.Contract(MemecoinABI, token);
        const tokenAmount = Number(amount) * 1_000_000;
        const approveTransaction = tokenContract.methods.approve(VelasFunContract.address, tokenAmount);
        const approveGas = await approveTransaction.estimateGas({ from: account });
        const approveGasPrice = await web3.eth.getGasPrice();

        const approveTransactionData = {
            from: account,
            to: token,
            data: approveTransaction.encodeABI(),
            gasPrice: approveGasPrice,
            gas: approveGas,
        };

        const approveTx = await web3.eth.sendTransaction(approveTransactionData);
        const approvalMined = await waitForTransaction(approveTx.transactionHash as string, web3, 30000);
        if (!approvalMined) {
            console.error("Approval transaction is still pending or failed");
            return false;
        }

        await waitApprove(tokenContract, account, tokenAmount, 30000)

        const transaction: {
            from: string;
            to: string;
            data: any;
            gasPrice: string;
            gas?: bigint;
        } = {
            from: account,
            to: VelasFunContract.address,
            data: contract.methods.sellTokens(token, Number(amount) * 1_000_000).encodeABI(),
            gasPrice: (await web3.eth.getGasPrice()).toString()
        }

        const gas = await web3.eth.estimateGas(transaction);
        transaction.gas = gas;

        const tx = await web3.eth.sendTransaction(transaction);
        await soldTokens(tx.transactionHash.toString());
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getTokenAmount = async (provider: any, account: string, token: string): Promise<number> => {
    try {
        const web3 = new Web3(provider);
        const tokenContract = new web3.eth.Contract(MemecoinABI, token);

        const balance = await tokenContract.methods.balanceOf(account).call();

        const decimals = await tokenContract.methods.decimals().call();
        const tokenAmount = web3.utils.toBigInt(balance) / (web3.utils.toBigInt(10) ** (web3.utils.toBigInt(decimals)));
        return Number(tokenAmount);
    } catch (error) {
        console.error("Failed to get token balance: ", error);
        return 0;
    }
}

const addTokenToMetaMask = async (provider: any, tokenAddress: string) => {
    try {
        const addedTokens = JSON.parse(localStorage.getItem('addedTokens') || '[]');
        if (addedTokens.includes(tokenAddress)) {
            console.log(`${tokenAddress} is already added to MetaMask.`);
            return;
        }

        const success = await provider.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: tokenAddress,
                },
            },
        });

        if (success) {
            addedTokens.push(tokenAddress);
            localStorage.setItem('addedTokens', JSON.stringify(addedTokens));
        } else {
            console.log('Failed to add the token to MetaMask.');
        }
    } catch (error) {
        console.error('Error adding token to MetaMask', error);
    }
};

const waitForTransaction = async (txHash: string, web3: any, timeout = 300000): Promise<boolean> => {
    const start = Date.now();
    const pollInterval = 1000;

    while (Date.now() - start < timeout) {
        try {
            const receipt = await web3.eth.getTransactionReceipt(txHash);

            if (receipt) {
                return receipt.status;
            }
        } catch (error) {
            console.error(`Error checking transaction receipt: ${error}`);
        }

        await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    console.error("Transaction confirmation timed out.");
    return false;
};

const waitApprove = async (
    tokenContract: any,
    account: string,
    tokenAmount: number,
    timeout = 300000
): Promise<boolean> => {
    const start = Date.now();
    const pollInterval = 1000;

    while (Date.now() - start < timeout) {
        try {
            const allowance = await tokenContract.methods.allowance(account, VelasFunContract.address).call();
            if (Number(allowance) >= tokenAmount) {
                return true;
            }
        } catch (error) {
            console.error(`Error checking allowance: ${error}`);
        }

        await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    console.error("Approval confirmation timed out.");
    return false;
};

