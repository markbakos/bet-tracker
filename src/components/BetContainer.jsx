
function BetContainer({title, stake, odds, time}) {
    const toWin = (stake * odds).toLocaleString()
    return (
        <>
            <div className="w-[90vw] h-[14vh] flex flex-col bg-gray text-white rounded-lg my-1 p-2">
                <div className="flex flex-row justify-between">
                   <h1>{title} </h1>
                <p className="text-end">Stake: {stake} x{odds}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-sm text-end">{time}</p>
                    <p>To Win: {toWin}</p>
                </div>
                <div className="flex flex-row">
                    <div className="w-[8vw] h-[4.5vh] bg-white rounded-full mr-2">

                    </div>
                    <div className="w-[8vw] h-[4.5vh] bg-white rounded-full mr-2">

                    </div>
                    <div className="w-[8vw] h-[4.5vh] bg-white rounded-full mr-2">

                    </div>

                </div>
            </div>
        </>
    )
}

export default BetContainer
