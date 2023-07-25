import { collection, query, where, getDocs, getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { context } from "../../store/store";
import { useContext } from "react";
import { ChatContext } from "../../store/ChatContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(context);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    // Create a query against the collection.
    const q =  query(collection(db, "users"), where("displayName", "==", userName));
    
        try {
          setErr(false)
          const querySnapshot = await getDocs(q);
          if(querySnapshot.empty) {
            setErr(true)
            setUser(null)
          } else {
            setErr(false);
            querySnapshot.forEach((doc) => {
              setUser(doc.data());
            });
          }
        } catch (error) {
          setErr(true)
        }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async (user) => {
    // this id will be for the chats collection
    const combinedId = 
    currentUser.uid > user.uid ? 
    currentUser.uid + user.uid : 
    user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if(!res.exists()) {
        // create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {messages: []});

        await updateDoc(doc(db,"userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },

          [combinedId+".date"]: serverTimestamp()
        })


        await updateDoc(doc(db,"userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },

          [combinedId+".date"]: serverTimestamp()
        })

        dispatch({type: "Change_User", payload: user})
        setUser(null);
        setUserName("");
      } else {}
    } catch (error) {
      
    }
  }


  return (
    <>
        <div className="find-user">
          
            <input 
            type="text" 
            name="chat-user" 
            value={userName}
            placeholder='Find user' 
            onKeyDown={handleKey}
            onChange={(e) => { setUserName(e.target.value)}}
            />
            {err && <div style={{padding: "15px"}}>User not found!</div>}
            {user && <div className='single-chat' onClick={() => handleSelect(user)}>
                <img src={user.photoURL} alt="use image" />
                <div className="username-lastMessage">
                    <span className="username">{user.displayName}</span>
                </div>
            </div>}
        </div>
    </>
  )
}

export default Search