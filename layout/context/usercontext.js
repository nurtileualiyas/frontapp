import React, { useState } from 'react'

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const onTokenChange = (token) => {
        setToken(token)
        console.log(token, 'in context');
    }

    const onUserChange = (user) => {
        setUser(user)
        console.log(user, 'in context');
    }

    const value = {
        user,
        setUser,
        token,
        setToken,
        onTokenChange,
        onUserChange,
    }

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
};
