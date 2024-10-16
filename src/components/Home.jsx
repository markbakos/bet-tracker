import { useState, useRef } from "react";

import BetContainer from "@/components/BetContainer.jsx";

function Home() {

    const [betNumber, setBetNumber] = useState(1)
    const [betContainers, setBetContainers] = useState([])

    const titleInputRef = useRef(null)
    const stakeInputRef = useRef(null)
    const oddsInputRef = useRef(null)




    const addBet = () => {
        const title = titleInputRef.current.value
        const stake = stakeInputRef.current.value
        const odds = oddsInputRef.current.value
        const betNum = betNumber

        const current = new Date()

        const time = `${current.getHours().toString().padStart(2,'0')}:${current.getMinutes().toString().padStart(2,'0')}:${current.getSeconds().toString().padStart(2, '0')} 
        ${current.getDate().toString().padStart(2,'0')}/${current.getMonth().toString().padStart(2,'0')}/${current.getFullYear()}`

        setBetContainers([...betContainers, {betNum,title,stake,odds,time}])
        setBetNumber(betNumber + 1)
        titleInputRef.current.value = ""
        stakeInputRef.current.value = ""
        oddsInputRef.current.value = "1.0"
    }

    return (
        <>
            <div>
                <h1 className="text-center text-2xl">Gambling Tracker</h1>
                <div className="flex justify-center">
                    <div className="w-80 h-[0.2vh] bg-gray rounded-full"></div>
                </div>


                <h1 className="text-center text-2xl my-4">Add a new bet</h1>
                <div className="flex flex-col justify-center items-center">
                    <select className="w-[55vw] h-6 rounded-lg text-center my-2">
                        <option value="parlay">Parlay</option>
                        <option value="single">Single (WIP)</option>
                    </select>

                    <input ref={titleInputRef} id="titleInput" type="text" placeholder="Title" maxLength="16" className="border rounded-lg text-center"></input>
                    <input ref={stakeInputRef} id="stakeInput" type="number" placeholder="*Stake" min="0" className="border rounded-lg text-center my-2"></input>
                    <input ref={oddsInputRef} id="oddsInput" type="number" placeholder="*Odds" min="1" className="border rounded-lg text-center"></input>

                    <button onClick={addBet} className="w-[55vw] h-6 rounded-lg bg-gray text-white my-2">Add Bet</button>
                    <div className="flex flex-col flex-col-reverse">
                        {betContainers.map((bet,index) => (
                            <BetContainer key={index}
                                          title={bet.title === "" ? `Untitled Bet ${bet.betNum}` : bet.title}
                                          stake={bet.stake} odds={bet.odds}
                                          time={bet.time}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
