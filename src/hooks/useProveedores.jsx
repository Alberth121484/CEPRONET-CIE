import { useContext } from 'react'
import ProveedoresContext from '../context/ProveedoresProvider'



const useProveedores = () => {
    return useContext(ProveedoresContext)
}

export default useProveedores