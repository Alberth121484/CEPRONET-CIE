import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProveedoresContext = createContext();

const ProveedoresProvider = ({children}) => {

    const [proveedores, setProveedores] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proveedor, setProveedor] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioProveedor, setModalFormularioProveedor] = useState(false);
    const [modalEliminarProveedor, setModalEliminarProveedor] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerProveedores = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/proveedores', config)
                setProveedores(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProveedores()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitProveedor = async proveedor => {
  
        if(proveedor?.id) {
            await editarProveedor(proveedor);
        } else {
            await nuevoProveedor(proveedor);
        }
    }

    const editarProveedor = async proveedor => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proveedores/${proveedor.id}`, proveedor, config)

            setAlerta({});
            setModalFormularioProveedor(false);
            
            //Actualiza el DOM
            setProveedores((prevProveedores) => {
                const nuevosProveedores = prevProveedores.map((proveedorState) =>
                  proveedorState._id === data.id ? data : proveedorState
                );
        
                return nuevosProveedores;
              });

            setAlerta({
                msg: 'Proveedor Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarProveedor = proveedor => {
        setProveedor(proveedor);
        setModalFormularioProveedor(true);
    }

    const nuevoProveedor = async proveedor => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proveedores', proveedor, config)

            setProveedores((proveedores) => [...proveedores, data]);

            setAlerta({
                msg: 'Proveedor Creado Correctamente',
                error: false
            })
            setModalFormularioProveedor(!modalFormularioProveedor);
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

    const obtenerProveedor = async id => {
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

            const { data } = await clienteAxios(`/proveedores/${id}`, config )
            setProveedor(data)
            setAlerta({})
        } catch (error) {
            navigate('/proveedores')
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

    const eliminarProveedor = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proveedores/${id}`, config)
            //const data = {msg:"Negocio eliminado correctamente."}
            setAlerta({
                msg: data.msg,
                error: false
            });

            // Sincronizar el state
            const proveedoresActualizados = proveedores.filter(proveedorState => proveedorState._id !== id )
            setProveedores(proveedoresActualizados)
            setModalEliminarProveedor(!modalEliminarProveedor);
            } catch (error) {
                console.log('Error en el setTimeout:', error);
            }
    }

    const handleModalProveedor = () => {
        setModalFormularioProveedor(!modalFormularioProveedor);
        setProveedor({});
    };

    const handleModalEliminarProveedor = proveedor => {
        setProveedor(proveedor);
        setModalEliminarProveedor(!modalEliminarProveedor);
    }
  

    return (
        <ProveedoresContext.Provider
            value={{
                proveedores,
                mostrarAlerta,
                alerta,
                editarProveedor,
                obtenerProveedor,
                eliminarProveedor,
                submitProveedor,
                modalFormularioProveedor,
                handleModalProveedor,
                handleModalEditarProveedor,
                proveedor,
                modalEliminarProveedor,
                handleModalEliminarProveedor,
                cargando
            }}
        >{children}
        </ProveedoresContext.Provider>
    )
}
export { 
    ProveedoresProvider
}

export default ProveedoresContext