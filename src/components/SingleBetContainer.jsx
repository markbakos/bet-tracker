import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

function SingleBetContainer({id, title, stake, returned, time, onDeleteBet}) {
    const totalReturn = (returned-stake).toLocaleString()
    const singleDivID = `singleDiv${id}`

    const currency = localStorage.getItem('currency')
    const navigate = useNavigate()

    useEffect(() => {
            if (parseInt(totalReturn) > 0) {
                updateWonDesign()
                if (localStorage.getItem(singleDivID) !== 'won') {
                    localStorage.setItem(singleDivID, 'won');
                    updateTotalWon(parseFloat(+returned))
                }
            } else if (parseInt(totalReturn) < 0) {
                updateLostDesign()
                if(localStorage.getItem(singleDivID) !== 'lost'){
                    localStorage.setItem(singleDivID, 'lost')
                    updateTotalWon(-parseFloat(totalReturn))
                }
            }
    }, [singleDivID])

    const updateWonDesign = () => {
        document.getElementById(singleDivID).classList.remove("bg-red-500")
        document.getElementById(singleDivID).classList.add("bg-green-500")
    }

    const updateLostDesign = () => {
        document.getElementById(singleDivID).classList.remove("bg-green-500")
        document.getElementById(singleDivID).classList.add("bg-red-500")
    }

    const updateTotalWon = (amount) => {
        const currentTotalWon = localStorage.getItem('totalSingleWon') ? parseFloat(localStorage.getItem('totalSingleWon')) : 0
        const newTotalWon = currentTotalWon + amount
        localStorage.setItem('totalSingleWon', newTotalWon.toFixed(2))
    }

    const deleteBet = () => {
        if(parseInt(totalReturn) > 0){
            updateTotalWon(-parseFloat(totalReturn))
        } else if(parseInt(totalReturn) < 0) {
            updateTotalWon(+parseFloat(stake))
        }
        onDeleteBet(id)
        navigate(0)
    }

    return (
        <>
            <div id={singleDivID} className="w-[90vw] h-[6rem] sm:w-[40vw] sm:h-[6rem] flex flex-col bg-gray text-white rounded-lg my-1 p-2">
                <div className="flex flex-row justify-between">
                    <h1>{title}</h1>
                    <p className="text-end">Stake: {parseInt(stake).toLocaleString()}{currency}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm text-end">{time}</p>
                    <p>Return: {parseFloat(returned).toLocaleString()}{currency}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <img
                        title="Delete Bet"
                        onClick={deleteBet}
                        draggable="false"
                        className="h-8 mr-2 cursor-pointer select-none"
                        src="https://github.com/mrkdsoftware/bet-tracker/blob/main/src/assets/trash.png?raw=true"/>
                    <p>
                        Total Return: {totalReturn}{currency}
                    </p>
                </div>

            </div>
        </>
    )
}

export default SingleBetContainer
