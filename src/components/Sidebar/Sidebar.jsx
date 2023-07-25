import React from 'react'
import Navbar from './Navbar'
import Chats from './Chats'
import { useContext } from "react";
import {MenuContext} from '../../store/MenuContext'



const Sidebar = () => {

  const {state: {isOpen}} = useContext(MenuContext);


  return (
    <div className='sidebar' style={{left: isOpen ? "0" : "-100%"}}>
        <Navbar />
        <Chats />
    </div>
  )
}

export default Sidebar