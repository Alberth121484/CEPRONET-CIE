import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useTipos from '../hooks/useTipos'


const ModalFormularioTipo = () => {

    const [id, setId] = useState(null)
    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')
    const [naturaleza, setNaturaleza] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const { modalFormularioTipo, handleModalTipo, alerta,  mostrarAlerta, tipo, submitTipo } = useTipos();

    useEffect( () => {
        if( tipo?._id){
            setId(tipo._id); 
            setCodigo(tipo.codigo); 
            setNombre(tipo.nombre); 
            setNaturaleza(tipo.naturaleza); 
            setDescripcion(tipo.descripcion); 
            return;
        }
        setId(''); 
        setCodigo(''); 
        setNombre(''); 
        setNaturaleza(''); 
        setDescripcion(''); 
    }, [tipo]);

    const handleSubmit = async e => {
        e.preventDefault();

        if([codigo, nombre, naturaleza, descripcion].includes('') ) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })

            //return
        }
        
        // Pasar los datos hacia el provider
        await submitTipo({ id, codigo, nombre, naturaleza, descripcion})

        setId(null)
        setCodigo(''); 
        setNombre(''); 
        setNaturaleza(''); 
        setDescripcion(''); 
    }
    
    const { msg } = alerta;

    return (
        <Transition.Root show={ modalFormularioTipo } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleModalTipo }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={ handleModalTipo }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {id ? 'Editar Tipo' : 'Crear Tipo'}
                                    </Dialog.Title>
                                    <form 
                                        className="my-10"
                                        onSubmit={handleSubmit}
                                    >
                                            <div className='mb-5'>
                                                <label
                                                    className="text-gray-700 uppercase font-bold text-sm"
                                                    htmlFor="codigo"
                                                >Código</label>

                                                <input
                                                    id="codigo"
                                                    type="text"
                                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                    placeholder="Código"
                                                    value={codigo}
                                                    onChange={e => setCodigo(e.target.value)}
                                                />
                                            </div>

                                            <div className='mb-5'>
                                                <label
                                                    className="text-gray-700 uppercase font-bold text-sm"
                                                    htmlFor="nombre"
                                                >Nombre</label>

                                                <textarea
                                                    id="nombre"
                                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                    placeholder="Nombre"
                                                    value={nombre}
                                                    onChange={e => setNombre(e.target.value)}
                                                />
                                            </div>

                                            <div className='mb-5'>
                                                <label
                                                    className="text-gray-700 uppercase font-bold text-sm"
                                                    htmlFor="naturaleza"
                                                >Naturaleza</label>

                                                <textarea
                                                    id="naturaleza"
                                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                    placeholder="Naturaleza"
                                                    value={naturaleza}
                                                    onChange={e => setNaturaleza(e.target.value)}
                                                />
                                            </div>

                                            <div className='mb-5'>
                                                <label
                                                    className="text-gray-700 uppercase font-bold text-sm"
                                                    htmlFor="descripcion"
                                                >Descripción</label>

                                                <textarea
                                                    id="descripcion"
                                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                    placeholder="Descripción"
                                                    value={descripcion}
                                                    onChange={e => setDescripcion(e.target.value)}
                                                />
                                            </div>

                                            

                                            <input
                                                type="submit"
                                                value={id ? 'Actualizar Tipo': 'Crear Tipo'}
                                                className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
                                            />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTipo