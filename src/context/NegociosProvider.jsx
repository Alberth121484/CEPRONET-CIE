import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const NegociosContext = createContext();

const NegociosProvider = ({children}) => {

    const [negocios, setNegocios] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [negocio, setNegocio] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioNegocio, setModalFormularioNegocio] = useState(false);
    const [modalEliminarNegocio, setModalEliminarNegocio] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerNegocios = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/negocios', config)
                setNegocios(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerNegocios()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitNegocio = async negocio => {
  
        if(negocio?.id) {
            await editarNegocio(negocio);
        } else {
            await nuevoNegocio(negocio);
        }
    }

    const editarNegocio = async negocio => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/negocios/${negocio.id}`, negocio, config)

            setAlerta({});
            setModalFormularioNegocio(false);
            
            //Actualiza el DOM
            setNegocios((prevNegocios) => {
                const nuevosNegocios = prevNegocios.map((negocioState) =>
                  negocioState._id === data.id ? data : negocioState
                );
        
                return nuevosNegocios;
              });

            setAlerta({
                msg: 'Negocio Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarNegocio = negocio => {
        setNegocio(negocio);
        setModalFormularioNegocio(true);
    }

    const nuevoNegocio = async negocio => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/negocios', negocio, config)

            setNegocios((negocios) => [...negocios, data]);

            setAlerta({
                msg: 'Negocio Creado Correctamente',
                error: false
            })
            setModalFormularioNegocio(!modalFormularioNegocio);
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

    const obtenerNegocio = async id => {
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

            const { data } = await clienteAxios(`/negocios/${id}`, config )
            setNegocio(data)
            setAlerta({})
        } catch (error) {
            navigate('/negocios')
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

    const eliminarNegocio = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/negocios/${id}`, config)
            //const data = {msg:"Negocio eliminado correctamente."}
            setAlerta({
                msg: data.msg,
                error: false
            });

            // Sincronizar el state
            const negociosActualizados = negocios.filter(negocioState => negocioState._id !== id )
            setNegocios(negociosActualizados)
            setModalEliminarNegocio(!modalEliminarNegocio);
            } catch (error) {
                console.log('Error en el setTimeout:', error);
            }
    }

    const handleModalNegocio = () => {
        setModalFormularioNegocio(!modalFormularioNegocio);
        setNegocio({});
    };

    const handleModalEliminarNegocio = negocio => {
        setNegocio(negocio);
        setModalEliminarNegocio(!modalEliminarNegocio);
    }
  

    return (
        <NegociosContext.Provider
            value={{
                negocios,
                mostrarAlerta,
                alerta,
                editarNegocio,
                obtenerNegocio,
                eliminarNegocio,
                submitNegocio,
                modalFormularioNegocio,
                handleModalNegocio,
                handleModalEditarNegocio,
                negocio,
                modalEliminarNegocio,
                handleModalEliminarNegocio,
                cargando
            }}
        >{children}
        </NegociosContext.Provider>
    )
}
export { 
    NegociosProvider
}

export default NegociosContext