import useSubcuentas from '../hooks/useSubcuentas';
import useTipos from '../hooks/useTipos';
import useBancos from '../hooks/useBancos';
import useCuentas from '../hooks/useCuentas';
import Alerta from '../components/Alerta';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ModalFormularioSubcuenta from '../components/ModalFormularioSubcuenta';
import ModalEliminarSubcuenta from '../components/ModalEliminarSubcuenta';
import { useState, useEffect } from 'react';
import { object } from 'prop-types';

const Subcuentas = () => {
  const { subcuentas, alerta, handleModalSubcuenta, handleModalEditarSubcuenta, handleModalEliminarSubcuenta, mostrarAlerta } = useSubcuentas();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const { tipos } = useTipos();
  const { bancos } = useBancos();
  const { cuentas } = useCuentas();

  

  /*// Estado para el paginador
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 15; // Cambiar según tus necesidades

  // Lógica para el paginador
  const offset = currentPage * pageSize;
  const pageCount = Math.ceil(negocios.length / pageSize);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };*/

  // Función para exportar a PDF
  const exportToPDF = () => {
    try {
    const unit = 'pt';
    const size = 'A4'; // Puedes cambiar el tamaño según tus necesidades
    const orientation = 'portrait'; // 'portrait' o 'landscape'

    const doc = new jsPDF(orientation, unit, size);

    doc.text('Subcuentas', 40, 40);

    const tableHeaders = [['Nombre', 'Banco', 'Cuenta Principal', 'Subcuenta', 'Tipo', 'Saldo Inicial', 'Descripción']];
    const tableData = subcuentas/*.slice(offset, offset + pageSize)*/.map(subcuenta => [
      subcuenta.nombre,
      subcuenta.banco,
      subcuenta.cuentaPrincipal,
      subcuenta.ultimosDigitosCuenta,
      subcuenta.tipo,
      subcuenta.saldoInicial,
      subcuenta.descripcion,
    ]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 60,
    });

    doc.save('subcuentas.pdf');
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
    mostrarAlerta({ msg: 'Error al exportar a PDF', tipo: 'error' });
  }

 };
  
  //const {msg} = alerta

  useEffect(() => {
    // Muestra el mensaje durante 3 minutos cuando alerta cambia
    if (alerta.msg) {
        setMostrarMensaje(true);
        const timeout = setTimeout(() => {
            setMostrarMensaje(false);  
        }, 3000); // 3 minutos en milisegundos
        const timeout2 = setTimeout(() => {
          window.location.reload();
      }, 3300);
        // Limpia el temporizador al desmontar el componente
        return () => clearTimeout(timeout, timeout2);
    }
}, [alerta]);

  return (
    <>
    
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-black">Subcuentas</h1>
          <button
            onClick={handleModalSubcuenta}
            type='button'
            className="p-3 font-bold block mt-5 text-center"
          >
            <svg className="h-12 w-12 text-blue-500 hover:text-blue-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="8" x2="12" y2="16" />  <line x1="8" y1="12" x2="16" y2="12" /></svg>
          </button>
        </div>
        <div className='flex justify-center'>
          <div className='w-full md:w-1/3 lg:w-1/4'>
            {mostrarMensaje && <Alerta alerta={alerta} />}
          </div>
        </div>
        

        <div className="bg-white shadow mt-10 rounded-lg">
        <ModalFormularioSubcuenta />
        <ModalEliminarSubcuenta />
          {subcuentas.length ? (
            <>
              <table className="w-full" id="subcuentasTable">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2">Nombre</th>
                    <th className="py-2">Banco</th>
                    <th className="py-2">Cuenta Principal</th>
                    <th className="py-2">Subcuenta</th>
                    <th className="py-2">Tipo</th>
                    <th className="py-2">Saldo Inicial</th>
                    <th className="py-2">Descripción</th>
                    <th className="py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody className='h-200 overflow-auto'>
                  {subcuentas/*.slice(offset, offset + pageSize)*/.map(subcuenta => (
                     <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300" key={subcuenta._id}>
                     <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{subcuenta.nombre}</td>
                     <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{subcuenta.banco ? bancos.find(banco => banco._id === subcuenta.banco)?.nombre : ''}</td>
                     <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{subcuenta.cuentaPrincipal ? cuentas.find(cuenta => cuenta._id === subcuenta.cuentaPrincipal)?.nombre : ''}</td>
                     <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{'XXXX-XXXX-XXXX-'+subcuenta.ultimosDigitosCuenta}</td>
                     <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{subcuenta.tipo ? tipos.find(tipo => tipo._id === subcuenta.tipo)?.nombre : ''}</td>
                     <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{subcuenta.saldoInicial}</td>
                     <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{subcuenta.descripcion}</td>
                     <td className='px-2 py-2 font-bold text-center'>
                         <div className='flex justify-center space-x-4'>
                             <div>
                                 <button
                                     onClick={ () => handleModalEditarSubcuenta(subcuenta)}
                                     type='button'
                                     className="p-3 font-bold block mt-5 text-center"
                                 >
                                     <svg className="h-6 w-6 text-green-500 hover:text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                     </svg>
                                 </button>
                             </div>
                             <div>
                                     <button
                                         className='p-3 font-bold block mt-5 text-center'
                                         onClick={() => handleModalEliminarSubcuenta(subcuenta)}
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
                  ))}
                </tbody>
              </table>

              {/* Botones de exportación */}
              <div className="mt-1 flex justify-end items-center p-1 bg-white">
                <ReactHTMLTableToExcel
                  table="subcuentasTable"
                  filename="subcuentas"
                  sheet="sheet1"
                  buttonText={<svg className="w-10 h-10 text-green-500 hover:text-green-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2 0 1.1.9 2 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm1 8.8A2.3 2.3 0 0 0 9.6 13a2.3 2.3 0 0 0 2.1 2.5h.7a.3.3 0 0 1 .2.4l-.4.1h-1a1 1 0 1 0 0 2h1c.5 0 1 0 1.4-.3a2 2 0 0 0 1-1.1 2.3 2.3 0 0 0-2.2-3l-.5-.1a.3.3 0 0 1-.3-.4.3.3 0 0 1 .4-.3h1a1 1 0 1 0 0-2h-1Zm8 1.5a1 1 0 1 0-2-.6l-.5 1.7-.5-1.7a1 1 0 0 0-2 .6l1.5 4.8a1 1 0 0 0 1.9 0l1.6-4.8Zm-13.8.9.4-.2h1a1 1 0 1 0 0-2h-1A2.6 2.6 0 0 0 4 13.6v1.8A2.6 2.6 0 0 0 6.6 18h1a1 1 0 1 0 0-2h-1a.6.6 0 0 1-.6-.6v-1.8c0-.1 0-.3.2-.4Z" clipRule="evenodd"/>
                </svg>}
                
                  className="text-white font-bold py-2 px-4 cursor-pointer"
                />
                <button
                  onClick={exportToPDF}
                  className="text-white font-bold py-2 px-4 cursor-pointer"
                >
                     <svg className="w-10 h-10 text-red-500 hover:text-red-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2 0 1.1.9 2 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h1.4a2.6 2.6 0 0 0 2.6-2.6v-1.8a2.6 2.6 0 0 0-2.6-2.6H11Zm1 5v-3h.4a.6.6 0 0 1 .6.6v1.8a.6.6 0 0 1-.6.6H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clipRule="evenodd"/>
                    </svg>
                </button>
              </div>

              {/* Paginador */}
              {/*<ReactPaginate
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination flex justify-center mt-4 pb-10 space-x-5'}
                previousLinkClassName={'pagination__link bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-l'}
                nextLinkClassName={'pagination__link bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-r'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active bg-blue-500 text-white'}
              />*/}
            </>
            
          ) : (
            <p className="text-center text-gray-600 uppercase p-5">No hay Subcuentas aún</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Subcuentas;
