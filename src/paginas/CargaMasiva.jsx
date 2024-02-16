import { useEffect, useState } from 'react';
import useCargaMasiva from '../hooks/useCargaMasiva';
import CargaMasivaProvider from '../context/CargaMasivaProvider';
import Alerta from '../components/Alerta';

const CargaMasiva = () => {
    const { file, handleSubmit, selectedCatalog, alerta, handleCatalogChange, handleFileChange, handleFileDrop, handleDownloadTemplate, preventDefaultHandler, loading } = useCargaMasiva();
    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    useEffect(() => {
        if (alerta.msg) {
            setMostrarMensaje(true);
            const timeout = setTimeout(() => {
                setMostrarMensaje(false);
            }, 3000);
            const timeout2 = setTimeout(() => {
                //window.location.reload();
            }, 3300);
            // Limpia el temporizador al desmontar el componente
            return () => clearTimeout(timeout, timeout2);
        }
    }, [alerta]);

    return (
        <CargaMasivaProvider>
            <>
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-black">Carga Masiva</h1>
                    </div>

                    <div className="flex items-center justify-center h-full" id="mensaje">
                        {mostrarMensaje && <Alerta alerta={alerta} />}
                    </div>

                    <div className="mt-10">
                        <div className="bg-white p-8 rounded shadow-md w-full">
                            <h1 className="text-2xl font-semibold mb-4">Cargar Archivo</h1>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Selecciona un catálogo</label>
                                <select
                                    className="border rounded w-full p-2"
                                    value={selectedCatalog}
                                    onChange={handleCatalogChange}
                                >
                                    <option value="">Selecciona un catálogo</option>
                                    <option value="negocios">Negocios</option>
                                    <option value="proveedores">Proveedores</option>
                                    <option value="cuentas">Cuentas</option>
                                    <option value="subcuentas">Subcuentas</option>
                                    <option value="conceptos">Conceptos</option>
                                    <option value="bancos">Bancos</option>
                                    <option value="tipos">Tipos</option>
                                    <option value="empleados">Empleados</option>
                                    <option value="movimientos">Movimientos</option>
                                </select>
                            </div>

                            {selectedCatalog && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Adjunta un archivo CSV</label>
                                    <input
                                        type="file"
                                        accept=".csv"
                                        className="border rounded w-full p-2"
                                        onChange={handleFileChange}
                                        onDrop={handleFileDrop}
                                        onDragOver={preventDefaultHandler}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">Arrastra aquí tu archivo CSV o selecciona uno.</p>
                                </div>
                            )}

                            {(file || (selectedCatalog && !file)) && (
                                <div className="mb-4">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4 uppercase"
                                        onClick={handleSubmit}
                                    >
                                        Subir Archivo
                                    </button>
                                    {selectedCatalog && (
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 uppercase"
                                            onClick={handleDownloadTemplate}
                                        >
                                            Descargar Template
                                        </button>
                                    )}
                                </div>
                            )}

                            {loading && (
                                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
                                    <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                                        <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                                            <svg className="h-20 w-20 animate-spin stroke-green-500" viewBox="0 0 256 256">
                                                <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="24"></line>
                                                <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                                                </line>
                                                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="24"></line>
                                                <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                                                </line>
                                                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="24"></line>
                                                <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24">
                                                </line>
                                            </svg>
                                            <span className="text-4xl font-medium text-green-500">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </>
        </CargaMasivaProvider>
    );
};

export default CargaMasiva;
