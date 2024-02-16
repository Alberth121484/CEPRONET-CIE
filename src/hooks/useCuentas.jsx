import { useContext } from 'react'
import CuentasContext from '../context/CuentasProvider'



const useCuentas = () => {
    return useContext(CuentasContext)
}

export default useCuentas