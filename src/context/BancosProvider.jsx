import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const BancosContext = createContext();

const BancosProvider = ({children}) => {

    const [bancos, setBancos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [banco, setBanco] = useState({});
    const [cargando, setCargando] = useState(false);
    const [modalFormularioBanco, setModalFormularioBanco] = useState(false);
    const [modalEliminarBanco, setModalEliminarBanco] = useState(false);

    const navigate = useNavigate();
    const { auth } = useAuth()

    useEffect(() => {
        const obtenerBancos = async () => {
            try {
                const token = localStorage.getItem('token')
                if(!token) return
                
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/bancos', config)
                setBancos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerBancos()
    }, [auth])

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    const submitBanco = async banco => {
  
        if(banco?.id) {
            await editarBanco(banco);
        } else {
            await nuevoBanco(banco);
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

    const editarBanco = async banco => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/bancos/${banco.id}`, banco, config)

            setAlerta({});
            setModalFormularioBanco(false);
            
            //Actualiza el DOM
            setBancos((prevBancos) => {
                const nuevosBancos = prevBancos.map((bancoState) =>
                  bancoState._id === data.id ? data : bancoState
                );
        
                return nuevosBancos;
              });

            setAlerta({
                msg: 'Banco Actualizado Correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarBanco = banco => {
        setBanco(banco);
        setModalFormularioBanco(true);
    }

    const nuevoBanco = async banco => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/bancos', banco, config)

            setBancos((bancos) => [...bancos, data]);

            setAlerta({
                msg: 'Banco Creado Correctamente',
                error: false
            })
            setModalFormularioBanco(!modalFormularioBanco);
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

    const obtenerBanco = async id => {
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

            const { data } = await clienteAxios(`/bancos/${id}`, config )
            setBanco(data)
            setAlerta({})
        } catch (error) {
            navigate('/bancos')
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

    const eliminarBanco = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/bancos/${id}`, config)
            //const data = {msg:"Negocio eliminado correctamente."}
            setAlerta({
                msg: data.msg,
                error: false
            });

            // Sincronizar el state
            const bancosActualizados = bancos.filter(bancoState => bancoState._id !== id )
            setBancos(bancosActualizados)
            setModalEliminarBanco(!modalEliminarBanco);
            } catch (error) {
                console.log('Error en el setTimeout:', error);
            }
    }

    const handleModalBanco = () => {
        setModalFormularioBanco(!modalFormularioBanco);
        setBanco({});
    };

    const handleModalEliminarBanco = banco => {
        setBanco(banco);
        setModalEliminarBanco(!modalEliminarBanco);
    }
  

    return (
        <BancosContext.Provider
            value={{
                bancos,
                mostrarAlerta,
                alerta,
                editarBanco,
                obtenerBanco,
                eliminarBanco,
                submitBanco,
                modalFormularioBanco,
                handleModalBanco,
                handleModalEditarBanco,
                banco,
                modalEliminarBanco,
                handleModalEliminarBanco,
                cargando,
                obtenerTipos
            }}
        >{children}
        </BancosContext.Provider>
    )
}
export { 
    BancosProvider
}

export default BancosContext