import { useContext } from 'react'
import ReportesContext from '../context/ReportesProvider'



const useReportes = () => {
    return useContext(ReportesContext)
}

export default useReportes