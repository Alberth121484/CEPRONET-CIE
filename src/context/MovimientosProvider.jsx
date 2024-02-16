import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { formatearFecha } from '../helpers/formatearFecha';

const MovimientosContext = createContext();

const MovimientosProvider = ({ children }) => {
    const [movimientos, setMovimientos] = useState([]);
    const [movimiento, setMovimiento] = useState({});
    const [alerta, setAlerta] = useState({});
    const [selectedNegocio, setSelectedNegocio] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Initialize with current month
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initialize with current year

    const { auth } = useAuth()
    const navigate = useNavigate();

    const obtenerMovimientos = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
    
            // Construir la URL con los filtros si están presentes
            const queryParams = {
                ...(selectedNegocio && { negocio: selectedNegocio }),
                anio: selectedYear,
                mes: selectedMonth,
            };
    
            const queryString = Object.keys(queryParams)
                .filter(key => queryParams[key] !== undefined)
                .map(key => `${key}=${queryParams[key]}`)
                .join('&');
    
            const url = `/movimientos${queryString ? `?${queryString}` : ''}`;
    
            const { data } = await clienteAxios(url, config);
            setMovimientos(data);
        } catch (error) {
            console.error(error);
        }
    };
    

    useEffect(() => {
        obtenerMovimientos(selectedYear, selectedMonth);
    }, [auth, selectedNegocio, selectedYear, selectedMonth]);

    // Agrega esta función para calcular la diferencia en días entre dos fechas
    const calcularDiferenciaEnDias = (fecha1, fecha2) => {
        const diferenciaEnMilisegundos = Math.abs(fecha1 - fecha2);
        return Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
    };

    const esEditable = (fechaMovimiento) => {
        const fechaActual = new Date();
        const diferenciaEnDias = calcularDiferenciaEnDias(fechaActual, new Date(fechaMovimiento));
    
        // Mostrar en la consola para depuración
        //console.log('Fecha Movimiento:', fechaMovimiento);
        //console.log('Fecha Actual:', fechaActual);
        //console.log('Diferencia en Días:', diferenciaEnDias);
    
        return diferenciaEnDias <= 35;
    };
    const submitMovimiento = async (rowData) => {
        if (rowData._id) {
            const editable = esEditable(rowData.fecha);
            if (!editable) {
                // Manejar el caso en que el movimiento no es editable (por ejemplo, mostrar un mensaje)
                console.log('Movimiento no editable');
                return;
            }
            // Continuar con la edición del movimiento
            const movimiento = {
                "id": rowData._id,
                "fecha": rowData.fecha,
                "negocio": rowData.selectedNegocio || rowData.negocio,
                "cuenta": rowData.selectedCuenta ? rowData.selectedCuenta : rowData.cuenta,
                "subcuenta": rowData.selectedSubcuenta ? rowData.selectedSubcuenta : rowData.subcuenta,
                "concepto": rowData.selectedConcepto ? rowData.selectedConcepto : rowData.concepto,
                "proveedor": rowData.selectedProveedor ? rowData.selectedProveedor : rowData.proveedor,
                "comentarios": rowData.comentarios,
                "ingreso": rowData.ingreso,
                "egreso": rowData.egreso
            };
            await editarMovimiento(movimiento);
        } else {
          
            // Para nuevos movimientos, también verifica la fecha
            const editable = esEditable(rowData.fecha);
            if (!editable) {
                // Manejar el caso en que el nuevo movimiento no está permitido (por ejemplo, mostrar un mensaje)
                console.log('Nuevo movimiento no permitido');
                return;
            }
            // Continuar con la creación del movimiento
            const movimiento = {
                "fecha": rowData.fecha,
                "negocio": rowData.negocio,
                "cuenta": rowData.selectedCuenta,
                "subcuenta": rowData.selectedSubcuenta,
                "concepto": rowData.selectedConcepto,
                "proveedor": rowData.selectedProveedor,
                "comentarios": rowData.comentarios,
                "ingreso": rowData.ingreso,
                "egreso": rowData.egreso
            };
            await nuevoMovimiento(movimiento);
            }
    };
    const editarMovimiento = async movimiento => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/movimientos/${movimiento.id}`, movimiento, config)

            setAlerta({});

            //Actualiza el DOM
            setMovimientos((prevMovimientos) => {
                const nuevosMovimientos = prevMovimientos.map((movimientoState) =>
                    movimientoState._id === data.id ? data : movimientoState
                );

                return nuevosMovimientos;
            });

            setAlerta({
                msg: 'Movimiento Actualizado Correctamente',
                error: false
            })
        } catch (error) {
            // Mostrar en la consola para depuración
            console.log('Error en editarMovimiento:', error);
        }
    };

    const nuevoMovimiento = async movimiento => {
        console.log(movimiento);
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/movimientos', movimiento, config)
            console.log(data);

            setMovimientos((movimientos) => [...movimientos, data]);

            setAlerta({
                msg: 'Movimiento Creado Correctamente',
                error: false
            })
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarMovimiento = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/movimientos/${id}`, config)
            //const data = {msg:"Negocio eliminado correctamente."}
            setAlerta({
                msg: data.msg,
                error: false
            });

            // Sincronizar el state
            const movimientosActualizados = cuentas.filter(movimientoState => movimientoState._id !== id)
            setMovimientos(movimientosActualizados)
        } catch (error) {
            console.log('Error en el setTimeout:', error);
        }
    }

    const obtenerMovimiento = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/movimientos/${id}`, config)
            setMovimiento(data)
            setAlerta({})
        } catch (error) {
            navigate('/movimientos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const obtenerNegocios = async negocios => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/negocios', config);
            return { data };

        } catch (error) {
            console.log(error)
        }
    };

    const obtenerCuentas = async cuentas => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/cuentas', config);
            return { data };

        } catch (error) {
            console.log(error)
        }
    };

    const obtenerSubcuenta = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/subcuentas/${id}`, config)
            setCuenta(data)
            setAlerta({})
        } catch (error) {
            navigate('/subcuentas')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } finally {
            setCargando(false)
        }
    }

    return (
        <MovimientosContext.Provider
            value={{
                movimientos,
                movimiento,
                obtenerNegocios,
                obtenerCuentas,
                alerta,
                obtenerSubcuenta,
                setMovimientos,
                submitMovimiento,
                eliminarMovimiento,
                selectedNegocio,
                setSelectedNegocio,
                selectedYear,
                setSelectedYear,
                selectedMonth,
                setSelectedMonth,
                esEditable,
            }}
        >{children}
        </MovimientosContext.Provider>
    )
}
export {
    MovimientosProvider
}

export default MovimientosContext