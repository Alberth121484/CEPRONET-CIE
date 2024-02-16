import useReportes from '../hooks/useReportes';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useNegocios from '../hooks/useNegocios';
import useCuentas from '../hooks/useCuentas';
import useSubcuentas from '../hooks/useSubcuentas';
import useConceptos from '../hooks/useConceptos';
import useProveedores from '../hooks/useProveedores';
import useBancos from '../hooks/useBancos';
import { formatearFecha } from '../helpers/formatearFecha';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reportes = () => {
  let { setEndDate, setStartDate, endDate, startDate, selectedNegocio, setSelectedNegocio, selectedCuenta, setSelectedCuenta, selectedSubcuenta, setSelectedSubcuenta, selectedConcepto, setSelectedConcepto, selectedProveedor ,setSelectedProveedor ,selectedBanco, setSelectedBanco} = useReportes();
  const { reportes } = useReportes();
  const { negocios } = useNegocios();
  const { cuentas } = useCuentas();
  const { subcuentas } = useSubcuentas();
  const { conceptos } = useConceptos();
  const { proveedores } = useProveedores();
  const { bancos } = useBancos();
  const [totalIngresos, setTotalIngresos] = useState(0);
  const [totalEgresos, setTotalEgresos] = useState(0);
  const [total, setTotal] = useState(0);

  const exportToPDF = () => {
    try {
    const unit = 'pt';
    const size = 'A4'; // Puedes cambiar el tamaño según tus necesidades
    const orientation = 'landscape'; // 'portrait' o 'landscape'

    const doc = new jsPDF(orientation, unit, size);

    doc.text('Proveedores', 40, 40);

    const tableHeaders = [['Fecha', 'Negocio', 'Cuenta', 'Subcuenta', 'Concepto', 'Proveedor', 'Comentarios', 'Ingreso', 'Egreso']];
    const tableData = reportes/*.slice(offset, offset + pageSize)*/.map(reporte => [
      formatearFecha(reporte.fecha),
      reporte.negocio ? negocios.find(negocio => negocio._id === reporte.negocio)?.nombre : '',
      reporte.cuenta ? cuentas.find(cuenta => cuenta._id === reporte.cuenta)?.nombre : '',
      reporte.subcuenta ? subcuentas.find(subcuenta => subcuenta._id === reporte.subcuenta)?.nombre : '',
      reporte.concepto ? conceptos.find(concepto => concepto._id === reporte.concepto)?.nombre : '',
      reporte.proveedor ? proveedores.find(proveedor => proveedor._id === reporte.proveedor)?.nombre : '',
      reporte.comentarios,
      reporte.ingreso,
      reporte.egreso,
    ]);

    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 60,
    });

    doc.save('proveedores.pdf');
  } catch (error) {
    console.error('Error al exportar a PDF:', error);
    mostrarAlerta({ msg: 'Error al exportar a PDF', tipo: 'error' });
  }

 };

  useEffect(() => {
    // Calcula la suma de ingresos, egresos y total para el negocio seleccionado
    const sumIngresos = reportes.reduce((total, reporte) => {
      return reporte.negocio === selectedNegocio
        ? total + parseFloat(reporte.ingreso)
        : total;
    }, 0);

    const sumEgresos = reportes.reduce((total, reporte) => {
      return reporte.negocio === selectedNegocio
        ? total + parseFloat(reporte.egreso)
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
  }, [reportes, selectedNegocio, endDate, startDate, selectedCuenta, selectedSubcuenta, selectedConcepto, selectedProveedor, selectedBanco]);

  // Obtiene la fecha del primer día del mes actual
  const primerDiaDelMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  // Obtiene la fecha del último día del mes actual
  const ultimoDiaDelMes = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);


  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Reportes</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-1 mt-5 bg-white rounded shadow-md p-5" id='contenedor'>
          <div className="bg-white w-full md:w-1/2 lg:w-1/10 flex flex-col items-center">
            <h1 className="text-lg font-semibold mb-2 text-2xl">Fecha</h1>
            <div className="flex">
              <div className="flex items-center w-20">
                <div className="flex-shrink-0">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="bg-white rounded shadow-md p-2 w-20"
                  />
                </div>
                <div className="mx-2">
                  <p className="text-xl font-bold">a</p>
                </div>
                <div className="flex-shrink-0">
                  {/* DatePicker con el último día del mes actual */}
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="bg-white rounded shadow-md p-2 w-20"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-full md:w-1/2 lg:w-1/10 ml-14">
            <h2 className="text-lg font-semibold mb-2 text-2xl">Negocio</h2>
            <select 
            value={selectedNegocio || ''} 
            onChange={(e) => setSelectedNegocio(e.target.value)} 
            className='w-24 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
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
            <h2 className="text-lg font-semibold mb-2 text-2xl">Cuenta</h2>
            <select 
            value={selectedCuenta || ''} 
            onChange={(e) => setSelectedCuenta(e.target.value)} 
            className='w-24 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            >
              <option value="">Todos</option>
              {cuentas.map((cuenta) => (
                <option key={cuenta._id} value={cuenta._id}>
                  {cuenta.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white w-full md:w-1/2 lg:w-1/10  ml-14">
            <h2 className="text-lg font-semibold mb-2 text-2xl">Subcuenta</h2>
            <select 
            value={selectedSubcuenta} 
            onChange={(e) => setSelectedSubcuenta(e.target.value)} 
            className='w-24 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            >
              <option value="">Todos</option>
              {subcuentas.map((subcuenta) => (
                <option key={subcuenta._id} value={subcuenta._id}>
                  {subcuenta.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white w-full md:w-1/2 lg:w-1/10  ml-14">
            <h2 className="text-lg font-semibold mb-2 text-2xl">Concepto</h2>
            <select 
            value={selectedConcepto} 
            onChange={(e) => setSelectedConcepto(e.target.value)} 
            className='w-24 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            >
              <option value="">Todos</option>
              {conceptos.map((concepto) => (
                <option key={concepto._id} value={concepto._id}>
                  {concepto.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white w-full md:w-1/2 lg:w-1/10  ml-14">
            <h2 className="text-lg font-semibold mb-2 text-2xl">Proveedor</h2>
            <select 
            value={selectedProveedor} 
            onChange={(e) => setSelectedProveedor(e.target.value)} 
            className='w-24 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'
            >
              <option value="">Todos</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor._id} value={proveedor._id}>
                  {proveedor.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-white w-full md:w-1/2 lg:w-1/10  ml-14">
            <h2 className="text-lg font-semibold mb-2 text-2xl">Banco</h2>
            <select 
            value={selectedBanco} 
            onChange={(e) => setSelectedBanco(e.target.value)} 
            className='w-24 px-2 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300'>
              <option value="">Todos</option>
              {bancos.map((banco) => (
                <option key={banco._id} value={banco._id}>
                  {banco.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-end justify-end right-0 p-2">
          <button
          onClick={exportToPDF}
            type="button"
            className="font-bold block text-center"
            id='exportar'
          >
            <svg className="h-8 w-8 text-indigo-500 hover:text-indigo-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />  <polyline points="7 10 12 15 17 10" />  <line x1="12" y1="15" x2="12" y2="3" /></svg>
          </button>
        </div>
        <div className="bg-white mt-2 h-[500px] overflow-x-auto" id='contenedor'>
          {reportes.length ? (
            <>
              <table className="w-full" id="proveedoresTable">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2">Fecha</th>
                    <th className="py-2">Negocio</th>
                    <th className="py-2">Cuenta</th>
                    <th className="py-2">Subcuenta</th>
                    <th className="py-2">Concepto</th>
                    <th className="py-2">Proveedor</th>
                    <th className="py-2">Comentarios</th>
                    <th className="py-2">Ingreso</th>
                    <th className="py-2">Egreso</th>
                  </tr>
                </thead>
                <tbody className='h-200 overflow-auto'>
                  {reportes/*.slice(offset, offset + pageSize)*/.map(reporte => (
                    <tr className="hover:bg-gray-100 transition-colors border-b border-gray-300" key={reporte._id}>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{formatearFecha(reporte.fecha)}</td>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{reporte.negocio ? negocios.find(negocio => negocio._id === reporte.negocio)?.nombre : ''}</td>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{reporte.cuenta ? cuentas.find(cuenta => cuenta._id === reporte.cuenta)?.nombre : ''}</td>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{reporte.subcuenta ? subcuentas.find(subcuenta => subcuenta._id === reporte.subcuenta)?.nombre : ''}</td>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{reporte.concepto ? conceptos.find(concepto => concepto._id === reporte.concepto)?.nombre : ''}</td>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{reporte.proveedor ? proveedores.find(proveedor => proveedor._id === reporte.proveedor)?.nombre : ''}</td>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{reporte.comentarios}</td>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{reporte.ingreso}</td>
                      <td className='px-2 py-2 font-bold text-center border-r border-gray-300'>{reporte.egreso}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
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
              <div className="mt-1 flex justify-end items-center p-1 bg-white">
                <ReactHTMLTableToExcel
                  table="proveedoresTable"
                  filename="proveedores"
                  sheet="sheet1"
                  buttonText={<svg className="w-10 h-10 text-green-500 hover:text-green-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2 0 1.1.9 2 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm1 8.8A2.3 2.3 0 0 0 9.6 13a2.3 2.3 0 0 0 2.1 2.5h.7a.3.3 0 0 1 .2.4l-.4.1h-1a1 1 0 1 0 0 2h1c.5 0 1 0 1.4-.3a2 2 0 0 0 1-1.1 2.3 2.3 0 0 0-2.2-3l-.5-.1a.3.3 0 0 1-.3-.4.3.3 0 0 1 .4-.3h1a1 1 0 1 0 0-2h-1Zm8 1.5a1 1 0 1 0-2-.6l-.5 1.7-.5-1.7a1 1 0 0 0-2 .6l1.5 4.8a1 1 0 0 0 1.9 0l1.6-4.8Zm-13.8.9.4-.2h1a1 1 0 1 0 0-2h-1A2.6 2.6 0 0 0 4 13.6v1.8A2.6 2.6 0 0 0 6.6 18h1a1 1 0 1 0 0-2h-1a.6.6 0 0 1-.6-.6v-1.8c0-.1 0-.3.2-.4Z" clipRule="evenodd"/>
                </svg>}
                
                  className="text-white font-bold py-2 px-4 cursor-pointer"
                />
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600 uppercase p-5">No hay Reportes aún</p>
          )}
        </div>
      </div >
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
    </>
  );
};

export default Reportes;
