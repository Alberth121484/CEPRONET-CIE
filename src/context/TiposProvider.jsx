import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const TiposContext = createContext();

const TiposProvider = ({children}) => {

    const [tipos, setTipos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [tipo, setTipo] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioTipo, setModalFormularioTipo] = useState(false);
    const [modalEliminarTipo, setModalEliminarTipo] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerTipos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/tipos', config)
                setTipos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerTipos()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitTipo = async tipo => {
  
        if(tipo?.id) {
            await editarTipo(tipo);
        } else {
            await nuevoTipo(tipo);
        }
    }

    const editarTipo = async tipo => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/tipos/${tipo.id}`, tipo, config)

            setAlerta({});
            setModalFormularioTipo(false);
            
            //Actualiza el DOM
            setTipos((prevTipos) => {
                const nuevosTipos = prevTipos.map((tipoState) =>
                  tipoState._id === data.id ? data : tipoState
                );
        
                return nuevosTipos;
              });

            setAlerta({
                msg: 'Tipo Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarTipo = tipo => {
        setTipo(tipo);
        setModalFormularioTipo(true);
    }

    const nuevoTipo = async tipo => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/tipos', tipo, config)

            setTipos((tipos) => [...tipos, data]);

            setAlerta({
                msg: 'Tipo Creado Correctamente',
                error: false
            })
            setModalFormularioTipo(!modalFormularioTipo);
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

    const obtenerTipo = async id => {
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

            const { data } = await clienteAxios(`/tipos/${id}`, config )
            setTipo(data)
            setAlerta({})
        } catch (error) {
            navigate('/tipos')
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

    const eliminarTipo = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/tipos/${id}`, config)
            //const data = {msg:"Negocio eliminado correctamente."}
            setAlerta({
                msg: data.msg,
                error: false
            });

            // Sincronizar el state
            const tiposActualizados = tipos.filter(tipoState => tipoState._id !== id )
            setTipos(tiposActualizados)
            setModalEliminarTipo(!modalEliminarTipo);
            } catch (error) {
                console.log('Error en el setTimeout:', error);
            }
    }

    const handleModalTipo = () => {
        setModalFormularioTipo(!modalFormularioTipo);
        setNegocio({});
    };

    const handleModalEliminarTipo = tipo => {
        setTipo(tipo);
        setModalEliminarTipo(!modalEliminarTipo);
    }
  

    return (
        <TiposContext.Provider
            value={{
                tipos,
                mostrarAlerta,
                alerta,
                editarTipo,
                obtenerTipo,
                eliminarTipo,
                submitTipo,
                modalFormularioTipo,
                handleModalTipo,
                handleModalEditarTipo,
                tipo,
                modalEliminarTipo,
                handleModalEliminarTipo,
                cargando
            }}
        >{children}
        </TiposContext.Provider>
    )
}
export { 
    TiposProvider
}

export default TiposContext