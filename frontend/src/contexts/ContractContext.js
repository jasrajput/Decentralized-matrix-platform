import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import contractABI from '../abi/contractABI.json';
import usdtABI from '../abi/usdtABI.json';
import tokenABI from '../abi/tokenABI.json';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const usdtAddress = process.env.REACT_APP_USDT_CONTRACT_ADDRESS;
const tokenAddress = process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS;

const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    const [usdtContract, setUsdtContract] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);
    const [balance, setBalance] = useState('');
    const [signer, setSigner] = useState('');
    const [usdtBalance, setUsdtBalance] = useState('');
    const [tokenBalance, setTokenBalance] = useState('');
    const { address: defaultAddress, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [activeAddress, setActiveAddress] = useState(defaultAddress);


  const handleSuccessMessage = (message) => {
    const customId = "success";
    toast.success(message, {
      position: "top-center",
      theme: "dark",
      toastId: customId
    });
  };

  const handleErrorMessage = (message) => {
    const customId = "error";
    toast.error(message, {
      position: "top-center",
      theme: "dark",
      toastId: customId
    }); 
  }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('view_id');
        if (id) {
            setActiveAddress(id); // Set activeAddress to view_id for testing.
        } else {
            setActiveAddress(defaultAddress); // Use default address if no view_id exists on that
        }
    }, [defaultAddress]);

    useEffect(() => {
        const initializeContract = async () => {
            try {
                if (isConnected && activeAddress) {
                    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
                    const signerObj = ethersProvider.getSigner();
                    const balance = await ethersProvider.getBalance(activeAddress);
                    const etherBalance = ethers.utils.formatEther(balance);
                    const usdtContract = new ethers.Contract(usdtAddress, usdtABI, signerObj);
                    const bal = await usdtContract.balanceOf(activeAddress);
                    const usdtBalance = ethers.utils.formatEther(bal);

                    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signerObj);
                    const tBal = await tokenContract.balanceOf(activeAddress);
                    const tokenBalance = ethers.utils.formatEther(tBal);

                    const contract = new ethers.Contract(contractAddress, contractABI, signerObj);

                    setContract(contract);
                    setUsdtContract(usdtContract);
                    setTokenContract(tokenContract);
                    setBalance(etherBalance);
                    setUsdtBalance(usdtBalance);
                    setTokenBalance(tokenBalance);
                    setSigner(signerObj);
                }
            } catch (error) {
                return error.message;
            }
        };

        if (walletProvider?.on) {
            // Handle account changes
            walletProvider.on('accountsChanged', (accounts) => {
                console.log('Account changed:', accounts[0]);
                setActiveAddress(accounts[0]); // Update address when account changes
                initializeContract();
            });
        }

        initializeContract();

        return () => {
            if (walletProvider?.removeListener) {
                walletProvider.removeListener('accountsChanged', initializeContract);
            }
        };
    }, [activeAddress, isConnected, walletProvider]);

    return (
        <ContractContext.Provider value={{ isConnected, contract, balance, usdtBalance, address: activeAddress, signer, usdtContract,tokenBalance, tokenContract, handleSuccessMessage, handleErrorMessage }}>
            <ToastContainer />
            {children}
        </ContractContext.Provider>
    );
};

export const useContract = () => {
    return useContext(ContractContext);
};