import { useContext } from 'react'
import HerramientasContext from '../context/HerramientasProvider'



const useHerramientas = () => {
    return useContext(HerramientasContext)
}

export default useHerramientas