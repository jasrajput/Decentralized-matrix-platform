import { useNavigate, useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import './matrix.css';
import ContentLoader from "react-content-loader";

export default function MatrixDetails() {
    const [matrixData, setMatrixData] = useState([]);
    const { level, cycle, userId } = useParams();
    const navigate = useNavigate();
    const [selectedCycle, setSelectedCycle] = useState(1);
    const [loading, setLoading] = useState(false);
    const [eventData, setEventData] = useState([]);

    const fetchMatrixData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_DOMAIN}/api/matrix-data/${userId}?level=${level}&cycle=${cycle}`);
            if (!response.ok) {
                const errorText = await response.json();
                console.error('Error fetching matrix data:', errorText);
                setLoading(false);
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            setMatrixData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error fetching matrix data:', error);
        }
    };

    const getEvents = async () => {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_DOMAIN}/api/events`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            level: level,
            cycle: cycle
          })
        });
  
        if(!response.ok) {
          setLoading(false);
          return response.error;
        }
  
        const events = await response.json();
        const eventData = events.data;
        setEventData(eventData);
        setLoading(false);
      }

    useEffect(() => {
        fetchMatrixData();
        getEvents();
    }, [userId, level, cycle]);

    let dataX4 = ['', ''];
    let dataX4SecondLevel = ['', '', '', ''];
    let memberOnLevel = 0;
    let totalRevenue = 0;
    let cyclesLength = 0;
    let totalPartners = 0;
    let dynamicClass = 'bg-hover-main-blue';
    let textClass = 'text-main-blue';
    let cycles = [];

    if (matrixData) {
        ({ dataX4, dataX4SecondLevel, memberOnLevel, totalRevenue, cyclesLength, totalPartners, cycles =[] } = matrixData);
    }

    const openNextLevel = () => {
        if (level >= 8) {
            return;
        }
        navigate(`/dashboard/x4/${parseInt(level) + 1}/1/${userId}`);
        setMatrixData([]);
    }


    const openPreviousLevel = () => {
        if (level <= 1) {
            return;
        }
        navigate(`/dashboard/x4/${parseInt(level) - 1}/1/${userId}`);
        setMatrixData([]);
    }

    const updateCycle = (event) => {
        setSelectedCycle(event.target.value);
        navigate(`/dashboard/x4/${parseInt(level)}/${event.target.value}/${userId}`);

        setMatrixData([]);
    }

    const levelAmount = [0, 20, 50, 100, 200, 500, 1000, 2000, 5000];

    return <>
        <section className="pricing padding-top padding-bottom" id="pricing">
            {
                loading ? (
                    <ContentLoader
                        width={'100%'}
                        height={507}
                        viewBox="0 0 550 300"
                        backgroundColor="#212529"
                        foregroundColor="#dedede"
                    >
                        <rect x="42" y="77" rx="10" ry="10" width="100%" height="417" />
                    </ContentLoader>

                ) : (
                    <>
                        <div className="section-header text-center">
                            <h2 className="mb-10 mt-minus-5">Level  <span>{level} </span></h2>
                        </div>
                        <div className="container">
                            <div className="pricing__wrapper">
                                <div className="row g-4 align-items-center">
                                    <div className="flex space-x-10 xl:space-x-0 z-10">
                                        <button onClick={openPreviousLevel} className="flex justify-center items-center text-center text-base font-bold text-white rounded-mini sm:text-sm outline-none px-5 py-2.5 bg-black-light hover:bg-line-gray active:bg-active-gray min-w-140px xl:hidden p-7 bg-black-light rounded">
                                            {
                                                level > 1 && (
                                                    <>
                                                        <svg className="flex-shrink-0" width="8" height="14" stroke="#fff" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7 13L1 7l6-6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span className="text-white text-base ml-2.5">{`Level ${parseInt(level) - 1}`}</span>
                                                    </>
                                                )
                                            }
                                        </button>
                                        <div className="flex w-full min-h-340px sm:min-h-290px col-span-4 rounded relative bg-main-blue">
                                            <div className="flexs w-full flex-col z-10 p-7.5 overflow-hidden sm:p-5">
                                                <div className="flex w-full justify-between pb-10 z-10">
                                                    <div className="flex flex-1 items-start justify-start ">
                                                        <div className="flex items-center space-x-2.5"><span className="text-white-300 text-two-half font-normal sm:text-xl">Lvl {level}</span></div>
                                                    </div>
                                                    {/* <div className="flex-1 flex flex-col items-center"><span className="text-white text-two-half font-medium mb-2.5 sm:text-xl">ID 1</span></div> */}
                                                    <div className="flex items-start justify-end flex-1 text-white-300 text-two-half font-normal text-right  sm:text-xl">
                                                        <div className="flex items-center">
                                                            <img src={`${process.env.PUBLIC_URL}/assets/images/tether-usdt-logo.png`} style={{ height: '40px', marginRight: 5 }} />
                                                            {levelAmount[level]}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col  w-full h-full z-10">
                                                    <div className="flex justify-center mb-15 sm:mb-10">
                                                        <div className="flex w-full items-start justify-evenly mt-7.5 sm:mt-5 first:mt-0">
                                                            <div className="relative flex w-full justify-evenly items-start false false">
                                                                <div className="flex flex-col justify-around items-center  w-full">
                                                                    <div className="relative">
                                                                        <div className={`flex flex-col items-center justify-center ${textClass} text-base group hover:opacity-75 rounded-full  w-20 h-20 sm:w-15 sm:h-15 ${dynamicClass}`}>
                                                                            {
                                                                                dataX4 ? dataX4[0] : (
                                                                                    <svg className="w-7 h-7 false" viewBox="0 0 20 20" fill="none" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke-linejoin="round"></path>
                                                                                        <path d="M10 6.667 6.667 10M10 6.667v6.666M13.333 10 10 6.667" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                    </svg>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex w-full items-start justify-evenly mt-7.5 sm:mt-5 first:mt-0">
                                                                        <div className="relative flex w-full justify-evenly items-start false false">
                                                                            <div className="flex flex-col justify-around items-center  false">
                                                                                <div className="relative">
                                                                                    <div className="flex flex-col  bg-hover-main-blue 
                                                                                items-center justify-center text-main-blue text-base group hover:opacity-75 rounded-full  w-20 h-20 sm:w-10 sm:h-10 ">
                                                                                        {
                                                                                            dataX4SecondLevel ? dataX4SecondLevel[0] : (
                                                                                                <svg className="w-7 h-7 false" viewBox="0 0 20 20" fill="none" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke-linejoin="round"></path>
                                                                                                    <path d="M10 6.667 6.667 10M10 6.667v6.666M13.333 10 10 6.667" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                                </svg>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-col justify-around items-center  false">
                                                                                <div className="relative">
                                                                                    <div className="flex flex-col  bg-hover-main-blue 
                                                                                items-center justify-center text-main-blue text-base group hover:opacity-75 rounded-full  w-20 h-20 sm:w-10 sm:h-10 ">
                                                                                        {
                                                                                            dataX4SecondLevel ? dataX4SecondLevel[1] : (
                                                                                                <svg className="w-7 h-7 false" viewBox="0 0 20 20" fill="none" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke-linejoin="round"></path>
                                                                                                    <path d="M10 6.667 6.667 10M10 6.667v6.666M13.333 10 10 6.667" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                                </svg>
                                                                                            )
                                                                                        }
                                                                                        {/* here 2nd */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col justify-around items-center  w-full">
                                                                    <div className="relative">
                                                                    <div className={`flex flex-col items-center justify-center ${textClass} text-base group hover:opacity-75 rounded-full  w-20 h-20 sm:w-15 sm:h-15 ${dynamicClass}`}>
                                                                            {
                                                                                dataX4 ? dataX4[1] : (
                                                                                    <svg className="w-7 h-7 false" viewBox="0 0 20 20" fill="none" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke-linejoin="round"></path>
                                                                                        <path d="M10 6.667 6.667 10M10 6.667v6.666M13.333 10 10 6.667" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                    </svg>
                                                                                )
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                    <div className="flex w-full items-start justify-evenly mt-7.5 sm:mt-5 first:mt-0">
                                                                        <div className="relative flex w-full justify-evenly items-start false false">
                                                                            <div className="flex flex-col justify-around items-center  false">
                                                                                <div className="relative">
                                                                                    <div className="flex flex-col  bg-hover-main-blue items-center justify-center text-main-blue text-base group hover:opacity-75 rounded-full  w-20 h-20 sm:w-10 sm:h-10 ">
                                                                                        {
                                                                                            dataX4SecondLevel ? dataX4SecondLevel[2] : (
                                                                                                <svg className="w-7 h-7 false" viewBox="0 0 20 20" fill="none" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke-linejoin="round"></path>
                                                                                                    <path d="M10 6.667 6.667 10M10 6.667v6.666M13.333 10 10 6.667" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                                </svg>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex flex-col justify-around items-center  false">
                                                                                <div className="relative">
                                                                                    <div className="flex flex-col  bg-hover-main-blue items-center justify-center text-main-blue text-base group hover:opacity-75 rounded-full  w-20 h-20 sm:w-10 sm:h-10 ">
                                                                                        {
                                                                                            dataX4SecondLevel ? dataX4SecondLevel[3] : (
                                                                                                <svg className="w-7 h-7 false" viewBox="0 0 20 20" fill="none" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" stroke-linejoin="round"></path>
                                                                                                    <path d="M10 6.667 6.667 10M10 6.667v6.666M13.333 10 10 6.667" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                                                </svg>
                                                                                            )
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between w-full mtx-5 ">
                                                        <div className="flex space-x-14 xl:space-x-8 sm:space-x-7.5">
                                                            <div className="flex flex-col">
                                                                <span className="text-white text-base sm:text-white-500 sm:text-sm">Partners</span>
                                                                <div className="flex items-center mt-1" >
                                                                    <svg className="stroke-current text-white-500 w-6 h-6" viewBox="0 0 16 16" fill="none" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M6 7.333A2.667 2.667 0 1 0 6 2a2.667 2.667 0 0 0 0 5.333ZM2 14v-1.333A2.667 2.667 0 0 1 4.667 10h2.666A2.667 2.667 0 0 1 10 12.667V14M10.667 2.086a2.667 2.667 0 0 1 0 5.167M14 14v-1.333a2.667 2.667 0 0 0-2-2.567" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                    </svg>
                                                                    <span className="text-white text-base ml-2.5 sm:text-sm">{memberOnLevel > 0 ? memberOnLevel : 0}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col mx-4">
                                                                <span className="text-white text-base sm:text-white-500 sm:text-sm">Cycles</span>
                                                                <div className="flex items-center mt-2">
                                                                    <svg className="stroke-current text-white-500 w-6 h-6" viewBox="0 0 20 20" fill="none" stroke="#2CFF4E" xmlns="http://www.w3.org/2000/svg">
                                                                        <path clip-rule="evenodd" d="M6.354 3.818a7.25 7.25 0 0 1 10.808 5.28.5.5 0 1 1-.99.137A6.25 6.25 0 0 0 4.551 7h2.115a.5.5 0 0 1 0 1H3.333a.5.5 0 0 1-.5-.5V4.167a.5.5 0 1 1 1 0v2.086a7.25 7.25 0 0 1 2.521-2.435ZM3.265 10.338a.5.5 0 0 1 .564.427A6.25 6.25 0 0 0 15.449 13h-2.116a.5.5 0 1 1 0-1H16.667a.5.5 0 0 1 .5.5v3.333a.5.5 0 1 1-1 0v-2.086a7.25 7.25 0 0 1-13.329-2.845.5.5 0 0 1 .427-.564Z"></path>
                                                                    </svg>
                                                                    <span className="text-white text-base mt-2.5 sm:text-sm">{cyclesLength > 0 ? cyclesLength : 0}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-white text-base text-right sm:text-white-500 sm:text-sm">Total level revenue</span>
                                                            <div className="flex items-center mt-2.5 justify-end">
                                                                <svg className="stroke-current text-white w-6 h-6" viewBox="0 0 20 20" fill="none" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                                                                    <g opacity=".5" stroke-linecap="round" stroke-linejoin="round">
                                                                        <path d="M14.167 6.667v-2.5a.833.833 0 0 0-.834-.834H5A1.667 1.667 0 0 0 3.333 5m0 0A1.667 1.667 0 0 0 5 6.667h10a.833.833 0 0 1 .833.833V10m-12.5-5v10A1.667 1.667 0 0 0 5 16.667h10a.833.833 0 0 0 .833-.834v-2.5"></path>
                                                                        <path d="M16.667 10v3.333h-3.334a1.667 1.667 0 0 1 0-3.333h3.334Z"></path>
                                                                    </g>
                                                                </svg>
                                                                <span className="text-white text-base ml-2.5 notranslate sm:text-sm mt-1">{totalRevenue > 0.00 ? totalRevenue : '0.00'} USDT</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex absolute rounded -bottom-5 top-5 right-5 left-2.5 bg-opacity-50 bg-main-blue"></div>
                                        </div>
                                        <button onClick={openNextLevel} className="flex justify-center items-center text-center text-base font-bold text-white rounded-mini sm:text-sm outline-none px-5 py-2.5 bg-black-light hover:bg-line-gray active:bg-active-gray min-w-140px xl:hidden p-7 bg-black-light rounded">
                                            {
                                                level < 8 && (
                                                    <>
                                                        <svg className="flex-shrink-0" width="8" height="14" stroke="#fff" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m1 13 6-6M1 1l6 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span className="text-white text-base ml-2.5">{`Level ${parseInt(level) + 1}`}</span>
                                                    </>
                                                )
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex justify-between z-10">
                            <div className="flex flex-1 m-4 xl:middle">
                                <a onClick={openPreviousLevel} className="flex items-center justify-start font-normal h-full w-full" href="#">
                                    {
                                        level > 1 && (
                                            <>
                                                <svg className="flex-shrink-0" width="8" height="14" stroke="#fff" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 13 1 7M7 1 1 7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                                <span className="text-white text-base ml-2.5">{`Level ${parseInt(level) - 1}`}</span>
                                            </>
                                        )
                                    }

                                </a>
                            </div>
                            <div className="m-4 flex flex-1 xl:middle">
                                <a onClick={openNextLevel} className=" flex items-center justify-end font-normal h-full w-full " href="#">
                                    {
                                        level < 8 && (
                                            <>
                                                <span className="text-white text-base mr-2.5">{`Level ${parseInt(level) + 1}`}</span>
                                                <svg className="flex-shrink-0" width="8" height="14" stroke="#fff" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="m1 13 6-6M1 1l6 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </>
                                        )
                                    }
                                </a>
                            </div>
                        </div>

                        <div className="fslex w-full items-center justify-center sm:px-5" style={{ zIndex: 999 }}>
                                <div className="flsex bg-blacks-light p-5 rounded items-center justify-center w-8s/12 xl:w-fusll">
                                    <div className="flex items-center justify-center w-sfull">

                                        <div className="flex items-center justify-center cursor-pointer">
                                            <span className="text-white text-base mr-4 sm:text-sm">Current - </span>
                                            <select onChange={updateCycle} value={selectedCycle}>
                                                {
                                                    cycles.map((item, index) => {
                                                        return <option key={index} value={item.cycle}>{item.cycle}</option>
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <span style={{ marginLeft: 5 }} className="text-white text-base w-24 text-center mx-2.5 sm:mx-4 sm:text-sm">Total Cycle: {cyclesLength}</span>
                                    </div>
                                </div>
                            </div>

                        <div className="mt-5 container  justify-center items-center w-full">
                            <div className="">
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
                                                        <th scope="col">USDT</th>
                                                    </tr>
                                                </thead>
                                                <tbody id='direct_users'>
                                                    {
                                                        eventData.map(event => {
                                                            const levels = [0, 20, 50, 100, 200, 500, 1000, 2000, 5000];
                                                            let amount;

                                                            if(event.event_type === 'ReceiveDividends') {
                                                                amount = levels[event.level] * 45 / 100
                                                            } else {
                                                                amount = event.event_type;
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
                                                                    <td className={`text-info`}>{amount}</td>
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

                    </>
                )
            }

        </section>
    </>
}