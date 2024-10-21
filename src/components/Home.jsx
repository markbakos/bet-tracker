import { useState, useRef, useEffect } from "react";

import BetContainer from "@/components/BetContainer.jsx";

function Home() {

    const [betNumber, setBetNumber] = useState(1)
    const [betContainers, setBetContainers] = useState([])

    const titleInputRef = useRef(null)
    const stakeInputRef = useRef(null)
    const oddsInputRef = useRef(null)

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

    const addBet = () => {
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
        stakeInputRef.current.value = "0"
        oddsInputRef.current.value = "1.0"
    }

    return (
        <>
            <div>
                <h1 className="text-center text-3xl">Gambling Tracker</h1>
                <div className="flex justify-center">
                    <div className="w-80 sm:w-[40vw] h-[0.2vh] bg-gray rounded-full"></div>
                </div>


                <h1 className="text-center text-2xl my-4">Add a new bet</h1>
                <div className="flex flex-col justify-center items-center">
                    <select className="w-[55vw] sm:w-[14.5vw] h-6 rounded-lg text-center my-2">
                        <option
                            value="parlay">Parlay</option>
                        <option value="single">Single (Slots)</option>
                    </select>

                    <div className="hidden flex flex-col justify-center items-center">
                        <input ref={titleInputRef} id="titleInput" type="text" placeholder="Slot" maxLength="16"
                               className="border rounded-lg text-center"></input>
                        <input ref={stakeInputRef} id="stakeInput" type="number" placeholder="Stake" min="0"
                               className="border rounded-lg text-center my-2"></input>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <input ref={titleInputRef} id="titleInput" type="text" placeholder="Title" maxLength="16"
                               className="border rounded-lg text-center"></input>
                        <input ref={stakeInputRef} id="stakeInput" type="number" placeholder="Stake" min="0"
                               className="border rounded-lg text-center my-2"></input>
                        <input ref={oddsInputRef} id="oddsInput" type="number" placeholder="Odds" min="1"
                               className="border rounded-lg text-center"></input>
                    </div>


                    <button onClick={addBet}
                            className="w-[55vw] sm:w-[14.5vw] h-6 rounded-lg bg-gray text-white my-2">Add Bet
                    </button>

                    <div>
                        <h1 className="text-center text-2xl mt-4">Recent Bets</h1>
                        <div className="flex justify-center">
                            <div className="w-80 sm:w-[40vw] h-[0.2vh] bg-gray rounded-full mb-4"></div>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse">
                        {betContainers.map((bet, index) => (
                            <BetContainer key={index}
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
