import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"

import BarChart from "./BarChart.jsx"


function Stats() {

    const navigate = useNavigate()

    const overallWon = parseFloat(localStorage.getItem('totalWon')) + parseFloat(localStorage.getItem('totalSingleWon'))
    const overallStake = parseFloat(localStorage.getItem('totalStake')) + parseFloat(localStorage.getItem('totalSingleStake'))

    const resetData = () => {
        localStorage.clear()
        localStorage.setItem('currency', '$')
        localStorage.setItem('totalWon', 0)
        localStorage.setItem('totalStake', 0)
        localStorage.setItem('totalSingleWon', 0)
        localStorage.setItem('totalSingleStake', 0)
        navigate(0)
    }

    const openPopUp = () => {
      document.getElementById('popUp').classList.remove('hidden')
    }
    const closePopUp = () => {
        document.getElementById('popUp').classList.add('hidden')
    }

    const currency = localStorage.getItem('currency')

    const changeCurrency = () => {
        const currencyInput = document.getElementById('currencyInput').value
        localStorage.setItem('currency', currencyInput)
        navigate(0)
    }

    useEffect(() => {
        document.getElementById('currencyInput').value = localStorage.getItem('currency')
    },[])



    useEffect(() => {
        const totalOverallReturn = document.getElementById('totalOverallReturn')
        const totalReturn = document.getElementById('totalReturn')
        const totalSingleReturn = document.getElementById('totalSingleReturn')

        if(totalOverallReturn){
            if(parseInt(totalOverallReturn.innerHTML)>0){
                totalOverallReturn.classList.add('text-green-500')
            }
            else if(parseInt(totalOverallReturn.innerHTML)<0){
                totalOverallReturn.classList.add('text-red-500')
            }
        }

        if(totalReturn){
            if(parseInt(totalReturn.innerHTML)>0){
                totalReturn.classList.add('text-green-500')
            }
            else if(parseInt(totalReturn.innerHTML)<0){
                totalReturn.classList.add('text-red-500')
            }
        }
        if(totalSingleReturn){
            if(parseInt(totalSingleReturn.innerHTML)>0){
                totalSingleReturn.classList.add('text-green-500')
            }
            else if(parseInt(totalSingleReturn.innerHTML)<0){
                totalSingleReturn.classList.add('text-red-500')
            }
        }

    }, [])

    return (
        <>
            <div className="flex justify-center">
                <div className="w-80 sm:w-[40rem] h-[0.1rem] bg-gray rounded-full"></div>
            </div>

            <div className="flex justify-center items-center flex-col">
                <div className="my-8">
                    <h1 className="text-center text-3xl mb-2 font-semibold select-none">Overall:</h1>
                    <h1
                        className="text-center text-3xl">
                        Total Return:
                    </h1>
                    <h1 id="totalOverallReturn" className="text-center text-2xl my-1">
                        {(overallWon - overallStake).toLocaleString()}{currency}
                    </h1>

                    <h1
                        className="mt-6 text-center text-3xl">
                        Total Win:
                    </h1>
                    <h1 id="totalOverallWin" className="text-center text-2xl my-1">
                        {overallWon.toLocaleString()}{currency}
                    </h1>
                    <h1
                        className="mt-6 text-center text-3xl">
                        Total Stake:
                    </h1>
                    <h1 id="totalOverallStake" className="text-center text-2xl my-1">
                        {overallStake.toLocaleString()}{currency}
                    </h1>
                </div>

                <div className="flex justify-center items-center flex-col">
                    <BarChart/>
                </div>

                <div className="w-screen flex flex-col sm:flex-row sm:justify-center">
                    <div className="my-8">
                        <h1 className="text-center text-3xl mb-2 font-semibold select-none">Parlay:</h1>
                        <h1
                            className="text-center text-3xl">
                            Total Return:
                        </h1>
                        <h1 id="totalReturn" className="text-center text-2xl my-1">
                            {(localStorage.getItem('totalWon') - localStorage.getItem('totalStake')).toLocaleString()}{currency}
                        </h1>
                        <h1
                            className="mt-6 text-center text-3xl">
                            Total Win:
                        </h1>
                        <h1 id="totalWin" className="text-center text-2xl my-1">
                            {parseInt(localStorage.getItem('totalWon')).toLocaleString()}{currency}
                        </h1>
                        <h1
                            className="mt-6 text-center text-3xl">
                            Total Stake:
                        </h1>
                        <h1 id="totalStake" className="text-center text-2xl my-1">
                            {parseInt(localStorage.getItem('totalStake')).toLocaleString()}{currency}
                        </h1>

                    </div>

                    <div className="flex justify-center">
                        <div
                            className="w-80 sm:w-[15rem] h-[0.1rem] mt-3 invisible sm:visible bg-gray rounded-full"></div>
                    </div>

                    <div className="flex justify-center items-center flex-col">
                        <div className="my-8">
                            <h1 className="text-center text-3xl mb-2 font-semibold select-none">Single:</h1>

                            <h1
                                className="text-center text-3xl">
                                Total Return:
                            </h1>
                            <h1 id="totalSingleReturn" className="text-center text-2xl my-1">
                                {(localStorage.getItem('totalSingleWon') - localStorage.getItem('totalSingleStake')).toLocaleString()}{currency}
                            </h1>

                            <h1
                                className="mt-6 text-center text-3xl">
                                Total Win:
                            </h1>
                            <h1 id="totalSingleWin" className="text-center text-2xl my-1">
                                {parseInt(localStorage.getItem('totalSingleWon')).toLocaleString()}{currency}
                            </h1>
                            <h1
                                className="mt-6 text-center text-3xl">
                                Total Stake:
                            </h1>
                            <h1 id="totalSingleStake" className="text-center text-2xl my-1">
                                {parseInt(localStorage.getItem('totalSingleStake')).toLocaleString()}{currency}
                            </h1>

                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-80 sm:w-[40rem] h-[0.1rem] bg-gray rounded-full"></div>
                </div>

                <div className="m-5 flex flex-col items-center">
                    <label htmlFor="currencyInput">Change Currency</label>
                    <div className="flex flex-row">
                        <input id="currencyInput"
                               type="text"
                               autoComplete="off"
                               className="w-[5rem] text-center border border-black rounded-lg m-2"
                               maxLength="4">
                        </input>
                        <button
                            onClick={changeCurrency}
                            className="w-[5rem] h-[2rem] bg-gray rounded-lg text-white m-2">
                            Change
                        </button>
                    </div>
                    {/* TODO: add button for separating */}

                </div>

                <div className="flex justify-center">
                    <div className="w-80 sm:w-[40rem] h-[0.1rem] bg-gray rounded-full"></div>
                </div>

                <button
                    onClick={openPopUp}
                    className="w-[20rem] h-[5vh] flex items-center justify-center bg-gray text-white my-4 rounded-lg hover:bg-red-500 active:bg-red-700">
                    Delete All Data
                </button>

                <div id="popUp"
                     className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-gray w-[90vw] h-[10rem] sm:w-[30rem] sm:h-[10rem] rounded-lg shadow-black shadow-2xl">
                    <h1 className="text-center text-2xl text-red-500 font-bold my-5">This will delete all your
                        data</h1>
                    <div className="flex justify-evenly">
                        <button onClick={closePopUp}
                                className="w-[9rem] sm:w-[10rem] h-[3rem] bg-stone-300 hover:bg-stone-400 rounded-lg text-black transition">
                            Close pop up
                        </button>
                        <button onClick={resetData}
                                className="w-[9rem] sm:w-[10rem] h-[3rem] bg-stone-300 hover:bg-red-500 rounded-lg text-black hover:text-white transition">
                            Delete all my data
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stats
