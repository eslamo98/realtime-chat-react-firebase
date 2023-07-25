import { useContext, useEffect, useRef } from "react"
import { context } from "../../store/store"
import { ChatContext } from "../../store/ChatContext";

const Message = ({ message, scroll}) => {
  
  const ref = useRef()
  const { currentUser } = useContext(context);
  const { state } = useContext(ChatContext);

  useEffect(()=> {
    ref.current?.scrollIntoView({behavior: "smooth"})
    scroll()
  },[message])

  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="message-info">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : state.user.photoURL} alt="profile img" />
            <span>{message.senderId === currentUser.uid ? currentUser.displayName : state.user.displayName}</span>
        </div>
        <div className="message-content">
            <p className="message-body">
                {message.text}
            </p>
            {message.img && <img src={message.img} width="150" alt="photo message" />}
        </div>
    </div>
  )
}

export default Message