import { useContext } from 'react'
import SubcuentasContext from '../context/SubcuentasProvider'



const useSubcuentas = () => {
    return useContext(SubcuentasContext)
}

export default useSubcuentas