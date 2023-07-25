import Sidebar from "../../components/Sidebar/Sidebar"
import Messages from "../../components/Chat/Messages"

import "./home.css"

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
      <Sidebar />
      <Messages />
      </div>
    </div>
  )
}

export default Home