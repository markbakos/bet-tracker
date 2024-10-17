
import { useState, useEffect } from "react";

function BetContainer({id, title, stake, odds, time}) {
    const toWin = (stake * odds).toLocaleString()
    const divID = `div${id}`
    const winID = `win${id}`
    const checkID = `check${id}`
    const xID = `x${id}`

    const [betStatus, setBetStatus] = useState('')

    useEffect(() => {
        if (localStorage.getItem(divID)) {
            setBetStatus(localStorage.getItem(divID))
            if (localStorage.getItem(divID) === 'won') {
                wonBet()
            } else if (localStorage.getItem(divID) === 'lost') {
                lostBet()
            }
        }
    }, [])

    const wonBet = () => {

        document.getElementById(divID).classList.remove("bg-red-500")
        document.getElementById(xID).classList.add("text-red-500")
        document.getElementById(xID).classList.remove("text-white")

        document.getElementById(divID).classList.add("bg-green-500")
        document.getElementById(checkID).classList.remove("text-green-500")
        document.getElementById(checkID).classList.add("text-white")

        document.getElementById(winID).innerHTML = `Won: ${toWin}`

        localStorage.setItem(divID, 'won');
        setBetStatus('won');

    }

    const lostBet = () => {

        document.getElementById(divID).classList.remove("bg-green-500")
        document.getElementById(checkID).classList.remove("text-white")
        document.getElementById(checkID).classList.add("text-green-500")

        document.getElementById(divID).classList.add("bg-red-500")
        document.getElementById(xID).classList.remove("text-red-500")
        document.getElementById(xID).classList.add("text-white")

        document.getElementById(winID).innerHTML = `Lost: ${stake}`

        localStorage.setItem(divID, 'lost')
        setBetStatus('lost')
    }




    return (
        <>
            <div id={divID} className="w-[90vw] h-[14vh] sm:w-[40vw] sm:h-[13vh] flex flex-col bg-gray text-white rounded-lg my-1 p-2">
                <div className="flex flex-row justify-between">
                   <h1>{title} </h1>
                <p className="text-end">Stake: {stake} x{odds}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm text-end">{time} #{id}</p>
                    <p id={winID}>To Win: {toWin}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <div
                            title="Won Bet"
                            onClick={wonBet}
                            className="w-[8vw] h-[4.5vh] sm:w-[2.5vw] flex justify-center items-center rounded-full mr-2 cursor-pointer hover:bg-green-500 transition ease-in-out transition:duration-400 transition:delay-100">
                            <p id={checkID} className="text-center text-4xl text-green-500 hover:text-white transition ease-in-out transition:duration-400 transition:delay-100">✔</p>
                        </div>
                        <div
                            title="Lost Bet"
                            onClick={lostBet}
                            className="w-[8vw] h-[4.5vh] sm:w-[2.5vw] flex justify-center items-center rounded-full mr-2 cursor-pointer hover:bg-red-500 transition ease-in-out transition:duration-400 transition:delay-100">
                            <p id={xID} className="text-center text-4xl text-red-500 hover:text-white transition ease-in-out transition:duration-400 transition:delay-100">×</p>
                        </div>

                    </div>
                    <img
                        title="Delete Bet"
                        className="w-8 mr-2 cursor-pointer"
                        src="https://github.com/mrkdsoftware/bet-tracker/blob/main/src/assets/trash.png?raw=true" />

                </div>
            </div>
        </>
    )
}

export default BetContainer
