
import { useState, useEffect } from "react";

function BetContainer({id, title, stake, odds, time, onDeleteBet}) {
    const toWin = (stake * odds).toFixed(2).toLocaleString()
    const divID = `div${id}`
    const winID = `win${id}`
    const checkID = `check${id}`
    const xID = `x${id}`
    const checkDivID = `checkDiv${id}`
    const xDivID = `xDiv${id}`

    useEffect(() => {
        if (localStorage.getItem(divID)) {
            if (localStorage.getItem(divID) === 'won') {
                updateWonDesign()
            } else if (localStorage.getItem(divID) === 'lost') {
                updateLostDesign()
            }
        }
    }, [])
    const wonBet = () => {
        updateWonDesign()
        if(localStorage.getItem(divID) !== 'won'){
            localStorage.setItem(divID, 'won');

            updateTotalWon(parseFloat(toWin))
        }

    }
    const lostBet = () => {
        updateLostDesign()
        if(localStorage.getItem(divID) !== 'lost'){
            localStorage.setItem(divID, 'lost')
            updateTotalWon(-parseFloat(stake))
        }

    }
    const updateTotalWon = (amount) => {
        const currentTotalWon = localStorage.getItem('totalWon') ? parseFloat(localStorage.getItem('totalWon')) : 0
        const newTotalWon = currentTotalWon + amount
        localStorage.setItem('totalWon', newTotalWon.toFixed(2))
    }

    const deleteBet = () => {
        if(localStorage.getItem(divID) === 'won'){
            updateTotalWon(-parseFloat(toWin))
        } else if(localStorage.getItem(divID) === 'lost') {
            updateTotalWon(+parseFloat(stake))
        }
        onDeleteBet(id)
    }


    const updateWonDesign = () => {
        document.getElementById(divID).classList.remove("bg-red-500")
        document.getElementById(xID).classList.add("text-red-500")
        document.getElementById(xID).classList.remove("text-white")
        document.getElementById(divID).classList.add("bg-green-500")
        document.getElementById(checkID).classList.remove("text-green-500")
        document.getElementById(checkID).classList.add("text-white")
        document.getElementById(xDivID).classList.add("hidden")

        document.getElementById(winID).innerHTML = `Won: ${toWin}`
    }
    const updateLostDesign = () => {
        document.getElementById(divID).classList.remove("bg-green-500")
        document.getElementById(checkID).classList.remove("text-white")
        document.getElementById(checkID).classList.add("text-green-500")
        document.getElementById(divID).classList.add("bg-red-500")
        document.getElementById(xID).classList.remove("text-red-500")
        document.getElementById(xID).classList.add("text-white")
        document.getElementById(checkDivID).classList.add("hidden")
        document.getElementById(winID).innerHTML = `Lost: ${stake}`
    }

    return (
        <>
            <div id={divID} className="w-[90vw] h-[6rem] sm:w-[40vw] sm:h-[6rem] flex flex-col bg-gray text-white rounded-lg my-1 p-2">
                <div className="flex flex-row justify-between">
                   <h1>{title} </h1>
                <p className="text-end">Stake: {stake} x{odds}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm text-end">{time}</p>
                    <p id={winID}>To Win: {toWin}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <div id={checkDivID}
                            title="Won Bet"
                            onClick={wonBet}
                            className="w-8 h-8 sm:w-[2.5vw] flex justify-center items-center rounded-full mr-2 cursor-pointer hover:bg-green-500 transition ease-in-out transition:duration-400 transition:delay-100">
                            <p id={checkID}
                               className="text-center text-4xl text-green-500 hover:text-white select-none transition ease-in-out transition:duration-400 transition:delay-100">
                                ✔
                            </p>
                        </div>
                        <div id={xDivID}
                            title="Lost Bet"
                            onClick={lostBet}
                            className="w-8 h-8 sm:w-[2.5vw] flex justify-center items-center rounded-full mr-2 cursor-pointer hover:bg-red-500 transition ease-in-out transition:duration-400 transition:delay-100">
                            <p id={xID}
                               className="text-center text-4xl text-red-500 hover:text-white select-none transition ease-in-out transition:duration-400 transition:delay-100">
                                ×
                            </p>
                        </div>

                    </div>
                    <img
                        title="Delete Bet"
                        onClick={deleteBet}
                        draggable="false"
                        className="h-8 mr-2 cursor-pointer select-none"
                        src="https://github.com/mrkdsoftware/bet-tracker/blob/main/src/assets/trash.png?raw=true" />

                </div>
            </div>
        </>
    )
}

export default BetContainer
