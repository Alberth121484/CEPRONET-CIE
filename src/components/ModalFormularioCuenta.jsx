import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useCuentas from '../hooks/useCuentas';

const ModalFormularioCuenta = () => {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [banco, setBanco] = useState('');
  const [tipo, setTipo] = useState(''); // Se mantiene como string
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [ultimosDigitosCuenta, setUltimosDigitosCuenta] = useState('');
  const [saldoInicial, setSaldoInicial] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipos, setTipos] = useState([]);
  const [bancos, setBancos] = useState([]);

  const {
    modalFormularioCuenta,
    handleModalCuenta,
    alerta,
    mostrarAlerta,
    cuenta,
    submitCuenta,
    obtenerTipos,
    obtenerBancos,
  } = useCuentas();

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const tiposData = await obtenerTipos();
        setTipos(tiposData.data);
        setTipo(cuenta.tipo || '');
        console.log(cuenta.tipo)
        const bancosData = await obtenerBancos();
        setBancos(bancosData.data);
        setBanco(cuenta.banco|| '');
        console.log(cuenta.banco)
      } catch (error) {
        console.error('Error al obtener tipos:', error);
      }
    };

    fetchTipos();
  }, [obtenerTipos, obtenerBancos]);

  useEffect(() => {
    if (cuenta?._id) {
      setId(cuenta._id);
      setNombre(cuenta.nombre);
      setBanco(cuenta.banco);
      setTipo(cuenta.tipo);
      setNumeroCuenta(cuenta.numeroCuenta);
      setUltimosDigitosCuenta(cuenta.ultimosDigitosCuenta);
      setSaldoInicial(cuenta.saldoInicial);
      setDescripcion(cuenta.descripcion);
      return;
    }
    setId('');
    setNombre('');
    setBanco('');
    setTipo('');
    setNumeroCuenta('');
    setUltimosDigitosCuenta('');
    setSaldoInicial('');
    setDescripcion('');
  }, [cuenta]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [nombre, banco, tipo, numeroCuenta, ultimosDigitosCuenta, saldoInicial, descripcion].includes('')
    ) {
      mostrarAlerta({
        msg: 'Todos los Campos son Obligatorios',
        error: true,
      });

      //return
    }

    // Pasar los datos hacia el provider
    await submitCuenta({ id, nombre, banco, tipo, numeroCuenta, ultimosDigitosCuenta, saldoInicial, descripcion });

    setId(null);
    setNombre('');
    setBanco('');
    setTipo('');
    setNumeroCuenta('');
    setUltimosDigitosCuenta('');
    setSaldoInicial('');
    setDescripcion('');
  };

  const { msg } = alerta;

  return (
    <Transition.Root show={modalFormularioCuenta} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalCuenta}>
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
                  onClick={handleModalCuenta}
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
                    {id ? 'Editar Cuenta' : 'Crear Cuenta'}
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

                    <div className="mb-5">
                      <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="banco">
                        Banco
                      </label>

                      <select
                        id="banco"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={banco}
                        onChange={(e) => setBanco(e.target.value)}
                      >
                        <option value="">Selecciona un tipo</option>
                        {bancos.map((banco) => (
                          <option key={banco._id} value={banco._id}>
                            {banco.nombre}
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
                        htmlFor="saldoInicial"
                      >Saldo Inicial</label>

                      <textarea
                        id="saldoInicial"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="saldoInicial"
                        value={saldoInicial}
                        onChange={e => setSaldoInicial(e.target.value)}
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
                      value={id ? 'Actualizar Cuenta' : 'Crear Cuenta'}
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

export default ModalFormularioCuenta