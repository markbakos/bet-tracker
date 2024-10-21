import {useEffect, useState} from "react";

function Stats() {

    const resetData = () => {
        localStorage.clear()
    }

    return (
        <>
            <div className="flex justify-center flex-col">
                <button
                    onClick={resetData}
                    className="w-[20vw] h-[5vh] flex items-center justify-center bg-gray text-white my-4 rounded-lg">Delete Data</button>

                <h1 id="totalWin"
                    className="text-center">
                    Total Win: {localStorage.getItem('totalWon')}
                </h1>
                <h1 id="totalStake"
                    className="text-center">
                    Total Stake: {localStorage.getItem('totalStake')}
                </h1>
            </div>
        </>
    )
}

export default Stats
