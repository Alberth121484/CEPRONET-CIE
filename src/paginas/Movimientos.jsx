import useMovimientos from '../hooks/useMovimientos';
import useCuentas from '../hooks/useCuentas';
import useNegocios from '../hooks/useNegocios';
import useSubcuentas from '../hooks/useSubcuentas';
import useConceptos from '../hooks/useConceptos';
import useProveedores from '../hooks/useProveedores';
import Alerta from '../components/Alerta';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { formatearFecha } from '../helpers/formatearFecha';
import MovimientosContext from '../context/MovimientosProvider'

const Movimientos = () => {
  const { esEditable, movimientos, alerta, mostrarAlerta, setMovimientos, submitMovimiento, eliminarMovimiento, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth } = useMovimientos();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const { negocios } = useNegocios();
  const { cuentas } = useCuentas();
  const { subcuentas } = useSubcuentas();
  const { conceptos } = useConceptos();
  const { proveedores } = useProveedores();

  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalEgresos, setTotalEgresos] = useState(0);
  const [total, setTotal] = useState(0);

  const [editingCell, setEditingCell] = useState(null);

  const [selectedNegocio, setSelectedNegocio] = useState('');

  const movimientosFiltrados = movimientos.filter((movimiento) => movimiento.negocio === selectedNegocio);

  const [editingDateRows, setEditingDateRows] = useState([]);

  const manejarEdicion = (rowData) => {
    submitMovimiento(rowData);
  };

  const manejarEliminacion = (id) => {
    eliminarMovimiento(id);
  };

  const handleDoubleClick = (row, col) => {
    if (col === 0 ||
      col === 2 ||
      col === 3 ||
      col === 4 ||
      col === 5 ||
      col === 6 ||
      col === 7 ||
      col === 8
    ) {
      const rowData = movimientos[row];
      const eseditable = esEditable(rowData.fecha);
      console.log(eseditable)

      if (eseditable) {
        setEditingCell({ row, col });
      } else {
        // Puedes mostrar un mensaje al usuario indicando que la edición no está permitida
        console.log("La edición no está permitida para esta fecha.");
      }
    }
    // Resto del código para otras columnas si es necesario
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  useEffect(() => {
    // Calcula la suma de ingresos, egresos y total para el negocio seleccionado
    const sumIngresos = movimientosFiltrados.reduce((total, movimiento) => {
      return movimiento.negocio === selectedNegocio
        ? total + parseFloat(movimiento.ingreso)
        : total;
    }, 0);

    const sumEgresos = movimientosFiltrados.reduce((total, movimiento) => {
      return movimiento.negocio === selectedNegocio
        ? total + parseFloat(movimiento.egreso)
        : total;
    }, 0);

    // Redondea los resultados a dos decimales
    const roundedIngresos = sumIngresos.toFixed(2);
    const roundedEgresos = sumEgresos.toFixed(2);
    const roundedTotal = (sumIngresos - sumEgresos).toFixed(2);

    // Formatea los resultados con el símbolo de pesos y comas separadoras de millares
    const formattedIngresos = `$${Number(roundedIngresos).toLocaleString()}`;
    const formattedEgresos = `$${Number(roundedEgresos).toLocaleString()}`;
    const formattedTotal = `$${Number(roundedTotal).toLocaleString()}`;

    // Actualiza los estados correspondientes
    setTotalIngresos(formattedIngresos);
    setTotalEgresos(formattedEgresos);
    setTotal(formattedTotal);
  }, [movimientos, selectedNegocio]);




  // Función para exportar a PDF
  const exportToPDF = () => {
    try {
      const unit = 'pt';
      const size = 'A4';
      const orientation = 'landscape';

      const doc = new jsPDF(orientation, unit, size);

      doc.text('Movimientos', 40, 40);

      const tableHeaders = [['Fecha', 'Negocio', 'Cuenta', 'Subcuenta', 'Concepto', 'Proveedor', 'Comentarios', 'Ingreso', 'Egreso']];
      const tableData = movimientosFiltrados.map(movimiento => [
        formatearFecha(movimiento.fecha),
        movimiento.negocio ? negocios.find(negocio => negocio._id === movimiento.negocio)?.nombre : '',
        movimiento.cuenta ? cuentas.find(cuenta => cuenta._id === movimiento.cuenta)?.nombre : '',
        movimiento.subcuenta ? subcuentas.find(subcuenta => subcuenta._id === movimiento.subcuenta)?.nombre : '',
        movimiento.concepto ? conceptos.find(concepto => concepto._id === movimiento.concepto)?.nombre : '',
        movimiento.proveedor ? proveedores.find(proveedor => proveedor._id === movimiento.proveedor)?.nombre : '',
        movimiento.comentarios,
        movimiento.ingreso,
        movimiento.egreso,
      ]);

      doc.autoTable({
        head: tableHeaders,
        body: tableData,
        startY: 60,
      });

      doc.save('movimientos.pdf');
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
      mostrarAlerta({ msg: 'Error al exportar a PDF', tipo: 'error' });
    }
  };

  useEffect(() => {
    if (alerta.msg) {
      setMostrarMensaje(true);
      const timeout = setTimeout(() => {
        setMostrarMensaje(false);
      }, 3000);
      const timeout2 = setTimeout(() => {
        window.location.reload();
      }, 3300);
      // Limpia el temporizador al desmontar el componente
      return () => clearTimeout(timeout, timeout2);
    }
  }, [alerta]);

  const handleSelectChangeCuenta = (rowIndex, value) => {
    setMovimientos((prevMovimientos) => {
      const updatedMovimientos = [...prevMovimientos];
      updatedMovimientos[rowIndex].selectedCuenta = value;
      updatedMovimientos[rowIndex].cuentaCambiada = true; // Marcar que el negocio ha cambiado
      return updatedMovimientos;
    });
  };
  const handleSelectChangeSubcuenta = (rowIndex, value) => {
    setMovimientos((prevMovimientos) => {
      const updatedMovimientos = [...prevMovimientos];
      updatedMovimientos[rowIndex].selectedSubcuenta = value;
      updatedMovimientos[rowIndex].subcuentaCambiada = true; // Marcar que el negocio ha cambiado
      return updatedMovimientos;
    });
  };
  const handleSelectChangeConcepto = (rowIndex, value) => {
    setMovimientos((prevMovimientos) => {
      const updatedMovimientos = [...prevMovimientos];
      updatedMovimientos[rowIndex].selectedConcepto = value;
      updatedMovimientos[rowIndex].conceptoCambiado = true; // Marcar que el negocio ha cambiado
      return updatedMovimientos;
    });
  };
  const handleSelectChangeProveedor = (rowIndex, value) => {
    setMovimientos((prevMovimientos) => {
      const updatedMovimientos = [...prevMovimientos];
      updatedMovimientos[rowIndex].selectedProveedor = value;
      updatedMovimientos[rowIndex].proveedorCambiado = true; // Marcar que el negocio ha cambiado
      return updatedMovimientos;
    });
  };

  const handleDateChange = (rowIndex, date) => {
    setMovimientos((prevMovimientos) => {
      const updatedMovimientos = [...prevMovimientos];
      updatedMovimientos[rowIndex] = {
        ...updatedMovimientos[rowIndex],
        fecha: date.toISOString(),
        fechaCambiada: true
      };
      return updatedMovimientos;
    });
  };

  const handleInputChange = (rowIndex, columnName, value) => {
    setMovimientos((prevMovimientos) => {
      const updatedMovimientos = [...prevMovimientos];
      updatedMovimientos[rowIndex][columnName] = value;
      updatedMovimientos[rowIndex][`${columnName}Cambiado`] = true; // Marcar que el valor ha cambiado
      return updatedMovimientos;
    });
  };
  console.log(selectedNegocio)

  const handleCrearFila = () => {
    let nuevaFila = {
      fecha: new Date().toISOString() || '', // Puedes ajustar la fecha inicial según tus necesidades
      negocio: selectedNegocio, // Puedes establecer un valor por defecto o dejar en blanco
      cuenta: '',
      subcuenta: '',
      concepto: '',
      proveedor: '',
      comentarios: '',
      ingreso: 0,
      egreso: 0,
      balance: 0,
      _id: "",
      key: '',
    };

    setMovimientos((prevMovimientos) => [...prevMovimientos, nuevaFila]);

  };

  // Supongamos que la correspondencia letra-empresa es A->1, B->2, C->3, etc.
  const obtenerLetraEmpresa = (numeroEmpresa) => {
    // Inicio de la correspondencia en ASCII (A)
    const inicioCorrespondencia = 'A'.charCodeAt(0);

    // Asumimos que hay 26 letras en el alfabeto
    const numeroLetras = 26;

    // Calcula el índice correspondiente a la empresa
    const indice = (numeroEmpresa - 1) % numeroLetras;

    // Calcula el código ASCII de la letra correspondiente
    const codigoLetra = inicioCorrespondencia + indice;

    // Convierte el código ASCII a letra
    const letra = String.fromCharCode(codigoLetra);

    return letra;
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-black">Movimientos</h1>
          <button
            onClick={handleCrearFila}
            type="button"
            className="p-3 font-bold block mt-5 text-center"
            id='crear'
          >
            <svg
              className="h-12 w-12 text-blue-500 hover:text-blue-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 mx-auto text-center">
          <div className="flex items-center justify-center h-full" id="mensaje">
            {mostrarMensaje && <Alerta alerta={alerta} />}
          </div>
        </div>
        <div className='rounded-md bg-white h-[100px] overflow-x-auto p-3 flex space-x-5'>
          {/* Elemento select para filtrar por negocio */}
          <div className="bg-white w-full md:w-1/2 lg:w-1/10  ml-14">
            <h2 className="text-lg font-semibold mb-2 text-2xl">Filtrar por Negocio:</h2>
            <select
              value={selectedNegocio}
              onChange={(e) => setSelectedNegocio(e.target.value)}
              className='w-72 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            >
              <option value="">Todos</option>
              {negocios.map((negocio) => (
                <option key={negocio._id} value={negocio._id}>
                  {negocio.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white w-full md:w-1/2 lg:w-1/10  ml-14">
            <h2 className="text-lg font-semibold mb-2 text-2xl">Filtrar por Mes:</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-24 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300">
              <option key='Todos' value=''>Todos</option>
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={month + 1}>
                  {new Date(2000, month, 1).toLocaleString('es', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white w-full md:w-1/2 lg:w-1/10  ml-14">
            <h2 className="text-lg font-semibold mb-2 text-2xl">Filtrar por Año:</h2>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className='w-24 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            >
              {Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => 2000 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>



        <div className="bg-white mt-2">
          {movimientos.length ? (
            <>
              <table className="w-full" id="movimientosTable">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2">#</th>
                    <th className="py-2">Fecha</th>
                    {/*<th className="py-2">Negocio</th>*/}
                    <th className="py-2">Cuenta</th>
                    <th className="py-2">Subcuenta</th>
                    <th className="py-2">Concepto</th>
                    <th className="py-2">Proveedor</th>
                    <th className="py-2">Comentarios</th>
                    <th className="py-2">Ingreso</th>
                    <th className="py-2">Egreso</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody className="h-200 overflow-auto">
                  {movimientosFiltrados.map((movimiento, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`hover:bg-gray-100 transition-colors border-b border-gray-300 ${editingCell && editingCell.row === rowIndex ? 'bg-yellow-200' : ''}`}
                    >
                      <td className="px-2 py-2 font-bold text-center border-r bg-gray-800 text-white" id='celda'>

                        A{rowIndex + 1}
                      </td>
                      <td
                        className={`px-2 py-2 font-bold text-center border-r border-gray-300 ${editingDateRows.includes(rowIndex) && editingCell.col === 0 ? 'bg-yellow-200' : ''}`}
                        onDoubleClick={() => {
                          handleDoubleClick(rowIndex, 0);
                          setEditingDateRows((prevRows) => [...prevRows, rowIndex || 0]); // Marca la fila actual como en edición de fecha
                        }}
                      >
                        {console.log(rowIndex)}
                        {editingCell && editingCell.row === rowIndex && editingCell.col === 0 ? (
                          <DatePicker
                            selected={movimientos[rowIndex]?.fecha ? new Date(movimientos[rowIndex].fecha) : null}
                            onChange={(date) => {
                              handleDateChange(rowIndex, date);
                            }}
                            onSelect={() => {
                              setEditingDateRows((prevRows) => prevRows.filter((row) => row !== rowIndex)); // Termina la edición de fecha para esta fila
                              handleCellBlur();
                            }}
                            dateFormat="dd-MM-yyyy"
                            inline
                          />
                        ) : (
                          formatearFecha(movimientos[rowIndex]?.fecha) || ''
                        )}
                      </td>
                      <td
                        className={`px-2 py-2 font-bold text-center border-r border-gray-300 ${editingCell && editingCell.row === rowIndex && editingCell.col === 2
                          ? 'bg-yellow-200'
                          : ''
                          }`}
                        onDoubleClick={() => handleDoubleClick(rowIndex, 2)} // Editar Cuenta
                        onBlur={handleCellBlur}
                      >
                        {editingCell && editingCell.row === rowIndex && editingCell.col === 2 ? (
                          <select
                            value={movimientos[rowIndex].selectedCuenta || movimiento.cuenta}
                            onChange={(e) => handleSelectChangeCuenta(rowIndex, e.target.value)}
                          >
                            <option value="#">
                              Selecciona una opción
                            </option>
                            {cuentas.map((cuenta) => (
                              <option key={cuenta._id} value={cuenta._id}>
                                {cuenta.nombre}
                              </option>
                            ))}
                          </select>
                        ) : (
                          cuentas.find((cuenta) => cuenta._id === (movimientos[rowIndex].selectedCuenta || movimiento.cuenta))?.nombre
                        )}
                      </td>
                      <td
                        className={`px-2 py-2 font-bold text-center border-r border-gray-300 ${editingCell && editingCell.row === rowIndex && editingCell.col === 3
                          ? 'bg-yellow-200'
                          : ''
                          }`}
                        onDoubleClick={() => handleDoubleClick(rowIndex, 3)} // Editar Subcuenta
                        onBlur={handleCellBlur}
                      >
                        {editingCell && editingCell.row === rowIndex && editingCell.col === 3 ? (
                          <select
                            value={movimientos[rowIndex].selectedSubcuenta || movimiento.subcuenta}
                            onChange={(e) => handleSelectChangeSubcuenta(rowIndex, e.target.value)}
                          >
                            <option value="#">
                              Selecciona una opción
                            </option>
                            {subcuentas.map((subcuenta) => (
                              <option key={subcuenta._id} value={subcuenta._id}>
                                {subcuenta.nombre}
                              </option>
                            ))}
                          </select>
                        ) : (
                          subcuentas.find((subcuenta) => subcuenta._id === (movimientos[rowIndex].selectedSubcuenta || movimiento.subcuenta))
                            ?.nombre
                        )}
                      </td>
                      <td
                        className={`px-2 py-2 font-bold text-center border-r border-gray-300 ${editingCell && editingCell.row === rowIndex && editingCell.col === 4
                          ? 'bg-yellow-200'
                          : ''
                          }`}
                        onDoubleClick={() => handleDoubleClick(rowIndex, 4)} // Editar Concepto
                        onBlur={handleCellBlur}
                      >
                        {editingCell && editingCell.row === rowIndex && editingCell.col === 4 ? (
                          <select
                            value={movimientos[rowIndex].selectedConcepto || movimiento.concepto}
                            onChange={(e) => handleSelectChangeConcepto(rowIndex, e.target.value)}
                          >
                            <option value="#">
                              Selecciona una opción
                            </option>
                            {conceptos.map((concepto) => (
                              <option key={concepto._id} value={concepto._id}>
                                {concepto.nombre}
                              </option>
                            ))}
                          </select>
                        ) : (
                          conceptos.find((concepto) => concepto._id === (movimientos[rowIndex].selectedConcepto || movimiento.concepto))
                            ?.nombre
                        )}
                      </td>
                      <td
                        className={`px-2 py-2 font-bold text-center border-r border-gray-300 ${editingCell && editingCell.row === rowIndex && editingCell.col === 5
                          ? 'bg-yellow-200'
                          : ''
                          }`}
                        onDoubleClick={() => handleDoubleClick(rowIndex, 5)} // Editar Proveedor
                        onBlur={handleCellBlur}
                      >
                        {editingCell && editingCell.row === rowIndex && editingCell.col === 5 ? (
                          <select
                            value={movimientos[rowIndex].selectedProveedor || movimiento.proveedor}
                            onChange={(e) => handleSelectChangeProveedor(rowIndex, e.target.value)}
                          >
                            <option value="#">
                              Selecciona una opción
                            </option>
                            {proveedores.map((proveedor) => (
                              <option key={proveedor._id} value={proveedor._id}>
                                {proveedor.nombre}
                              </option>
                            ))}
                          </select>
                        ) : (
                          proveedores.find((proveedor) => proveedor._id === (movimientos[rowIndex].selectedProveedor || movimiento.proveedor))
                            ?.nombre
                        )}
                      </td>
                      <td
                        className={`px-2 py-2 font-bold text-center border-r border-gray-300 ${editingCell && editingCell.row === rowIndex && editingCell.col === 6 ? 'bg-yellow-200' : ''}`}
                        onDoubleClick={() => handleDoubleClick(rowIndex, 6)} // Editar Comentarios
                        onBlur={handleCellBlur}
                      >
                        {editingCell && editingCell.row === rowIndex && editingCell.col === 6 ? (
                          <input
                            id='comentarios'
                            type='text'
                            className='py-2 font-bold text-center'
                            value={movimientos[rowIndex].comentarios !== null && movimientos[rowIndex].comentarios !== undefined
                              ? movimientos[rowIndex].comentarios
                              : ''}
                            onChange={(e) => {
                              handleInputChange(rowIndex, 'comentarios', e.target.value);
                              const updatedMovimientos = [...movimientos];
                              updatedMovimientos[rowIndex].comentarios = e.target.value;
                              setMovimientos(updatedMovimientos);
                            }}
                          />
                        ) : (
                          movimiento.comentarios
                        )}
                      </td>
                      <td
                        className={`px-2 py-2 font-bold text-center border-r border-gray-300 ${editingCell && editingCell.row === rowIndex && editingCell.col === 7 ? 'bg-yellow-200' : ''}`}
                        onDoubleClick={() => handleDoubleClick(rowIndex, 7)} // Editar Ingreso
                        onBlur={handleCellBlur}
                      >
                        {editingCell && editingCell.row === rowIndex && editingCell.col === 7 ? (
                          <input
                            id='ingreso'
                            type='number'
                            className='py-2 font-bold text-center'
                            value={movimientos[rowIndex].ingreso || 0}
                            onChange={(e) => {
                              handleInputChange(rowIndex, 'ingreso', e.target.value);
                              const updatedMovimientos = [...movimientos];
                              updatedMovimientos[rowIndex].ingreso = e.target.value;
                              setMovimientos(updatedMovimientos);
                            }}
                          />
                        ) : (
                          movimiento.ingreso
                        )}
                      </td>
                      <td
                        className={`px-2 py-2 font-bold text-center border-r border-gray-300 ${editingCell && editingCell.row === rowIndex && editingCell.col === 8 ? 'bg-yellow-200' : ''}`}
                        onDoubleClick={() => handleDoubleClick(rowIndex, 8)} // Editar Egreso
                        onBlur={handleCellBlur}
                      >
                        <input type='hidden' value={selectedNegocio} name='negocio' />
                        <input type='hidden' value={movimiento._id} name='_id' />
                        {editingCell && editingCell.row === rowIndex && editingCell.col === 8 ? (
                          <input
                            id='egreso'
                            type='number'
                            className='py-2 font-bold text-center'
                            value={movimientos[rowIndex].egreso || 0}
                            onChange={(e) => {
                              handleInputChange(rowIndex, 'egreso', e.target.value);
                              const updatedMovimientos = [...movimientos];
                              updatedMovimientos[rowIndex].egreso = e.target.value;
                              setMovimientos(updatedMovimientos);
                            }}
                          />

                        ) : (
                          movimiento.egreso
                        )}
                      </td>
                      {/*console.log(movimiento)*/}
                      {esEditable(movimiento.fecha) && (
                        <td className="px-2 py-2 font-bold text-center border-r border-gray-300">
                          {!movimiento.negocio || movimiento.negocioCambiado || movimiento.cuentaCambiada || movimiento.subcuentaCambiada || movimiento.conceptoCambiado || movimiento.proveedorCambiado || movimiento.fechaCambiada || movimiento.comentariosCambiado || movimiento.ingresoCambiado || movimiento.egresoCambiado ? (
                            <button id="crear" onClick={() => manejarEdicion(movimiento)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-blue-500 hover:text-blue-700"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ) : null}

                          {movimiento.negocio ? (
                            <button id="eliminar" onClick={() => manejarEliminacion(movimiento._id)} style={
                              {
                                display: movimiento.negocioCambiado ||
                                  movimiento.cuentaCambiada ||
                                  movimiento.subcuentaCambiada ||
                                  movimiento.conceptoCambiado ||
                                  movimiento.proveedorCambiado ||
                                  movimiento.fechaCambiada ||
                                  movimiento.comentariosCambiado ||
                                  movimiento.ingresoCambiado ||
                                  movimiento.egresoCambiado
                                  ? 'none' : 'inline'
                              }
                            } >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-red-500 hover:text-red-700">
                                <path
                                  fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ) : null}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-center text-gray-600 uppercase p-5">No hay Movimientos aún</p>
          )}
        </div>

        {/* Campos de Totales */}
        <div className="flex justify-end items-center p-1 bg-white">
          <div className="mr-4">
            <strong>Ingresos:</strong> {totalIngresos}
          </div>
          <div className="mr-4">
            <strong>Egresos:</strong> {totalEgresos}
          </div>
          <div>
            <strong>Total:</strong> {total}
          </div>
        </div>
      </div >
      {/* Botones de exportación */}
      < div className=" flex justify-end items-center p-1 bg-white" >
        <ReactHTMLTableToExcel
          table="movimientosTable"
          filename="movimientos"
          sheet="sheet1"
          buttonText={
            <svg className="w-10 h-10 text-green-500 hover:text-green-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2 0 1.1.9 2 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm1 8.8A2.3 2.3 0 0 0 9.6 13a2.3 2.3 0 0 0 2.1 2.5h.7a.3.3 0 0 1 .2.4l-.4.1h-1a1 1 0 1 0 0 2h1c.5 0 1 0 1.4-.3a2 2 0 0 0 1-1.1 2.3 2.3 0 0 0-2.2-3l-.5-.1a.3.3 0 0 1-.3-.4.3.3 0 0 1 .4-.3h1a1 1 0 1 0 0-2h-1Zm8 1.5a1 1 0 1 0-2-.6l-.5 1.7-.5-1.7a1 1 0 0 0-2 .6l1.5 4.8a1 1 0 0 0 1.9 0l1.6-4.8Zm-13.8.9.4-.2h1a1 1 0 1 0 0-2h-1A2.6 2.6 0 0 0 4 13.6v1.8A2.6 2.6 0 0 0 6.6 18h1a1 1 0 1 0 0-2h-1a.6.6 0 0 1-.6-.6v-1.8c0-.1 0-.3.2-.4Z" clipRule="evenodd" />
            </svg>
          }
          className="text-white font-bold py-2 px-4 cursor-pointer"
        />
        <button onClick={exportToPDF} className="text-white font-bold py-2 px-4 cursor-pointer">
          <svg
            className="w-10 h-10 text-red-500 hover:text-red-700 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2 0 1.1.9 2 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h1.4a2.6 2.6 0 0 0 2.6-2.6v-1.8a2.6 2.6 0 0 0-2.6-2.6H11Zm1 5v-3h.4a.6.6 0 0 1 .6.6v1.8a.6.6 0 0 1-.6.6H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div >
    </>
  );
};

export default Movimientos;
