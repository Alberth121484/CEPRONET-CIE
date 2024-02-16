import { useContext } from 'react'
import NegociosContext from '../context/NegociosProvider'



const useNegocios = () => {
    return useContext(NegociosContext)
}

export default useNegocios