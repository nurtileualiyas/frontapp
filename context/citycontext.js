import Cookies from 'js-cookie'
import React, { useState } from 'react'

export const CityContext = React.createContext()

export const CityProvider = (props) => {
    const [city, setCity] = useState(null)

    const setCityCookie = (cityId) => {
        Cookies.set('cityId', cityId) // prob have to specify options as expire date, origin and more 
    }

    const value = {
        city,
        setCity,
        setCityCookie
    };

    return <CityContext.Provider value={value}>{props.children}</CityContext.Provider>
}
