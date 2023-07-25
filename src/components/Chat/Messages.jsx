import camera  from "../../img/cam.png"
import add from "../../img/add.png"
import more from '../../img/more.png'
import Input from "./Input";
import Message from "./Message"
import { useContext, useEffect, useState, useRef } from "react";
import {MenuContext} from '../../store/MenuContext'
import { ChatContext } from "../../store/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Messages = () => {
  const [messages, setMessages] = useState([])
  const { dispatch } = useContext(MenuContext);
  const { state } = useContext(ChatContext);
  const ref = useRef();


  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unsub();
    }
  }, [state.chatId])


  const scrollToBottom = () => {
    var element = document.getElementById('messagesBody');
    element.scrollTo({top:element.scrollHeight, left: 0, behavior: "smooth"});
  }

  return (
    <div className='messages'>
        <div className="msg-navbar">
          <span className="open" onClick={()=> dispatch({type: "toggleMenu"})}>
            <FontAwesomeIcon icon={faBars} />
          </span>
            <p className="person-name">
                {state.user.displayName}
            </p>

            <div className="data-options">
                <img src={camera} alt="video" />
                <img src={add} alt="add" />
                <img src={more} alt="more" />
            </div>
        </div>

        <div ref={ref} id="messagesBody" className="messages-body">
        {messages.length ? messages.map((message) => {
            return <Message scroll={scrollToBottom} key={message.id} message={message}/>
        }) : ""}
        </div>
        <Input scroll={scrollToBottom}/>
    </div>
  )
}

export default Messages