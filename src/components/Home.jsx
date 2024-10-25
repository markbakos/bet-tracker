import { useState, useRef, useEffect } from "react";

import BetContainer from "@/components/BetContainer.jsx";
import SingleBetContainer from "@/components/SingleBetContainer.jsx";

function Home() {

    const [betNumber, setBetNumber] = useState(1)
    const [betContainers, setBetContainers] = useState([])

    const [singleBetNumber, setSingleBetNumber] = useState(1)
    const [singleBetContainers, setSingleBetContainers] = useState([])

    const titleInputRef = useRef(null)
    const stakeInputRef = useRef(null)
    const oddsInputRef = useRef(null)

    const singletitleInputRef = useRef(null)
    const singlestakeInputRef = useRef(null)
    const singlereturnInputRef = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('betContainers')) {
            setBetContainers(JSON.parse(localStorage.getItem('betContainers')))
        }
        if (localStorage.getItem('betNumber')) {
            setBetNumber(JSON.parse(localStorage.getItem('betNumber')))
        }

        if (localStorage.getItem('singleBetContainers')) {
            setSingleBetContainers(JSON.parse(localStorage.getItem('singleBetContainers')))
        }
        if (localStorage.getItem('singleBetNumber')) {
            setSingleBetNumber(JSON.parse(localStorage.getItem('singleBetNumber')))
        }

        if(localStorage.getItem('containerSelected') === 'single') {
            document.getElementById('selection').value = 'single'
            updateSelection()
        }
        else{
            document.getElementById('selection').value = 'parlay'
            updateSelection()
        }
    }, [])

    useEffect(() => {
        const totalStake = betContainers.reduce((acc, bet) => acc + parseInt(bet.stake), 0);
        localStorage.setItem('totalStake', totalStake);
    }, [betContainers]);

    useEffect(() => {
        const totalSingleStake = singleBetContainers.reduce((acc, bet) => acc + parseInt(bet.stake), 0);
        localStorage.setItem('totalSingleStake', totalSingleStake);
    }, [singleBetContainers])

    const errorHandler = document.getElementById('errorHandler')
    let isErrorVisible = false
    const [currentSelection, setSelection] = useState("parlay")

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
            ${current.getDate().toString().padStart(2,'0')}/${(current.getMonth()+1).toString().padStart(2,'0')}/${current.getFullYear()}`

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
            if(parseInt(singlestakeInputRef.current.value) > 0 && parseInt(singlereturnInputRef.current.value) >= 0 && singlestakeInputRef.current.value !== "" && singlereturnInputRef.current.value !== "") {

                if(isErrorVisible){
                    errorHandler.classList.add('hidden')
                    isErrorVisible=false
                }

                const title = singletitleInputRef.current.value
                const stake = singlestakeInputRef.current.value
                const returned = singlereturnInputRef.current.value
                const singleID = singleBetNumber

                const current = new Date()
                const time = `${current.getHours().toString().padStart(2,'0')}:${current.getMinutes().toString().padStart(2,'0')}:${current.getSeconds().toString().padStart(2, '0')} 
            ${current.getDate().toString().padStart(2,'0')}/${(current.getMonth()+1).toString().padStart(2,'0')}/${current.getFullYear()}`

                setSingleBetContainers([...singleBetContainers, {singleID,title,stake,returned,time}])
                localStorage.setItem('singleBetContainers', JSON.stringify([...singleBetContainers, {singleID,title,stake,returned,time}]))
                setSingleBetNumber(singleBetNumber + 1)
                localStorage.setItem('singleBetNumber', singleBetNumber+1)

                singletitleInputRef.current.value = ""
                singlestakeInputRef.current.value = ""
                singlereturnInputRef.current.value = ""
            }

            else if(parseInt(singlestakeInputRef.current.value) < 0 || parseInt(singlereturnInputRef.current.value) < 0) {
                errorHandler.innerHTML = "Stake and odds must be greater than 0"
                errorHandler.classList.remove('hidden')
                isErrorVisible=true
            }
            else if(singlestakeInputRef.current.value === "" || singlereturnInputRef.current.value === "") {
                errorHandler.innerHTML = "Stake and odds cannot be empty"
                errorHandler.classList.remove('hidden')
                isErrorVisible=true
            }
        }
    }

    const handleDeleteBet = (id) => {
        const updatedBets = betContainers.filter((bet) => bet.id !== id)
        setBetContainers(updatedBets)
        localStorage.setItem('betContainers', JSON.stringify(updatedBets))
    }

    const handleDeleteSingleBet = (id) => {
        const updatedBets = singleBetContainers.filter((bet) => bet.singleID !== id)
        setSingleBetContainers(updatedBets)
        localStorage.setItem('singleBetContainers', JSON.stringify(updatedBets))
    }


    const updateSelection = () => {
        const selection = document.getElementById('selection').value
        if(selection === 'single') {
            setSelection("single")
            localStorage.setItem('containerSelected', 'single')
            document.getElementById('single').classList.remove('hidden')
            document.getElementById('singleContainer').classList.remove('hidden')
            document.getElementById('parlay').classList.add('hidden')
            document.getElementById('parlayContainer').classList.add('hidden')
        } else if(selection === 'parlay') {
            setSelection("parlay")
            localStorage.setItem('containerSelected', 'parlay')
            document.getElementById('single').classList.add('hidden')
            document.getElementById('singleContainer').classList.add('hidden')
            document.getElementById('parlay').classList.remove('hidden')
            document.getElementById('parlayContainer').classList.remove('hidden')
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
                        <input ref={singletitleInputRef} id="titleInput" type="text" placeholder="Title" maxLength="16"
                               className="border rounded-lg text-center"></input>
                        <input ref={singlestakeInputRef} id="stakeInput" type="number" placeholder="Stake" min="0"
                               className="border rounded-lg text-center my-2"></input>
                        <input ref={singlereturnInputRef} id="returnInput" type="number" placeholder="Return" min="0"
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
                    <div id="parlayContainer"
                        className="flex flex-col-reverse">
                        {betContainers.map((bet, index) => (
                            <BetContainer betType={bet.betType}
                                          key={index}
                                          id={bet.id}
                                          title={bet.title === "" ? `Untitled Bet ${bet.id}` : bet.title}
                                          stake={bet.stake}
                                          odds={bet.odds}
                                          time={bet.time}
                                          onDeleteBet={handleDeleteBet}
                            />
                        ))}
                    </div>
                    <div id="singleContainer"
                         className="hidden flex flex-col-reverse">
                        {singleBetContainers.map((bet, index) => (
                            <SingleBetContainer betType={bet.betType}
                                                key={index}
                                                id={bet.singleID}
                                                title={bet.title === "" ? `Untitled Bet ${bet.singleID}` : bet.title}
                                                stake={bet.stake}
                                                returned={bet.returned}
                                                time={bet.time}
                                                onDeleteBet={handleDeleteSingleBet}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home
