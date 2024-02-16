import { useContext } from 'react'
import TiposContext from '../context/TiposProvider'



const useTipos = () => {
    return useContext(TiposContext)
}

export default useTipos