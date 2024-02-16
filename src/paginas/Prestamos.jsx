import usePrestamos from '../hooks/usePrestamos';
import { useState, useEffect } from 'react';

const Prestamos = () => {
  const [tipoPrestamo, setTipoPrestamo] = useState(null);

  const handleSelectChange = (e) => {
    setTipoPrestamo(Number(e.target.value));
  };

  return (
    <>

      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-black">Prestamos</h1>
        </div>
        <div className="p-4">
          <label htmlFor="tipoPrestamo" className="block text-lg font-semibold mb-2">
            Selecciona para quien será el préstamo.
          </label>
          <select
            id="tipoPrestamo"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handleSelectChange}
            value={tipoPrestamo || ''}
          >
            <option value="">Selecciona...</option>
            <option value="1">Empresa</option>
            <option value="2">Empleado</option>
          </select>

          {tipoPrestamo && (
            <div className={`mt-4 p-4 rounded-lg shadow-md ${tipoPrestamo === 1 ? 'h-[500px]' : 'h-[300px]'} sm:h-auto bg-white`}>
              <h1 className="text-2xl font-bold mb-4">{tipoPrestamo === 1 ? 'Empresa' : 'Empleado'}</h1>

              <div className="tabla-prestamos mb-4">
                <div className='h-[200px] overflow-x-auto'>
                  <table className="w-full" id="tabla-prestamos">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="py-2">{tipoPrestamo === 1 ? 'Nombre de Empresa' : 'Nombre de Empleado'}</th>
                        <th className="py-2">Número de Cuenta</th>
                        <th className="py-2">Monto del Prestamo</th>
                        <th className="py-2">Interes Mensul</th>
                        <th className="py-2">Parcialidades</th>
                        <th className="py-2">Fecha Inicio</th>
                        <th className="py-2">Fecha Fin</th>
                        <th className="py-2">Pagos</th>
                        <th className="py-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className='h-200 overflow-auto'>
                      {/*{Prestamos.map(prestamo => (*/}
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300">
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>h</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>o</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>l</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>a</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>m</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>u</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>n</td>
                        <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>d</td>
                        <td className='px-2 py-2 font-bold text-center'>
                          <div className='flex justify-center space-x-4'>
                            <div>
                              <button

                                type='button'
                                className="p-3 font-bold block mt-5 text-center"
                              >
                                <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                            </div>
                            <div>
                              <button
                                className='p-3 font-bold block mt-5 text-center'

                              >
                                <svg className="h-6 w-6 text-red-500 hover:text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                          </div>
                        </td>
                      </tr>
                      {/*))}*/}
                    </tbody>
                  </table>
                </div>
                <div className='mt-4 text-center'>
                  <h1 className='text-xl font-bold'>Formulario</h1>
                </div>
                <div className="formulario bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mt-5">
                  <form>
                    <div className="mb-4 flex justify-between">
                      <div className="w-1/2 pr-2">
                        <label htmlFor="catalogoSelect" className="block text-lg font-semibold mb-2">
                          Catálogo
                        </label>
                        <select id="catalogoSelect" className="w-full px-4 py-2 border rounded-md">
                          {tipoPrestamo === 1 ? (
                            <option value="catalogoEmpresa">Catálogo de Empresa</option>
                          ) : (
                            <option value="catalogoEmpleado">Catálogo de Empleado</option>
                          )}
                        </select>
                      </div>

                      <div className="w-1/2 pl-2">
                        <label htmlFor="cuentasSelect" className="block text-lg font-semibold mb-2">
                          Catálogo de Cuentas
                        </label>
                        <select id="cuentasSelect" className="w-full px-4 py-2 border rounded-md">
                          {/* Opciones del catálogo de cuentas */}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4 flex">
                      <div className="w-1/3 pr-2 relative">
                        <label htmlFor="monto" className="block text-lg font-semibold mb-2">
                          Monto del Préstamo
                        </label>
                        <span className="text-lg font-semibold absolute inset-y-0 left-0 flex items-center pl-5 top-9 text-gray-400">
                          $
                        </span>
                        <input
                          type="number"
                          id="monto"
                          className="w-full px-4 py-2 border rounded-md pl-8"  // Ajusta el padding izquierdo para el espacio del símbolo
                          placeholder="Ingrese el monto"
                        />
                      </div>

                      <div className="w-1/3 pr-2 relative">
                        <label htmlFor="interes" className="block text-lg font-semibold mb-2">
                          Porcentaje de Interés
                        </label>
                        <span className="text-lg font-semibold absolute inset-y-0 left-0 flex items-center pl-3 top-9 text-gray-400">
                          %
                        </span>
                        <input
                          type="number"
                          id="interes"
                          className="w-full px-4 py-2 border rounded-md pl-8"
                          placeholder="Ingrese el porcentaje de interés"
                        />
                      </div>
                      <div className="w-1/3 pl-2 relative">
                        <label htmlFor="parcialidades" className="block text-lg font-semibold mb-2">
                          Parcialidades
                        </label>
                        <span className="text-lg font-semibold absolute inset-y-0 left-0 flex items-center pl-5 top-9 text-gray-400">
                          $
                        </span>
                        <input
                          type="number"
                          id="parcialidades"
                          className="w-full px-4 py-2 border rounded-md pl-8"
                          placeholder="Número de parcialidades"
                        />
                      </div>
                    </div>

                    <div className="mb-4 flex justify-between">

                      <div className="w-1/3 px-2">
                        <label htmlFor="fechaInicio" className="block text-lg font-semibold mb-2">
                          Fecha de Inicio
                        </label>
                        <input
                          type="date"
                          id="fechaInicio"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="w-1/3 pl-2">
                        <label htmlFor="fechaFin" className="block text-lg font-semibold mb-2">
                          Fecha de Fin
                        </label>
                        <input
                          type="date"
                          id="fechaFin"
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
                    >
                      Enviar
                    </button>

                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Prestamos;
