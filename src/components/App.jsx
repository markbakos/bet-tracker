import {Link, Outlet, useLocation} from "react-router-dom"

function App() {
    const location = useLocation()
    const {pathname} = location
    const splitLocation = pathname.split("/")

  return (
    <>
      <div>
          <nav className="w-screen text-center flex flex-row justify-center">
              <div className={`w-[20vw] h-[5vh] flex items-center justify-center my-4 rounded-lg ${splitLocation[1] === "" ? "active" : ""}`}>
                      <Link to="/">Home</Link>
              </div>
              <div
                  className={`w-[20vw] h-[5vh] flex items-center justify-center my-4 rounded-lg ${splitLocation[1] === "stats" ? "active" : ""}`}>
                  <Link to="/stats">Stats</Link>
              </div>
          </nav>
          <Outlet/>
      </div>
    </>
  )
}

export default App
