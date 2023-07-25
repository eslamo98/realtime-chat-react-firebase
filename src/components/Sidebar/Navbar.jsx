import { useContext } from "react";
import {MenuContext} from '../../store/MenuContext'
import { context } from "../../store/store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () => {

  const { dispatch } = useContext(MenuContext);
  const {  currentUser} = useContext(context);

  return (
    <nav>
        <p className="logo">Eslamo Chat</p>
        <div className="personal-info">
            <img src={currentUser?.photoURL} alt="Profile picture" />
            <span>{currentUser?.displayName} </span>
        </div>
        <button onClick={() => {signOut(auth)}} className='btn-logout'>Logout</button>
        <span className="close" onClick={()=> dispatch({type: "toggleMenu"})}>X</span>
    </nav>
  )
}

export default Navbar