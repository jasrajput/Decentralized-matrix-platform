import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'
const projectId = process.env.REACT_APP_PROJECT_ID;

export default function Connect() {
      const mainnet = {
        chainId: 97,
        name: 'Binance Smart Chain',
        currency: 'BNB',
        explorerUrl: 'https://testnet.bscscan.com/',
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
      }
      
      const metadata = {
        name: 'Uni Bank',
        description: 'Uni Bank is a 2x2 matrix-based crowdfunding platform built on Binance Smart Chain (BSC), designed to facilitate secure and efficient fund transfers and financial growth.',
        url: process.env.REACT_APP_DOMAIN_REF, 
        icons: [`${process.env.REACT_APP_DOMAIN_REF}/logo.png`]
      }
      
      const ethersConfig = defaultConfig({
        metadata,
        /*Optional*/
        enableEIP6963: true,
        enableInjected: true,
        enableCoinbase: true,
        rpcUrl: '...', // used for the Coinbase SDK
        defaultChainId: 97, // used for the Coinbase SDK
      })

      createWeb3Modal({
        ethersConfig,
        chains: [mainnet],
        projectId,
        tokens: {
          97: {
            address: '0x404d88e9338019967cee3574ea1e078121c290a4',
            image: 'https://tether.to/'
          }
        }
      })

      return (
        <w3m-button label='connect' balance={'show'} size={'md'} />
      )
}

