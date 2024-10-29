import React, { useState, useEffect, useRef } from 'react';
import {  ethers } from 'ethers'
import Select from 'react-select'
import { useContract } from '../contexts/ContractContext';
import Loader from './Loader';


const options = [
  { value: '1', label: '$20', price: '20' },
  { value: '2', label: '$50', price: '50' },
  { value: '3', label: '$100', price: '100' },
  { value: '4', label: '$200', price: '200' },
  { value: '5', label: '$500', price: '500' },
  { value: '6', label: '$1000', price: '1000' },
  { value: '7', label: '$2000', price: '2000' },
  { value: '8', label: '$5000', price: '5000' },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#1B2D29',
    borderColor: '#DCDFE833',
    padding: '13px 20px',
    borderRadius: '8px',
    color: '#FFFFFF',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#FFFFFF',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1B2D29',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1B2D29' : '#1B2D29',
    color: '#FFFFFF',
  }),
};

export default function Invest() {
  const {isConnected, contract, usdtBalance, signer, usdtContract, handleSuccessMessage, handleErrorMessage, address, tokenBalance, tokenContract} = useContract();
  const [level, setLevel] = useState('');
  const [levelAmount, setLevelAmount] = useState('');
  const [choice, setChoice] = useState('');
  const [referralId, setReferralId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('ref_code');
    if (id) {
      setReferralId(id);
    }
  }, []);

  const buyNewLottery = async () => {
    try {
      if(!isConnected) {
        return handleErrorMessage("Account is not connected");
      }
      if (!levelAmount) {
        return handleErrorMessage("Package must be selected");
      }

      let balance;

      if(choice == 0) {
        balance = usdtBalance;
      } else if(choice == 1) {
        balance = tokenBalance;
      } else {
        return handleErrorMessage("Invalid choice");
      }
      

      let referral_address = "";
      const is_exist = await contract.isUserExists(address);
      if(is_exist) {
        const result = await contract.users(address);
        referral_address = result.referrer.toString();
      } else {
        if(referralId) {
          referral_address = await contract.idToAddress(referralId);
        } else {
          return handleErrorMessage('Referral required');
        }
      }
      if(referral_address == "0x0000000000000000000000000000000000000000") return handleErrorMessage('No such referral');
      const isValid = ethers.utils.isAddress(referral_address);

      if(isValid) {
        const depositAmount = ethers.utils.parseUnits(levelAmount.toString(), 18);

        if (parseFloat(balance) >= parseFloat(ethers.utils.formatUnits(depositAmount, 18))) {
          let selectionToken;
          if(choice == 0) {
            selectionToken = usdtContract;
          } else {
            selectionToken = tokenContract;
          }

          const totalApprove = await selectionToken.allowance(await signer.getAddress(), process.env.REACT_APP_CONTRACT_ADDRESS);
            
          if (totalApprove.lt(depositAmount)) {
            const approveTx = await selectionToken.approve(process.env.REACT_APP_CONTRACT_ADDRESS, depositAmount);
            setLoading(true);
            await approveTx.wait();
          }

          setLoading(false);
          
          const buyTx = await contract.buyNewLevel(referral_address, level, choice, {
            from: address
          });

          setLoading(true);
          await buyTx.wait();
          setLoading(false);
          
          handleSuccessMessage("Package purchased successfully");
        } else {
          handleErrorMessage("Balance Insufficient");
        }
      }
    } catch (err) {
      console.error(err.message);
      handleErrorMessage(err.message);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setLevel(selectedOption.value);
    setLevelAmount(selectedOption.price);
  };

  const handleSelection = (selectedOption) => {
    setChoice(selectedOption.target.value);
  }

    return <>
        {
          loading ? <Loader /> : (
            <section className="account padding-top padding-bottom sec-bg-color2" style={{paddingTop: '40px'}} id="invest">
              <div className="container">
                <div className="account__wrapper" >
                  <div className="row g-4 d-flex justify-content-center">
                    <div className="col-12 col-md-7">
                      <div className="account__content account__content--style1">

                        <div className="account__header text-center">
                          <div className="about__content-inner">
                          <h2>INVEST <span>USDT</span></h2>
                          <p>Experience Seamless Transactions and Achieve Greater Returns with Confidence. Start Growing Your Assets Now!</p>
                          </div>
                        </div>
                        
                        <form action="#" className="account__form needs-validation">
                          <div className="row">
                            <div className="col-6">
                              <div>
                                <label htmlFor="first-name" className="form-label">USDT Balance</label>
                                <input className="form-control busd_balance" type="text" value={usdtBalance ? usdtBalance : '0.00'} readOnly  placeholder="Available balance" /> 
                              </div>
                            </div>

                            <div className="col-6">
                              <div>
                                <label htmlFor="first-name" className="form-label">Token Balance</label>
                                <input className="form-control busd_balance" type="text" value={tokenBalance ? tokenBalance : '0.00'} readOnly  placeholder="Available balance" /> 
                              </div>
                            </div>
                            <div className="col-12 mt-4">
                              <div>
                                <label htmlFor="last-name" className="form-label">Select Choice</label>
                               <select className='form-control' onChange={handleSelection} value={choice}>
                                  <option value='' disabled>Select</option>
                                  <option value='0'>USDT</option>
                                  <option value='1'>Token</option>
                               </select>
                              </div>
                            </div>

                            <div className="col-12 mt-4">
                              <div>
                                <label htmlFor="last-name" className="form-label">Amount to Invest</label>
                                <Select 
                                  styles={customStyles}
                                  options={options} 
                                  onChange={handleSelectChange} 
                                  getOptionLabel={(option) => option.label} 
                                  getOptionValue={(option) => option.value} 
                                />
                              </div>
                            </div>
                          </div>
                          <button type="button" onClick={buyNewLottery}  className="trk-btn trk-btn--border trk-btn--primary d-block mt-4">Invest</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="account__shape">
                <span className="account__shape-item account__shape-item--1"><img src="/assets/images/contact/4.png"
                    alt="shape-icon" /></span>
              </div>
          </section>
          )
        }
    </>
}
