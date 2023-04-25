import { createContext, useEffect, useReducer } from "react"
const INITTAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user" || null))
    
}
export const AuthContext = createContext(INITTAL_STATE)

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITTAL_STATE);
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.currentUser))
    }, [state.currentUser])

    return(
        <AuthContext.Provider value={{currentUser:state.currentUser, dispatch}}>{children}</AuthContext.Provider>
    )
}
