import { useContext } from 'react'
import BancosContext from '../context/BancosProvider'



const useBancos = () => {
    return useContext(BancosContext)
}

export default useBancos