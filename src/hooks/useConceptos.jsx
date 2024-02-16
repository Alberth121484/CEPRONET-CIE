import { useContext } from 'react'
import ConceptosContext from '../context/ConceptosProvider'



const useConceptos = () => {
    return useContext(ConceptosContext)
}

export default useConceptos