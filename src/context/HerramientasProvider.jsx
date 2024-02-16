import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const HerramientasContext = createContext();

const HerramientasProvider = ({children}) => {


  

    return (
        <HerramientasContext.Provider
            value={{

            }}
        >{children}
        </HerramientasContext.Provider>
    )
}
export { 
    HerramientasProvider
}

export default HerramientasContext