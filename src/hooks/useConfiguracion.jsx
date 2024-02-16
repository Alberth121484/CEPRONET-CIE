import { useContext } from 'react'
import ConfiguracionesContext from '../context/ConfiguracionesProvider'



const useConfiguracion = () => {
    return useContext(ConfiguracionesContext)
}

export default useConfiguracion