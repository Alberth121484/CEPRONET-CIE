import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const SubcuentasContext = createContext();

const SubcuentasProvider = ({children}) => {

    const [subcuentas, setSubcuentas] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [subcuenta, setSubcuenta] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioSubcuenta, setModalFormularioSubcuenta] = useState(false);
    const [modalEliminarSubcuenta, setModalEliminarSubcuenta] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerSubcuentas = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/subcuentas', config)
                setSubcuentas(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerSubcuentas()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitSubcuenta = async subcuenta => {
  
        if(subcuenta?.id) {
            await editarSubcuenta(subcuenta);
        } else {
            await nuevoSubcuenta(subcuenta);
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

    const obtenerCuentas = async cuentas => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/cuentas', config);
            return {data};

        } catch (error) {
            console.log(error)
        }
    };

    const editarSubcuenta = async subcuenta => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/subcuentas/${subcuenta.id}`, subcuenta, config)

            setAlerta({});
            setModalFormularioSubcuenta(false);
            
            //Actualiza el DOM
            setSubcuentas((prevSubcuentas) => {
                const nuevosSubcuentas = prevSubcuentas.map((subcuentaState) =>
                  subcuentaState._id === data.id ? data : subcuentaState
                );
        
                return nuevosSubcuentas;
              });

            setAlerta({
                msg: 'Subcuenta Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarSubcuenta = subcuenta => {
        setSubcuenta(subcuenta);
        setModalFormularioSubcuenta(true);
    }

    const nuevoSubcuenta = async subcuenta => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/subcuentas', subcuenta, config)

            setSubcuentas((subcuentas) => [...subcuentas, data]);

            setAlerta({
                msg: 'Subcuenta Creado Correctamente',
                error: false
            })
            setModalFormularioSubcuenta(!modalFormularioSubcuenta);
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

    const obtenerSubcuenta = async id => {
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

            const { data } = await clienteAxios(`/subcuentas/${id}`, config )
            setSubcuenta(data)
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

    const eliminarSubcuenta = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/subcuentas/${id}`, config)
            //const data = {msg:"Negocio eliminado correctamente."}
            setAlerta({
                msg: data.msg,
                error: false
            });

            // Sincronizar el state
            const subcuentasActualizados = subcuentas.filter(subcuentaState => subcuentaState._id !== id )
            setSubcuentas(subcuentasActualizados)
            setModalEliminarSubcuenta(!modalEliminarSubcuenta);
            } catch (error) {
                console.log('Error en el setTimeout:', error);
            }
    }

    const handleModalSubcuenta = () => {
        setModalFormularioSubcuenta(!modalFormularioSubcuenta);
        setSubcuenta({});
    };

    const handleModalEliminarSubcuenta = subcuenta => {
        setSubcuenta(subcuenta);
        setModalEliminarSubcuenta(!modalEliminarSubcuenta);
    }
  

    return (
        <SubcuentasContext.Provider
            value={{
                subcuentas,
                mostrarAlerta,
                alerta,
                editarSubcuenta,
                obtenerSubcuenta,
                eliminarSubcuenta,
                submitSubcuenta,
                modalFormularioSubcuenta,
                handleModalSubcuenta,
                handleModalEditarSubcuenta,
                subcuenta,
                modalEliminarSubcuenta,
                handleModalEliminarSubcuenta,
                cargando,
                obtenerTipos,
                obtenerBancos,
                obtenerCuentas,
            }}
        >{children}
        </SubcuentasContext.Provider>
    )
}
export { 
    SubcuentasProvider
}

export default SubcuentasContext