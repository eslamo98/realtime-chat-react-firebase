import { createContext, useReducer } from "react";


export const MenuContext = createContext()
const reducer = (state, action) => {
    switch(action.type) {
        case 'toggleMenu':
            return {isOpen: !state.isOpen};
        default:
            return state;
    }
}

export default function MenuProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {isOpen: false});

    return (
    <MenuContext.Provider value={{state, dispatch}}>
        {children}
    </MenuContext.Provider>
    );
}