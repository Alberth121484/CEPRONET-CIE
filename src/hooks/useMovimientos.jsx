import { useContext } from 'react'
import MovimientosContext from '../context/MovimientosProvider'



const useMovimientos = () => {
    return useContext(MovimientosContext)
}

export default useMovimientos