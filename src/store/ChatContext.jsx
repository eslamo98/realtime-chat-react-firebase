import { createContext, useReducer, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { context } from "./store";

export const ChatContext = createContext()


const initialState = {
    chatId: "null",
    user: {}
}


export default function ChatContextProvider({children}) {
    const { currentUser } = useContext(context);
    
    const reducer = (state, action) => {
        switch(action.type) {
            case "Change_User":
                return {
                    chatId: currentUser.uid > action.payload.uid ? 
                    currentUser.uid + action.payload.uid : 
                    action.payload.uid + currentUser.uid,
                    user: action.payload
                }
            default:
                return state;
        }
    }
   
    const [state, dispatch] = useReducer(reducer,initialState);
    return (
    <ChatContext.Provider value={{state, dispatch}}>
        {children}
    </ChatContext.Provider>
    );
}