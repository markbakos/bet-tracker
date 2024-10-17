
function Stats() {

    const resetData = () => {
        localStorage.clear()
    }

    return (
        <>
            <div className="flex justify-center">
                <button
                    onClick={resetData}
                    className="w-[20vw] h-[5vh] flex items-center justify-center bg-gray text-white my-4 rounded-lg">Delete Data</button>
            </div>
        </>
    )
}

export default Stats
