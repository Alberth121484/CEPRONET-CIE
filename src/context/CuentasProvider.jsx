import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const CuentasContext = createContext();

const CuentasProvider = ({children}) => {

    const [cuentas, setCuentas] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [cuenta, setCuenta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioCuenta, setModalFormularioCuenta] = useState(false);
    const [modalEliminarCuenta, setModalEliminarCuenta] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerCuentas = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/cuentas', config)
                setCuentas(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerCuentas()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitCuenta = async cuenta => {
  
        if(cuenta?.id) {
            await editarCuenta(cuenta);
        } else {
            await nuevoCuenta(cuenta);
        }
    }

    const obtenerTipos = async tipos => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/tipos', config);
            return {data};

        } catch (error) {
            console.log(error)
        }
    };

    const obtenerBancos = async bancos => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/bancos', config);
            return {data};

        } catch (error) {
            console.log(error)
        }
    };

    const editarCuenta = async cuenta => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/cuentas/${cuenta.id}`, cuenta, config)

            setAlerta({});
            setModalFormularioCuenta(false);
            
            //Actualiza el DOM
            setCuentas((prevCuentas) => {
                const nuevosCuentas = prevCuentas.map((cuentaState) =>
                  cuentaState._id === data.id ? data : cuentaState
                );
        
                return nuevosCuentas;
              });

            setAlerta({
                msg: 'Cuenta Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarCuenta = cuenta => {
        setCuenta(cuenta);
        setModalFormularioCuenta(true);
    }

    const nuevoCuenta = async cuenta => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/cuentas', cuenta, config)

            setCuentas((cuentas) => [...cuentas, data]);

            setAlerta({
                msg: 'Cuenta Creado Correctamente',
                error: false
            })
            setModalFormularioCuenta(!modalFormularioCuenta);
            setTimeout(() => {
                setAlerta({});
                
                
                // Esperar un breve período antes de recargar la página
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }, 3000);
            
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerCuenta = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/cuentas/${id}`, config )
            setCuenta(data)
            setAlerta({})
        } catch (error) {
            navigate('/cuentas')
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

    const eliminarCuenta = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/cuentas/${id}`, config)
            //const data = {msg:"Negocio eliminado correctamente."}
            setAlerta({
                msg: data.msg,
                error: false
            });

            // Sincronizar el state
            const cuentasActualizados = cuentas.filter(cuentaState => cuentaState._id !== id )
            setCuentas(cuentasActualizados)
            setModalEliminarCuenta(!modalEliminarCuenta);
            } catch (error) {
                console.log('Error en el setTimeout:', error);
            }
    }

    const handleModalCuenta = () => {
        setModalFormularioCuenta(!modalFormularioCuenta);
        setCuenta({});
    };

    const handleModalEliminarCuenta = cuenta => {
        setCuenta(cuenta);
        setModalEliminarCuenta(!modalEliminarCuenta);
    }
  

    return (
        <CuentasContext.Provider
            value={{
                cuentas,
                mostrarAlerta,
                alerta,
                editarCuenta,
                obtenerCuenta,
                eliminarCuenta,
                submitCuenta,
                modalFormularioCuenta,
                handleModalCuenta,
                handleModalEditarCuenta,
                cuenta,
                modalEliminarCuenta,
                handleModalEliminarCuenta,
                cargando,
                obtenerTipos,
                obtenerBancos
            }}
        >{children}
        </CuentasContext.Provider>
    )
}
export { 
    CuentasProvider
}

export default CuentasContext