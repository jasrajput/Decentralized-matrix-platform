import React, { useEffect, useState } from 'react';
import {  ethers } from 'ethers'
import { useContract } from '../contexts/ContractContext';
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

export default function Dashboard() {
  const {isConnected, contract, balance, usdtBalance, address} = useContract();
  const [levelsData, setLevelsData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [contractInfo, setContractInfo] = useState({});
  const [eventData, setEventData] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {

    async function getEvents() {
      const { id } = await addressToID(contract, address);
      const response = await fetch(`${process.env.REACT_APP_DOMAIN}/api/events/all`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: id.toString()
        })
      });

      if(!response.ok) {
        return response.error;
      }

      const events = await response.json();
      const eventData = events.data;
      setEventData(eventData);
    }


    async function addressToID(contract, address) {
      if (ethers.utils.isAddress(address)) {
          return await contract.users(address);
        } else {
            return 0;
        }
    }

    async function getUserInfo() {
      if(isConnected) {
        try {
            const result = await contract.users(address);
            const userInfoData = {
              id: result.id.toString(),
              upline: result.referrer.toString(),
              partners: ethers.utils.formatUnits(result.partnersCount, 0),
              activePartnersCount: ethers.utils.formatUnits(result.activePartnersCount, 0),
              downline: ethers.utils.formatUnits(result.totalTeamCount, 0),
              withdrawn: ethers.utils.formatUnits(result.withdrawn, 18),
              direct_business: ethers.utils.formatUnits(result.direct_business, 18),
              downline_business: ethers.utils.formatUnits(result.downline_business, 18),
              accBlocked: result.accBlocked,
              referLink: `${process.env.REACT_APP_DOMAIN_REF}/dashboard?ref_code=${result.id.toString()}`
          };

          setUserInfo(userInfoData);

          let lastLevel = 8;
          let levels = [];

          for (let level = 1; level <= lastLevel; level++) {
            let response = await contract.usersActiveX6Levels(address, level);
            let userData = await contract.usersInfo(address, level);
            let memberOnLevel = userData[0];
            let x6Matrix = await contract.usersX6Matrix(address, level);
          
            let reinvestCount = x6Matrix[5];
            let lotteryPrice = [20, 50, 100, 200, 500, 1000, 2000, 5000][level - 1] || 0;
          
            if (response) {
              let showDataRequired = [];
              let referrals = x6Matrix[1];
              for (let j = 0; j <= 1; j++) {
                const referral = referrals[j] || '';
                const { id } = await addressToID(contract, referral);
                showDataRequired[j] = id;
              }
           
              let showDataRequired2 = [];
              let referrals2 = x6Matrix[2];
              for (let k = 0; k <= 3; k++) {
                const referralSecondLevel = referrals2[k] || '';
                const { id } = await addressToID(contract, referralSecondLevel);
                showDataRequired2[k] = id;
              }
                    
              levels.push({
                level,
                dataX4: showDataRequired,
                dataX4SecondLevel: showDataRequired2,
                memberOnLevel,
                reinvestCount,
                lotteryPrice,
                isRetopupRequired: x6Matrix[3]
              });
            }
          }

          setLevelsData(levels);

          const contract_info = await contract.contractInfo();
          const contractInfoData = {
            totalDeposited: ethers.utils.formatUnits(contract_info.totalDeposited, 18),
            totalWithdrawal: ethers.utils.formatUnits(contract_info.totalWithdrawal, 18),
          }

          setContractInfo(contractInfoData);

        } catch (err) {
          return err.message;
        }
      }
    }

    async function fetchData() {
      try {
        await getEvents();
        await getUserInfo();
      } catch (err) {
        return err.message;
      }
    }
    fetchData();

  }, [isConnected, contract, address]);

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(userInfo?.referLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    });
  };

  var alertMessage;
  if(levelsData.length >= 1) {
    const levelsRequiringTopUp = levelsData
    ?.map((item, index) => (item.isRetopupRequired ? index + 1 : null))
    .filter(level => level !== null);

    alertMessage = levelsRequiringTopUp.length > 0 
    ? ` for matrix ${levelsRequiringTopUp.join(', ')}`
    : '';
  } else {
    alertMessage = '';
  }

    return <>
        <section className="service padding-top padding-bottom " id="dashboard">
        <div className="section-header section-header--max50">
          <h2 className="mb-10 mt-minus-5"><span>User </span>Dashboard</h2>
          <p>Effortlessly Manage Your Investments and Track Your Progress with Intuitive Tools and Real-Time Insights. Optimize Your Experience Today!</p>
        </div>

        
        
        <div className="container mt-5">
        {
          userInfo?.accBlocked && (
            <Alert variant="danger" dismissible>
              <Alert.Heading>Account Suspended</Alert.Heading>
              <p>Your account has been suspended due to the absence of two direct members.</p>
            </Alert>
          )
        }

        {
          alertMessage && (
            <Alert variant="danger" dismissible>
              <Alert.Heading>Re top-up Required {alertMessage}</Alert.Heading>
              <p>To continue receiving income, please top up your account.</p>
            </Alert>
          )
        }



          <div className="account__content account__content--style3">
          <div className="row mt-3">
            <div className="col-lg-12 col-md-12">
              <div className="heading-area">
                <h5 className="sub-title text-custom">
                  <span>Member ID - <span className='text-custom' id='user_id'>{userInfo.id ? userInfo.id : '0'}</span></span>
                </h5>
                
                <h5 className="sub-title text-custom">
                    Your Affiliate Link
                </h5>
              </div>
        
              <div className="input-group">
                <input type="text" className='form-control' id='referral_link' value={userInfo?.referLink} readOnly />
                <div className="input-group-append">
                    <button className="trk-btn trk-btn--border trk-btn--primary"  type="button" onClick={handleCopyReferralLink}>
                    <span>
                      <i style={{ fontSize: '18px' }} className="fas fa-copy"></i>
                    </span>
                    {copied && <span style={{ marginLeft: '10px' }}>Copied!</span>}
                  </button>
                </div>
              </div>
              <div className="heading-area mt-4">
                <h5 className="sub-title text-custom">
                  Wallet Address
                </h5>
              </div>
              <div className="input-group">
                <input type="text" className='form-control' id='wallet_address' value={address} readOnly />
                <div className="input-group-append">
                  <button className="trk-btn trk-btn--border trk-btn--primary"  type="button" onClick={handleCopyAddress}>
                    <span><i  style={{fontSize: '18px'}} className="fas fa-copy"></i></span>
                    {copiedAddress && <span style={{ marginLeft: '10px' }}>Copied!</span>}
                  </button>
                </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
          
        <div className="container mt-5">
          <div className="service__wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-sm-12 col-md-12 col-12 col-lg-6">
                  <div className="account__content account__content--style3">
                    <h3 className='text-center'>Portfolio</h3>
                    <div className='card-body text-center'>
                        <div className="d-lg-flex justify-content-lg-between">
                            <div className='wallet'>
                                <p>Upline Address</p>
                            </div>
                            <div>
                                <p>
                                    <a id='upline' href='' className='upline'>
                                      {userInfo.upline && userInfo.upline.replace(userInfo.upline.substring(5, 38), "***")}
                                    </a>
                                </p>
                            </div>
                        </div>
                    
                        <div className="d-lg-flex justify-content-lg-between">
                            <div className='wallet'>
                                <p>BNB Balance</p>
                            </div>
                            <div>
                                <span className='bnb_balance'>{parseFloat(balance).toFixed(4)}</span>
                                <span> BNB</span>
                            </div>
                        </div>
                        
                        <div className="d-lg-flex justify-content-lg-between">
                            <div className='wallet'>
                                <p>USDT Balance</p>
                            </div>
                            <div>
                                <p>
                                    <span>$</span><span id='busd_balance'>{usdtBalance ? usdtBalance : '0.00' }</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className='text-center'>
                            <button onClick={handleCopyReferralLink} className="trk-btn trk-btn--border trk-btn--primary d-block refer_btn">
                                <span className='text-center'>
                                    <i className='fa fa-user-plus'></i>
                                    
                                    {copied ? <span style={{ marginLeft: '10px' }}>Copied!</span> : 
                                    <span style={{marginLeft: '10px'}}>Invitation Link</span>}
                                </span>
                            </button>
                        </div>
                    </div>
                  </div>
              </div>


              <div className="col-sm-12 col-md-12 col-12 col-lg-6">
                <div className="account__content account__content--style3">
                    <center><h3>Contract Details</h3></center>
                    <div className='card-body text-center'>
                        <div className="d-lg-flex justify-content-lg-between">
                          <div className='wallet'>
                              <p>Contract Address</p>
                          </div>
                          <div>
                              <p>
                                  {process.env.REACT_APP_CONTRACT_ADDRESS.replace(process.env.REACT_APP_CONTRACT_ADDRESS.substring(5, 38), "***")}
                              </p>
                          </div>
                        </div>
                      <div className="d-lg-flex justify-content-lg-between">
                            <div className='wallet'>
                                <p>Total amount in Pool</p>
                            </div>
                            <div>
                                <p>
                                    $<span>{contractInfo.totalDeposited ?  contractInfo.totalDeposited : '0.00'}</span>
                                </p>
                            </div>
                        </div>
                        <div className="d-lg-flex justify-content-lg-between">
                            <div className='wallet'>
                                <p>Total Withdraw from Pool</p>
                            </div>
                            <div>
                                <p>$<span>{contractInfo.totalWithdrawal ?  contractInfo.totalWithdrawal : '0.00'}</span></p>
                            </div>
                        </div>
                      
                      <div className='text-center'>
                            <Link target='_blank' to={`https://testnet.bscscan.com/address/${process.env.REACT_APP_CONTRACT_ADDRESS}`}>
                                <button className="trk-btn trk-btn--border trk-btn--primary d-block refer_btn">
                                    <span className='text-center'>
                                        <i className='fa fa-check'></i>
                                        View on BSC Scan</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>


            <div className="row mt-4">
              <div className="col-md-12 col-12 col-lg-12">
                <div className="account__content account__content--style3">
                      <h3 className='text-center'>Network & Bonuses</h3>
                      <div className='card-body text-center'>
                          <div className="row">
                            
                              <div className="col-md-6">
                                <div className="d-lg-flex justify-content-lg-between">
                                  <div className='wallet'>
                                      <p>Direct Team</p>
                                  </div>
                                  <div>
                                      <p>
                                        <span id='partners'>{userInfo.partners ? userInfo.partners : 0} </span>
                                        <span>/ Active - </span>
                                        <span id='partnersActive'>{userInfo.activePartnersCount ? userInfo.activePartnersCount : 0}</span> 
                                    </p>
                                  </div>
                              </div>
                                  <div className="d-lg-flex justify-content-lg-between">
                                      <div className='wallet'>
                                          <p>Total Team</p>
                                      </div>
                                      <div>
                                          <p id='downline'>{userInfo.downline ? userInfo.downline : 0}</p>
                                      </div>
                                  </div>

                                  <div className="d-lg-flex justify-content-lg-between">
                                      <div className='wallet'>
                                          <p>Matrix Bonus </p>
                                      </div>
                                      <div>
                                          <p>
                                              <span>$</span><span id="withdrawn_income">{userInfo.withdrawn  ? userInfo.withdrawn : '0.00'}</span>
                                          </p>
                                      </div>
                                  </div>

                              </div>
                              <div className="col-md-6">

                                <div className="d-lg-flex justify-content-lg-between">
                                  <div className='wallet'>
                                      <p>Direct Business</p>
                                  </div>
                                  <div>
                                      <span>$</span><span className="direct_business">{userInfo.direct_business ? userInfo.direct_business : '0.00'}</span>
                                  </div>
                              </div>
                                  <div className="d-lg-flex justify-content-lg-between">
                                      <div className='wallet'>
                                          <p className='font-weight-bold'>Total Business</p>
                                      </div>
                                      <div>
                                          <p className='font-weight-bold'>
                                            <span>$</span><span className="downline_business">{userInfo.downline_business ? userInfo.downline_business : '0.00'}</span>
                                          </p>
                                      </div>
                                  </div>
                                  <div className="d-lg-flex justify-content-lg-between">
                                      <div className='wallet'>
                                          <p>Total withdrawal </p>
                                      </div>
                                      <div>
                                          <p>
                                              <span>$</span><span id="withdrawn_income">{userInfo.withdrawn  ? userInfo.withdrawn : '0.00'}</span>
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12 col-12 col-lg-12">
                  <div className="account__content account__content--style3">
                    <h3 className='text-center'>Matrix Details</h3>
                    <div className="card-body">
                      {
                        levelsData.length >= 1 ? (
                            <div id='carouselExampleControls2' className="row carousel-inner2 meta-contents2">
                              {levelsData.map(({ level, dataX4, dataX4SecondLevel, memberOnLevel, reinvestCount, lotteryPrice }) => {
                                const isActive = level === 1 ? 'active' : '';
                                const marginClass = level >= 4 ? 'mt-4' : '';
                                return (
                                  <div className={`col-md-4 col-12 col-sm-12 col-xs-12 ${isActive} ${marginClass}`} key={level}>

                                    <Link to={`/dashboard/x4/${level}/1/${userInfo?.id}`}>
                                      <div className="binary">
                                        <div className="card-header bg-primary">
                                          <a href="#" className={`binary-root matrix-root ${isActive}`}>
                                            <span className="matrix-level matrix-level__active">
                                              {level}
                                            </span>
                                            <span className="matrix-price">
                                              ${lotteryPrice} MATRIX
                                            </span>
                                          </a>
                                        </div>
                                        <div className="binary-children matrix__children matrix-root__active">
                                          <div className="binary-children__list">
                                            <div className="binary-children__list-1">
                                              {dataX4.slice(0, 2).map((item, index) => (
                                                <a href="#" className="binary-children__item matrix-children__nonactive" key={index}>
                                                  {item?.toString()} {/* Ensure item is a string */}
                                                </a>
                                              ))}
                                            </div>
                                            <div className="binary-children__list-2">
                                              {dataX4SecondLevel.map((item, index) => (
                                                <a href="#" className="binary-children__item matrix-children__nonactive" key={index}>
                                                  {item?.toString()} {/* Ensure item is a string */}
                                                </a>
                                              ))}
                                            </div>
                                          </div>
                                          <div className="matrix-info">
                                            <div className="matrix_partners__count">
                                              <span>{memberOnLevel?.toString()}</span> {/* Ensure memberOnLevel is a string */}
                                              <i className="matrix-icon_users"></i>
                                            </div>
                                            <div className="matrix_reinvest">
                                              <span>{reinvestCount?.toString()}</span> {/* Ensure reinvestCount is a string */}
                                              <i className="matrix-icon_sync"></i>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <ContentLoader viewBox="0 0 900 457" height={507} width={'100%'} backgroundColor={'#212529'}>
                              <rect x="30" y="60" rx="0" ry="0" width="200" height="120" />
                              <rect x="343" y="60" rx="0" ry="0" width="200" height="120" />
                              <rect x="655" y="60" rx="0" ry="0" width="200" height="120" />
                              <rect x="30" y="250" rx="0" ry="0" width="200" height="120" />
                              <rect x="343" y="250" rx="0" ry="0" width="200" height="120" />
                              <rect x="655" y="250" rx="0" ry="0" width="200" height="120" />
                              <rect x="667" y="250" rx="0" ry="0" width="200" height="120" />
                            </ContentLoader>
                          )
                      }
                      
                    </div>
                  </div>
                </div>
            </div>
            
            
            <div className="row mt-5">
              <div className="col-lg-12">
                <div id="pills-tabContent">
                  <div id="pills-all-bets" role="tabpanel"
                    aria-labelledby="pills-all-bets-tab">
                    <div className="responsive-table table-responsive" id='history'>
                      <table className="table text-center" id='matrix_pool_filter'>
                        <thead>
                          <tr>
                              <th scope="col">Date</th>
                              <th scope="col">ID</th>
                              <th scope="col">Wallet</th>
                              <th scope="col">Matrix</th>
                              {/* <th scope="col">Place</th>  */}
                              <th scope="col">Remarks</th>
                              <th scope="col">USDT</th>
                          </tr>
                        </thead>
                          <tbody id='direct_users'>
                              {
                                eventData.map(event => {
                                  let amount;
                                  let event_t;
                                  let cl = 'info';
                                  const levels = [0, 20, 50, 100, 200, 500, 1000, 2000, 5000];

                                  if(event.event_type === 'ExtraEthDividends') {
                                    event_t = 'Extra Dividend';
                                  } else if(event.event_type === 'MissedEthReceive') {
                                    event_t = 'Dividend Missed';
                                  } else if(event.event_type === 'NewUserPlace') {
                                    event_t = 'User Placement';
                                  } else {
                                    event_t = event.event_type;
                                  }

                                
                                  return (
                                    <tr key={event.transaction_hash}>
                                      <td>{new Date(event.created_on).toLocaleDateString()}</td>
                                      <td>{event.user_id}</td>
                                      <td>
                                        {event.user_address && event.user_address.replace(event.user_address.substring(5, 38), "***")}
                                        <a target="_blank" rel="noopener noreferrer" href={`https://testnet.bscscan.com/tx/${event.transaction_hash}`}>
                                          <i className="text-white fa-solid fa-up-right-from-square"></i>
                                        </a>
                                      </td>
                                      <td>{event.level}</td>
                                      {/* <td>{event.place}</td> */}
                                      <td className={`text-${cl}`}>{event_t}</td>
                                      <td className={`text-success`}>{levels[event.level] * 45 / 100}</td>
                                    </tr>
                                  );
                                })
                              }
                          </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
}
