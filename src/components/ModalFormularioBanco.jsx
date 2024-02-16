import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useBancos from '../hooks/useBancos';

const ModalFormularioBanco = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState(''); // Se mantiene como string
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [ultimosDigitosCuenta, setUltimosDigitosCuenta] = useState('');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipos, setTipos] = useState([]);

  const {
    modalFormularioBanco,
    handleModalBanco,
    alerta,
    mostrarAlerta,
    banco,
    submitBanco,
    obtenerTipos,
  } = useBancos();

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const tiposData = await obtenerTipos();
        setTipos(tiposData.data);
        setTipo(banco.tipo || '');
        console.log(banco.tipo)
      } catch (error) {
        console.error('Error al obtener tipos:', error);
      }
    };

    fetchTipos();
  }, [obtenerTipos]);

  useEffect(() => {
    if (banco?._id) {
      setId(banco._id);
      setNombre(banco.nombre);
      setTipo(banco.tipo);
      setNumeroCuenta(banco.numeroCuenta);
      setUltimosDigitosCuenta(banco.ultimosDigitosCuenta);
      setMonto(banco.monto);
      setDescripcion(banco.descripcion);
      return;
    }
    setId('');
    setNombre('');
    setTipo('');
    setNumeroCuenta('');
    setUltimosDigitosCuenta('');
    setMonto('');
    setDescripcion('');
  }, [banco]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [nombre, tipo, numeroCuenta, ultimosDigitosCuenta, monto, descripcion].includes('')
    ) {
      mostrarAlerta({
        msg: 'Todos los Campos son Obligatorios',
        error: true,
      });

      //return
    }

    // Pasar los datos hacia el provider
    await submitBanco({ id, nombre, tipo, numeroCuenta, ultimosDigitosCuenta, monto, descripcion });

    setId(null);
    setNombre('');
    setTipo('');
    setNumeroCuenta('');
    setUltimosDigitosCuenta('');
    setMonto('');
    setDescripcion('');
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalFormularioBanco} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalBanco}>
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

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
                  onClick={handleModalBanco}
                >
                  <span className="sr-only">Cerrar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                    {id ? 'Editar Banco' : 'Crear Banco'}
                  </Dialog.Title>
                  <form className="my-10" onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">
                        Nombre
                      </label>

                      <input
                        id="nombre"
                        type="text"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div className="mb-5">
                      <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="tipo">
                        Tipo
                      </label>

                    <select
                    id="tipo"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    >
                    <option value="">Selecciona un tipo</option>
                    {tipos.map((tipo) => (
                        <option key={tipo._id} value={tipo._id}>
                        {tipo.nombre}
                        </option>
                    ))}
                    </select>
                    </div>

                                            <div className='mb-5'>
                                                <label
                                                    className="text-gray-700 uppercase font-bold text-sm"
                                                    htmlFor="numeroCuenta"
                                                >Numero Cuenta</label>

                                                <textarea
                                                    id="numeroCuenta"
                                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                    placeholder="Numero Cuenta"
                                                    value={numeroCuenta}
                                                    onChange={e => setNumeroCuenta(e.target.value)}
                                                />
                                            </div>

                                            <div className='mb-5'>
                                                <input
                                                    id="ultimosDigitosCuenta"
                                                    type='hidden'
                                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                    placeholder="Últimos Digitos Cuenta"
                                                    value={ultimosDigitosCuenta}
                                                    onChange={e => setUltimosDigitosCuenta(e.target.value)}
                                                />
                                            </div>

                                            <div className='mb-5'>
                                                <label
                                                    className="text-gray-700 uppercase font-bold text-sm"
                                                    htmlFor="monto"
                                                >Balance</label>

                                                <textarea
                                                    id="monto"
                                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                                                    placeholder="Balance"
                                                    value={monto}
                                                    onChange={e => setMonto(e.target.value)}
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
                                                value={id ? 'Actualizar Banco': 'Crear Banco'}
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

export default ModalFormularioBanco