import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

function SingleBetContainer({id, title, stake, odds, time, onDeleteBet}) {
    const toWin = (stake * odds).toFixed(2).toLocaleString()
    const divID = `div${id}`
    const winID = `win${id}`

    const currency = localStorage.getItem('currency')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem(divID)) {
            if (localStorage.getItem(divID) === 'won') {
                updateWonDesign()
            } else if (localStorage.getItem(divID) === 'lost') {
                updateLostDesign()
            }
        }
        if(isNaN(parseInt(localStorage.getItem('totalWon')))) {
            localStorage.setItem('totalWon', 0)
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
        navigate(0)
    }


    const updateWonDesign = () => {
        document.getElementById(divID).classList.remove("bg-red-500")
        document.getElementById(divID).classList.add("bg-green-500")
        document.getElementById(winID).innerHTML = `Won: ${parseFloat(toWin).toLocaleString()}${currency}`
    }
    const updateLostDesign = () => {
        document.getElementById(divID).classList.remove("bg-green-500")
        document.getElementById(divID).classList.add("bg-red-500")
        document.getElementById(winID).innerHTML = `Lost: ${parseFloat(stake).toLocaleString()}${currency}`
    }

    return (
        <>
            <div id={divID} className="w-[90vw] h-[6rem] sm:w-[40vw] sm:h-[6rem] flex flex-col bg-gray text-white rounded-lg my-1 p-2">
                <div className="flex flex-row justify-between">
                    <h1>{title}</h1>
                    <p className="text-end">Stake: {parseInt(stake).toLocaleString()}{currency} x{odds}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm text-end">{time}</p>
                    <p id={winID}>To Win: {parseFloat(toWin).toLocaleString()}{currency}</p>
                </div>
                <div className="flex flex-row justify-between">
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

export default SingleBetContainer
