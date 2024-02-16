import React, { useState, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';
import useConfiguracion from '../hooks/useConfiguracion';

const Configuracion = () => {
    const {
        configuraciones,
        alerta,
        handleNombreChange,
        handleArchivoChange,
        nombre,
        archivoExistente,
        configuracion,
        setArchivoExistente,
        archivo,
        setArchivo,
        editarConfiguracion,
        submitConfiguracion,
        editando,
    } = useConfiguracion();
    


    const { msg } = alerta;
    //console.log(configuraciones[0].nombre)

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black">Configuración</h1>
            </div>
            {msg && <Alerta alerta={alerta} />}
            <div className="bg-white shadow mt-10 rounded-lg">
                <div className="max-w-md p-6">
                    <form
                        className="my-10"
                        onSubmit={(e) => submitConfiguracion(e)}
                    >
                        {configuraciones.length > 0 && (
                            <>
                        <label className="block text-lg font-semibold mb-2">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={handleNombreChange}
                            className="w-full px-4 py-2 mb-4 border rounded-md"
                        />

                        <label className="block text-lg font-semibold mb-2">Archivo</label>
                        <input
                            type="file"
                            accept=".png, .jpg, .ico"
                            onChange={handleArchivoChange}
                            className="w-full px-4 py-2 mb-4 border rounded-md"
                        />

                        {archivoExistente && (
                            <div className="mb-4">
                                <p className="text-lg font-semibold mb-2">Archivo Existente</p>
                                <img
                                    src={`../public/icon/${archivoExistente}`}
                                    alt="Archivo Existente"
                                    className="max-w-full h-auto"
                                />
                            </div>
                        )}

                        <input
                            type="submit"
                            value={!editando ? 'Actualizar' : 'Crear'}
                            className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
                        />
                        </>)}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Configuracion;
