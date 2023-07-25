import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import Button from "../../components/Button/Button";
import attach from '../../img/attach.png';
import photo from "../../img/addAvatar.png"
import { context } from "../../store/store";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../store/ChatContext";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const Input = ({scroll}) => {

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  
  const { currentUser } = useContext(context);
  const { state } = useContext(ChatContext);

  useEffect(()=>{
    scroll();
  },[])
  
  const handleSend = async () => {
    scroll();

    
    if(image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on((error) => {
        // setError(true);
    }, 
    () => {

        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", state.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text, 
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL,
            })
        });
        });
    });
    } else {
      await updateDoc(doc(db, "chats", state.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text, 
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      });
    }
    
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [state.chatId+".lastMessage"]: text,
      [state.chatId+".date"]: serverTimestamp()
    })
    
    await updateDoc(doc(db, "userChats", state.user.uid), {
      [state.chatId+".lastMessage"]: text,
      [state.chatId+".date"]: serverTimestamp()
    })
    
    setImage(null)
    setText("")
  }

  return (
    <div className='message-input'>
      <input 
      type="text" 
      placeholder='Type your message'
      value={text}
      onChange={event=>{setText(event.target.value)}}
      />
      <div className="controlers">
        <img src={attach} alt="" />
        <input type="file" id='file' onChange={event=> {setImage(event.target.files[0])}}/>
        <label className='add-avatar' htmlFor="file">
            <img src={photo} width="20" alt="add pic" /> 
        </label>
        <Button type="button" text="Send" onClick={handleSend}/>
      </div>
    </div>
  )
}

export default Input