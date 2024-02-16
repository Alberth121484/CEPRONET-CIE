import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PrestamosContext = createContext();

const PrestamosProvider = ({children}) => {
    const [movimientos, setMovimientos] = useState([]);

    const { auth } = useAuth()
    const navigate = useNavigate();

    const obtenerPrestamos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
    
            const url = `/prestamos`;
    
            const { data } = await clienteAxios(url, config);
            setMovimientos(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PrestamosContext.Provider
            value={{
                movimientos,
                setMovimientos,
                obtenerPrestamos,
            }}
        >{children}
        </PrestamosContext.Provider>
    )
}
export { 
    PrestamosProvider
}

export default PrestamosContext