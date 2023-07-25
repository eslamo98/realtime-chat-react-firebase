import { createContext, useReducer, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const context = createContext()
// const reducer = (state, action) => {
//     switch(action.type) {
//         case 'toggleMenu':
//             return {...state, isOpen: !state.isOpen};
//         default:
//             return state;
//     }
// }

export default function Store({children}) {
        const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const cleanUp = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })
        
        return () => {
            cleanUp();
        }
    }, []);
    return (
    <context.Provider value={{ currentUser }}>
        {children}
    </context.Provider>
    );
}