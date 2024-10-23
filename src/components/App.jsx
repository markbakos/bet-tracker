import {Link, Outlet, useLocation} from "react-router-dom"

function App() {
    const location = useLocation()
    const {pathname} = location
    const splitLocation = pathname.split("/")

  return (
    <>
      <div>
          <nav className="w-screen text-center flex flex-row justify-center">
              <Link to="/"> <div className={`w-[5rem] sm:w-[20rem] h-[2.5rem] flex items-center justify-center my-4 rounded-lg ${splitLocation[1] === "" ? "active" : ""}`}>
                      Home
              </div></Link>
              <Link to="/stats"><div
                  className={`w-[5rem] sm:w-[20rem] h-[2.5rem] flex items-center justify-center my-4 rounded-lg ${splitLocation[1] === "stats" ? "active" : ""}`}>
                  Stats
              </div></Link>
          </nav>
          <Outlet/>
      </div>
    </>
  )
}

export default App
