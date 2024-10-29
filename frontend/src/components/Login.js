import React from 'react';
import { useContract } from '../contexts/ContractContext';
import Connect from './Connect';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const {isConnected, contract, address, handleErrorMessage} = useContract();

    const isRegistered = async () => {
        if(isConnected) {
            
            const is_exist = await contract.isUserExists(address);
            if(is_exist) {
                navigate('/dashboard');
                return;
            } else {
                handleErrorMessage("Kindly register first");
                setTimeout(() => {
                    navigate('/register');
                }, 2000);
                return;
            }
        }
    }
    return <>
        <section className="page-header bg--cover" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/header/1.png)` }} >
            <div className="container">
            <div className="page-header__content" data-aos="" data-aos-duration="1000">
                <h2>Login</h2>
                <p>Login to your account</p>
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
                        <h2>Welcome back!</h2>
                        <p>Hey there! Ready to log in? Just click on connect to wallet and you'll be back in action
                        in no time. Let's go!</p>
                    </div>


                    <form action="#" className="account__form needs-validation">
                        <div className="row g-4">
                            <div className="col-12 col-md-12">
                              <div>
                                <label htmlFor="first-name" className="form-label">Wallet address</label>
                                <input className="form-control" value={address} readOnly type="text"  id='ref_id' placeholder="Ex. 0xC332d507A7b417e28Cd7720e1Cc985D0E8034C94" />
                              </div>
                            </div>
                        </div>

                        <h5 style={{marginTop: '10px'}}><Connect /></h5>
                        <button type="button" onClick={isRegistered} className="register_btn trk-btn trk-btn--border trk-btn--primary d-block mt-4">Connect your wallet</button>
                    </form>


                    <div className="account__switch">
                        <p>Don't have an account ? 
                            <Link to='/register'>
                                Register
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