import React, { useRef, useState, useEffect } from 'react';
import {  ethers } from 'ethers'
import { useContract } from '../contexts/ContractContext';
import Connect from './Connect';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const ref = useRef(null);
    const [referralId, setReferralId] = useState('');
    const navigate = useNavigate();
    const {isConnected, contract, balance, usdtBalance, address, handleSuccessMessage, handleErrorMessage} = useContract();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('ref_code');
        if (id) {
          setReferralId(id);
        }
      }, []);

      useEffect(() => {
        if (ref.current) {
          ref.current.value = referralId;
        }
      }, [referralId]);
    

    const isRegistered = async () => {
        const ref_id = ref.current?.value;
        
        if(isConnected) {
            
            const is_exist = await contract.isUserExists(address);
            if(is_exist) {
                handleErrorMessage("Account already registered");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                return;
            }

            const referral_address = await contract.idToAddress(ref_id);

            if(referral_address == "0x0000000000000000000000000000000000000000") return handleErrorMessage('No such referral');

            if(usdtBalance >= 1) {
                const isValid = ethers.utils.isAddress(referral_address);
                if(isValid) {
                    try {
                        const tx = await contract.registrationExt(referral_address, {
                            from: address
                        });
    
                        const receipt = await tx.wait();
                        if (receipt) {
                            handleSuccessMessage("Registration successful");
                            navigate('/dashboard');
                            return;
                        }
                    } catch(er) {
                        handleErrorMessage(er.message);
                    }
                }
            } else {
                handleErrorMessage("Insufficient USDT Balance");
            }
        }
    }
    const register = () => {
        isRegistered();
    }
    return <>
        <section className="page-header bg--cover" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/header/1.png)` }} >
        
            <div className="container">
            <div className="page-header__content" data-aos="" data-aos-duration="1000">
                <h2>Register</h2>
                <p>Create your account</p>
            </div>
            <div className="page-header__shape">
                <span className="page-header__shape-item page-header__shape-item--1"><img src="assets/images/header/2.png"
                    alt="shape-icon"/></span>
            </div>
            </div>
        </section>


        <section className="account padding-top padding-bottom sec-bg-color2">
            <div className="container">
                <div className='text-center'>
                    <img className="light" src="/logo.png" style={{height: '180px'}} alt="" />
                </div>
                <div className="account__wrapper mt-3" data-aos="" data-aos-duration="800">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="account__content account__content--style1">
                            <div className="account__header">
                                <h2>Create Your Account</h2>
                                <p>Hey there! Ready to join our matrix? We just need a Referral ID from you to get started. Let's do
                                this!</p>
                            </div>


                            <form action="#" className="account__form needs-validation">
                                <div className="row g-1">
                                    <div className="col-12 col-md-12">
                                        <div>
                                            <label htmlFor="first-name" className="form-label">Referral ID</label>
                                            <input ref={ref} className="form-control" type="text"  id='ref_id' defaultValue={referralId} placeholder="Ex. 1300028" />
                                        </div>
                                    </div>
                                </div>

                                <h5 style={{marginTop: '10px'}}><Connect /></h5>
                                <button type="button" onClick={register} className="register_btn trk-btn trk-btn--border trk-btn--primary d-block mt-4">Sign Up</button>
                            </form>


                            <div className="account__switch">
                                <p>Already have an account ? 
                                <Link to='/login'>
                                    Login
                                </Link>
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="account__shape">
            <span className="account__shape-item account__shape-item--1"><img src="assets/images/contact/4.png"
                alt="shape-icon"/></span>
            </div>
        </section>
    </>
}