import { useState, useRef, useEffect } from "react";

import BetContainer from "@/components/BetContainer.jsx";

function Home() {

    const [betNumber, setBetNumber] = useState(1)
    const [betContainers, setBetContainers] = useState([])

    const titleInputRef = useRef(null)
    const stakeInputRef = useRef(null)
    const oddsInputRef = useRef(null)

    const [currentSelection, setSelection] = useState("parlay")

    const handleDeleteBet = (id) => {
        const updatedBets = betContainers.filter((bet) => bet.id !== id)
        setBetContainers(updatedBets)
        localStorage.setItem('betContainers', JSON.stringify(updatedBets))

    }

    useEffect(() => {
        if (localStorage.getItem('betContainers')) {
            setBetContainers(JSON.parse(localStorage.getItem('betContainers')))
        }
        if (localStorage.getItem('betNumber')) {
            setBetNumber(JSON.parse(localStorage.getItem('betNumber')))
        }
    }, [])

    useEffect(() => {
        const totalStake = betContainers.reduce((acc, bet) => acc + parseInt(bet.stake), 0);
        localStorage.setItem('totalStake', totalStake);
    }, [betContainers]);


    const errorHandler = document.getElementById('errorHandler')
    let isErrorVisible = false

    const addBet = () => {
        if(currentSelection === 'parlay') {
            if(parseInt(stakeInputRef.current.value) > 0 && parseInt(oddsInputRef.current.value) > 0 && stakeInputRef.current.value !== "" && oddsInputRef.current.value !== "") {

                if(isErrorVisible){
                    errorHandler.classList.add('hidden')
                    isErrorVisible=false
                }

                const title = titleInputRef.current.value
                const stake = stakeInputRef.current.value
                const odds = oddsInputRef.current.value
                const id = betNumber

                const current = new Date()
                const time = `${current.getHours().toString().padStart(2,'0')}:${current.getMinutes().toString().padStart(2,'0')}:${current.getSeconds().toString().padStart(2, '0')} 
            ${current.getDate().toString().padStart(2,'0')}/${current.getMonth().toString().padStart(2,'0')}/${current.getFullYear()}`

                setBetContainers([...betContainers, {id,title,stake,odds,time}])
                localStorage.setItem('betContainers', JSON.stringify([...betContainers, {id,title,stake,odds,time}]))
                setBetNumber(betNumber + 1)
                localStorage.setItem('betNumber', betNumber+1)

                titleInputRef.current.value = ""
                stakeInputRef.current.value = ""
                oddsInputRef.current.value = ""
            }

            else if(parseInt(stakeInputRef.current.value) <= 0 || parseInt(oddsInputRef.current.value) <= 0) {
                errorHandler.innerHTML = "Stake and odds must be greater than 0"
                errorHandler.classList.remove('hidden')
                isErrorVisible=true
            }
            else if(stakeInputRef.current.value === "" || oddsInputRef.current.value === "") {
                errorHandler.innerHTML = "Stake and odds cannot be empty"
                errorHandler.classList.remove('hidden')
                isErrorVisible=true
            }
        }
        if(currentSelection === 'single') {
            console.error("Not implemented")
        }
    }

    const updateSelection = () => {
        const selection = document.getElementById('selection').value
        if(selection === 'single') {
            setSelection("single")
            document.getElementById('single').classList.remove('hidden')
            document.getElementById('parlay').classList.add('hidden')
        } else if(selection === 'parlay') {
            setSelection("parlay")
            document.getElementById('single').classList.add('hidden')
            document.getElementById('parlay').classList.remove('hidden')
        }
    }

    return (
        <>
            <div>
                <h1 className="text-center text-3xl">Gambling Tracker</h1>
                <div className="flex justify-center">
                    <div className="w-80 sm:w-[40rem] h-[0.1rem] bg-gray rounded-full"></div>
                </div>


                <h1 className="text-center text-2xl my-4">Add a new bet</h1>
                <div className="flex flex-col justify-center items-center">
                    <select
                        id="selection"
                        onChange={updateSelection}
                        className="w-[13rem] h-6 rounded-lg text-center my-2">
                        <option value="parlay">Parlay</option>
                        <option value="single">Single (Slots)</option>
                    </select>

                    <div id="single"
                         className="hidden flex flex-col justify-center items-center">
                        <input ref={titleInputRef} id="titleInput" type="text" placeholder="Title" maxLength="16"
                               className="border rounded-lg text-center"></input>
                        <input ref={stakeInputRef} id="stakeInput" type="number" placeholder="Stake" min="0"
                               className="border rounded-lg text-center my-2"></input>
                        <input ref={stakeInputRef} id="stakeInput" type="number" placeholder="Return" min="0"
                               className="border rounded-lg text-center"></input>

                    </div>

                    <div id="parlay"
                         className="flex flex-col justify-center items-center">
                        <input ref={titleInputRef} id="titleInput" type="text" placeholder="Title" maxLength="16"
                               className="border rounded-lg text-center"></input>
                        <input ref={stakeInputRef} id="stakeInput" type="number" placeholder="Stake" min="0"
                               className="border rounded-lg text-center my-2"></input>
                        <input ref={oddsInputRef} id="oddsInput" type="number" placeholder="Odds" min="1"
                               className="border rounded-lg text-center"></input>
                    </div>


                    <button onClick={addBet}
                            className="w-[13rem] h-6 rounded-lg bg-gray text-white my-2">Add Bet
                    </button>

                    <h3 id="errorHandler"
                        className="text-red-500 text-center my-2">
                    </h3>

                    <div>
                        <h1 className="text-center text-2xl mt-4">Recent Bets</h1>



                        <div className="flex justify-center">
                            <div className="w-80 sm:w-[40vw] h-[0.2vh] bg-gray rounded-full mb-4"></div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse">
                        {betContainers.map((bet, index) => (
                            <BetContainer betType={bet.betType}
                                          key={index}
                                          id={bet.id}
                                          title={bet.title === "" ? `Untitled Bet ${bet.id}` : bet.title}
                                          stake={bet.stake} odds={bet.odds}
                                          time={bet.time}
                                          onDeleteBet={handleDeleteBet}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
