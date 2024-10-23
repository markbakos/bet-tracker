function Stats() {

    const currency = localStorage.getItem('currency')

    const resetData = () => {
        localStorage.clear()
        localStorage.setItem('currency', '$')
        localStorage.setItem('totalWon', 0)
        localStorage.setItem('totalStake', 0)
        window.location.reload()
    }

    const openPopUp = () => {
      document.getElementById('popUp').classList.remove('hidden')
    }
    const closePopUp = () => {
        document.getElementById('popUp').classList.add('hidden')
    }

    const changeCurrency = () => {
        const currencyInput = document.getElementById('currencyInput').value
        localStorage.setItem('currency', currencyInput)
        window.location.reload()
    }

    return (
        <>
            <div className="flex justify-center items-center flex-col">
                <button
                    onClick={openPopUp}
                    className="w-[20rem] h-[5vh] flex items-center justify-center bg-gray text-white my-4 rounded-lg hover:bg-red-500 active:bg-red-700">
                    Delete Data
                </button>

                <div id="popUp" className="hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-gray w-[90vw] h-[10rem] sm:w-[30rem] sm:h-[10rem] rounded-lg">
                    <h1 className="text-center text-2xl text-red-500 font-bold my-5">This will delete all your data</h1>
                    <div className="flex justify-evenly">
                        <button onClick={closePopUp}
                                className="w-[9rem] sm:w-[10rem] h-[3rem] bg-stone-300 hover:bg-stone-400 rounded-lg text-black transition">
                            Close PopUp
                        </button>
                        <button onClick={resetData}
                                className="w-[9rem] sm:w-[10rem] h-[3rem] bg-stone-300 hover:bg-red-500 rounded-lg text-black hover:text-white transition">
                            Delete all my data
                        </button>
                    </div>
                </div>

                <div className="m-5 flex flex-col items-center">
                    <label htmlFor="currencyInput">Change Currency</label>
                    <div className="flex flex-row">
                        <input id="currencyInput"
                               type="text"
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


                <h1 id="totalWin"
                    className="text-center">
                    Total Win: {parseInt(localStorage.getItem('totalWon')).toLocaleString()}{currency}
                </h1>
                <h1 id="totalStake"
                    className="text-center">
                    Total Stake: {parseInt(localStorage.getItem('totalStake')).toLocaleString()}{currency}
                </h1>
            </div>
        </>
    )
}

export default Stats
