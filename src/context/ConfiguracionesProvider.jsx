import React, { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/clienteAxios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


const ConfiguracionesContext = createContext();

const ConfiguracionesProvider = ({ children }) => {
    const [configuraciones, setConfiguraciones] = useState([]);
    const [alerta, setAlerta] = useState({});
  const [configuracion, setConfiguracion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [modalFormularioConfiguracion, setModalFormularioConfiguracion] = useState(false);
  const [modalEliminarConfiguracion, setModalEliminarConfiguracion] = useState(false);
  const [nombre, setNombre] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [archivoExistente, setArchivoExistente] = useState(null);
  const [editando, setEditando] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    obtenerConfiguraciones();
  }, [auth]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const obtenerConfiguraciones = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios('/configuraciones', config);
       // Limpiar el estado antes de actualizarlo
       setConfiguraciones([]);
       // Actualizar el estado con los nuevos datos
      setConfiguraciones(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitConfiguracion = async (e, configuracion) => {
    e.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    
        await editarConfiguracion(configuracion);

};

  const editarConfiguracion = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      // Verifica si hay un archivo para subir
    if (archivo) {
        // Crea un nuevo objeto File con el contenido del archivo seleccionado
        const nuevoArchivo = new File([archivo], `../../public/icon/${archivo.name}`);
  
        // Actualiza el estado con el nuevo archivo
        setArchivo(nuevoArchivo);
      }
      console.log(nombre)
      console.log(archivo.name)
      console.log(archivoExistente)
      console.log('../../public/icon/'+archivo.name)
      console.log(configuraciones[0]._id)
const configuracion = {
    nombre: nombre,
    logotipo: archivo.name,
  };

      const { data } = await clienteAxios.put(`/configuraciones/${configuraciones[0]._id}`, configuracion, config);
      console.log(data)
      setAlerta({});
      setModalFormularioConfiguracion(false);

      // Actualiza el DOM
      setConfiguraciones((prevConfiguraciones) =>
        prevConfiguraciones.map((configuracionState) =>
          configuracionState._id === data.id ? data : configuracionState
        )
      );

      setAlerta({
        msg: 'Configuracion Actualizado Correctamente',
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarConfiguracion = (configuracion) => {
    setConfiguracion(configuracion);
    setModalFormularioConfiguracion(true);
  };

  const obtenerConfiguracion = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/configuraciones/${id}`, config);
      setConfiguracion(data);
      setAlerta({});
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Error al obtener configuración',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } finally {
      setCargando(false);
    }
  };

  const handleModalConfiguracion = () => {
    setModalFormularioConfiguracion(!modalFormularioConfiguracion);
    setConfiguracion({});
  };

  const handleModalEliminarConfiguracion = (configuracion) => {
    setConfiguracion(configuracion);
    setModalEliminarConfiguracion(!modalEliminarConfiguracion);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);
  };

  useEffect(() => {
    // Aquí puedes consultar y actualizar el estado del archivo existente
    // Utiliza la ruta guardada en tu estado (archivoExistente)
    if (configuraciones.length > 0 && configuraciones[0].logotipo) {
      setArchivoExistente(configuraciones[0].logotipo);
    }
    // También puedes cargar el nombre inicialmente
    if (configuraciones.length > 0) {
    setNombre(configuraciones[0].nombre);
    }
  }, [archivoExistente, configuraciones]);

  return (
    <ConfiguracionesContext.Provider
      value={{
        configuraciones,
        mostrarAlerta,
        alerta,
        editarConfiguracion,
        obtenerConfiguraciones,
        obtenerConfiguracion,
        configuracion,
        cargando,
        nombre,
        setNombre,
        archivo,
        setArchivo,
        archivoExistente,
        setArchivoExistente,
        handleModalEditarConfiguracion,
        handleModalConfiguracion,
        handleModalEliminarConfiguracion,
        handleNombreChange,
        handleArchivoChange,
        submitConfiguracion,
        editando, 
        setEditando,
      }}
    >
      {children}
    </ConfiguracionesContext.Provider>
  );
};

export { ConfiguracionesProvider };

export default ConfiguracionesContext;
