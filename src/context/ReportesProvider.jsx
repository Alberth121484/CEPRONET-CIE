import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { formatearFecha } from '../helpers/formatearFecha';
import { formatoFechaReporte } from '../helpers/formatoFechaReporte';

const ReportesContext = createContext();

const ReportesProvider = ({children}) => {
    const { auth } = useAuth()
const navigate = useNavigate();
    let [reportes, setReportes] = useState([]);
    let [reporte, setReporte] = useState({});
    let [startDate, setStartDate] = useState(new Date());
    let [endDate, setEndDate] = useState(new Date());
    let [selectedNegocio, setSelectedNegocio] = useState('');
    let [selectedCuenta, setSelectedCuenta] = useState('');
    let [selectedSubcuenta, setSelectedSubcuenta] = useState('');
    let [selectedConcepto, setSelectedConcepto] = useState('');
    let [selectedProveedor, setSelectedProveedor] = useState('');
    let [selectedBanco, setSelectedBanco] = useState('');

    let obtenerReportes = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            let fechaInicio = formatoFechaReporte(startDate);
            let fechaFin = formatoFechaReporte(endDate);
            let negocio = selectedNegocio;
            let cuenta = selectedCuenta;
            let subcuenta = selectedSubcuenta;
            let concepto = selectedConcepto;
            let proveedor = selectedProveedor;
            let banco = selectedBanco;

            let url = `/reportes`;
                if(fechaInicio && fechaFin){
                    url += `?inicio=${fechaInicio}&fin=${fechaFin}`;
                }
                if (negocio) {
                    url += `&negocio=${negocio}`;
                }
                if (cuenta) {
                    url += `&cuenta=${cuenta}`;
                }
                if (subcuenta) {
                    url += `&subcuenta=${subcuenta}`;
                }
                if (concepto) {
                    url += `&concepto=${concepto}`;
                }
                if (proveedor) {
                    url += `&proveedor=${proveedor}`;
                }
                if (banco) {
                    url += `&banco=${banco}`;
                }
    
            let { data } = await clienteAxios(url, config);
            setReportes(data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("useEffect ejecutado");
        obtenerReportes();
    }, [auth, startDate, endDate, selectedNegocio, selectedCuenta, selectedSubcuenta, selectedConcepto, selectedProveedor, selectedBanco]);

    return (
        <ReportesContext.Provider
            value={{
              obtenerReportes,
              reportes,
              setReportes,
              endDate,
              setEndDate,
              startDate,
              setStartDate,
              selectedNegocio, 
              setSelectedNegocio,
              selectedCuenta, 
              setSelectedCuenta,
              selectedSubcuenta, 
              setSelectedSubcuenta,
              selectedConcepto, 
              setSelectedConcepto,
              selectedProveedor, 
              setSelectedProveedor,
              selectedBanco, 
              setSelectedBanco,
            }}
        >{children}
        </ReportesContext.Provider>
    )
}
export { 
    ReportesProvider
}

export default ReportesContext