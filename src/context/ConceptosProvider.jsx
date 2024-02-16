import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ConceptosContext = createContext();

const ConceptosProvider = ({children}) => {

    const [conceptos, setConceptos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [concepto, setConcepto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioConcepto, setModalFormularioConcepto] = useState(false);
    const [modalEliminarConcepto, setModalEliminarConcepto] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerConceptos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/conceptos', config)
                setConceptos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerConceptos()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitConcepto = async concepto => {
  
        if(concepto?.id) {
            await editarConcepto(concepto);
        } else {
            await nuevoConcepto(concepto);
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

    const editarConcepto = async concepto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/conceptos/${concepto.id}`, concepto, config)

            setAlerta({});
            setModalFormularioConcepto(false);
            
            //Actualiza el DOM
            setConceptos((prevConceptos) => {
                const nuevosConceptos = prevConceptos.map((conceptoState) =>
                  conceptoState._id === data.id ? data : conceptoState
                );
        
                return nuevosConceptos;
              });

            setAlerta({
                msg: 'Concepto Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarConcepto = concepto => {
        setConcepto(concepto);
        setModalFormularioConcepto(true);
    }

    const nuevoConcepto = async concepto => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/conceptos', concepto, config)

            setConceptos((conceptos) => [...conceptos, data]);

            setAlerta({
                msg: 'Concepto Creado Correctamente',
                error: false
            })
            setModalFormularioConcepto(!modalFormularioConcepto);
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

    const obtenerConcepto = async id => {
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

            const { data } = await clienteAxios(`/conceptos/${id}`, config )
            setConcepto(data)
            setAlerta({})
        } catch (error) {
            navigate('/conceptos')
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

    const eliminarConcepto = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/conceptos/${id}`, config)
            //const data = {msg:"Negocio eliminado correctamente."}
            setAlerta({
                msg: data.msg,
                error: false
            });

            // Sincronizar el state
            const conceptosActualizados = conceptos.filter(conceptoState => conceptoState._id !== id )
            setConceptos(conceptosActualizados)
            setModalEliminarConcepto(!modalEliminarConcepto);
            } catch (error) {
                console.log('Error en el setTimeout:', error);
            }
    }

    const handleModalConcepto = () => {
        setModalFormularioConcepto(!modalFormularioConcepto);
        setConcepto({});
    };

    const handleModalEliminarConcepto = concepto => {
        setConcepto(concepto);
        setModalEliminarConcepto(!modalEliminarConcepto);
    }
  

    return (
        <ConceptosContext.Provider
            value={{
                conceptos,
                mostrarAlerta,
                alerta,
                editarConcepto,
                obtenerConcepto,
                eliminarConcepto,
                submitConcepto,
                modalFormularioConcepto,
                handleModalConcepto,
                handleModalEditarConcepto,
                concepto,
                modalEliminarConcepto,
                handleModalEliminarConcepto,
                cargando,
                obtenerTipos,
                obtenerCuentas,
            }}
        >{children}
        </ConceptosContext.Provider>
    )
}
export { 
    ConceptosProvider
}

export default ConceptosContext