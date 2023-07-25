import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Search from './Search'
import { useContext, useEffect, useState } from 'react';
import { context } from "../../store/store";
import { ChatContext } from "../../store/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState();
  const { currentUser } = useContext(context);
  const { dispatch } = useContext(ChatContext);

  useEffect(()=>{
    const getChats = () => {            
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => { 
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    }

    currentUser.uid && getChats();
  },[currentUser.uid])

  const handleSelect = (user) => {
    dispatch({type: "Change_User", payload: user})
  }

  return (
    <div className='chats'>
        <Search />
        <div className="chats-container">
          {chats && Object.entries(chats)?.sort((a,b) => (b[1].date - a[1].date)).map(chat => 
            (
              <div className='single-chat' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="use image" />
                <div className="username-lastMessage">
                    <span className="username">{chat[1].userInfo.displayName}</span>
                    <span className="last-msg">{chat[1].lastMessage}</span>
                </div>
              </div>
              // <SingleChat onClick={() => handleSelect(chat[1].userInfo)} key={chat[0]} img={chat[1].userInfo.photoURL} name={chat[1].userInfo.displayName} lastMessage={"hello"} date={chat[1].date}/>
            ))}
            
            
        </div>
    </div>
  )
}

export default Chats