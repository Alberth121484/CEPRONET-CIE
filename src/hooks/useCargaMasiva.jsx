import { useState } from 'react';
import clienteAxios from '../config/clienteAxios'
import moment from 'moment';


const useCargaMasiva = () => {
    const [selectedCatalog, setSelectedCatalog] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alerta, setAlerta] = useState({});

    const handleCatalogChange = (e) => {
        setSelectedCatalog(e.target.value);
        setFile(null);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const selectedFile = e.dataTransfer.files[0];
        setFile(selectedFile);
    };

    const handleDownloadTemplate = () => {
        const templateName = `${selectedCatalog.toLowerCase()}.csv`;
        const templatePath = `../../public/templetes/${templateName}`;
        console.log(templateName)
        const link = document.createElement('a');
        link.href = templatePath;
        link.download = templateName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSubmit = async () => {
        try {
          // Establecer el estado de carga en true antes de hacer la llamada a la API
          setLoading(true);
        
          // Realiza tu llamada a la API (suponiendo que handleFileSubmit es una función asíncrona)
          await handleFileSubmit();

          // Borra el estado de carga después de que se complete la llamada a la API
          //setLoading(false);

        } catch (error) {
          // Maneja el error si es necesario
          console.error('Error durante la subida del archivo:', error);
          // Borra el estado de carga en caso de un error
          setLoading(false);
        }
    };

    const handleFileSubmit = async () => {
        await handleUpload();
    };

    const preventDefaultHandler = (e) => {
        e.preventDefault();
    };

    const handleUpload = async () => {
        if (!file) {
            setAlerta({ msg: 'Por favor, seleccione un archivo.', error: false });
            setLoading(false);
            return;
        }

        const fileName = file.name.toLowerCase();
        const expectedFileName = `${selectedCatalog.toLowerCase()}.csv`;


        if (fileName !== expectedFileName) {
            setAlerta({ msg: 'Lo lamento, el archivo subido no cumple con las características necesarias para la carga.', error: false });
            setLoading(false);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = e.target.result;
            // Parse y procesa el archivo CSV (puedes implementar la lógica de procesamiento aquí)
            const parsedData = parseCSV(csvData, selectedCatalog.toLocaleLowerCase());

            if (!parsedData || parsedData.length === 0) {
                setAlerta({ msg: 'Error al parsear el archivo CSV.', error: false });
                setLoading(false);
                return;
            }

            const catalogObject = parsedData;

            CargaMasivaUpload(catalogObject);
        };

        reader.readAsText(file);
    };

    const parseCSV = (csvData, selectedCatalog) => {
        try {
            // Divide el CSV en líneas
            const lines = csvData.split('\n');

            // Obtiene los encabezados (la primera línea)
            const headers = lines[0].split(',');

            // Inicializa un array para almacenar los datos parseados
            const parsedData = [];

            // Itera sobre las líneas del CSV, comenzando desde la segunda línea
            for (let i = 1; i < lines.length; i++) {
                const currentLine = lines[i];

                // Salta líneas vacías
                if (!currentLine.trim()) {
                    continue;
                }

                // Divide la línea en valores
                const values = currentLine.split(',');

                // Crea un objeto con los encabezados y valores correspondientes
                const rowData = {};
                for (let j = 0; j < headers.length; j++) {
                    rowData[headers[j]] = values[j];
                }

                // Agrega el campo "catalogo" al objeto con el valor seleccionado
                rowData['catalogo'] = selectedCatalog;

                // Agrega el objeto al array de datos parseados
                parsedData.push(rowData);
            }
            return parsedData;
        } catch (error) {
            setAlerta({ msg: 'Error al parsear el archivo CSV:', error: true });
            return null;
        }
    };

    const CargaMasivaUpload = async (catalogObject) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            let successCount = 0;

            for (const record of catalogObject) {
                let apiUrl;

                switch (record.catalogo) {
                    case "negocios":
                        apiUrl = "/negocios";
                        break;
                    case "proveedores":
                        apiUrl = "/proveedores";
                        break;
                    case "cuentas":
                        apiUrl = "/cuentas";
                        try {
                            // Obtener el _id del tipo
                            const tipoResponse = await clienteAxios(`/tipos?nombre=${record.tipo}`, config);
                            const tipoId = tipoResponse.data[0]._id;

                            // Obtener el _id del banco
                            const bancoResponse = await clienteAxios(`/bancos?nombre=${record.banco}`, config);
                            const bancoId = bancoResponse.data[0]._id;

                            // Modificar valores de record.tipo y record.cuentaAsociada
                            record.tipo = tipoId;
                            record.banco = bancoId;
                        } catch (error) {
                            setAlerta({ msg: 'Error al obtener _id de bancos o tipos:', error: true });
                            continue;
                        }
                        break;
                    case "tipos":
                        apiUrl = "/tipos";
                        break;
                    case "subcuentas":
                        apiUrl = "/subcuentas";
                        try {
                            // Obtener el _id del tipo
                            const tipoResponse = await clienteAxios(`/tipos?nombre=${record.tipo}`, config);
                            const tipoId = tipoResponse.data[0]._id;

                            // Obtener el _id del banco
                            const bancoResponse = await clienteAxios(`/bancos?nombre=${record.banco}`, config);
                            const bancoId = bancoResponse.data[0]._id;

                            // Obtener el _id del cuenta
                            const cuentaPrincipalResponse = await clienteAxios(`/cuentas?nombre=${record.cuentaPrincipal}`, config);
                            const cuentaPrincipalId = cuentaPrincipalResponse.data[0]._id;

                            // Modificar valores de record.tipo y record.cuentaAsociada
                            record.tipo = tipoId;
                            record.banco = bancoId;
                            record.cuentaPrincipal = cuentaPrincipalId;
                        } catch (error) {
                            setAlerta({ msg: 'Error al obtener _id de bancos , tipos o cuentas:', error: true });
                            continue;
                        }
                        break;
                    case "conceptos":
                        apiUrl = "/conceptos";
                        break;
                    case "bancos":
                        apiUrl = "/bancos";
                        try {
                            // Obtener el _id del tipo
                            const tipoResponse = await clienteAxios(`/tipos?nombre=${record.tipo}`, config);
                            const tipoId = tipoResponse.data[0]._id;

                            // Modificar valores de record.tipo y record.cuentaAsociada
                            record.tipo = tipoId;
                        } catch (error) {
                            setAlerta({ msg: 'Error al obtener _id de tipod:', error: true });
                            continue;
                        }
                        break;
                    case "movimientos":
                        apiUrl = "/movimientos";
                        try {
                            // Obtener el _id del cuenta
                            const negocioResponse = await clienteAxios(`/negocios?nombre=${record.negocio}`, config);
                            const negocioId = negocioResponse.data[0]._id;
                            // Obtener el _id del cuenta
                            const cuentaResponse = await clienteAxios(`/cuentas?nombre=${record.cuenta}`, config);
                            const cuentaId = cuentaResponse.data[0]._id;
                            // Obtener el _id del subcuenta
                            const subcuentaResponse = await clienteAxios(`/subcuentas?nombre=${record.subcuenta}`, config);
                            const subcuentaId = subcuentaResponse.data[0]._id;
                            // Obtener el _id del concepto
                            const conceptoResponse = await clienteAxios(`/conceptos?nombre=${record.concepto}`, config);
                            const conceptoId = conceptoResponse.data[0]._id;
                            // Obtener el _id del proveedor
                            const proveedorResponse = await clienteAxios(`/proveedores?nombre=${record.proveedor}`, config);
                            const proveedorId = proveedorResponse.data[0]._id;
                            // Convertir la cadena de fecha a tipo Date utilizando moment
                            const fecha = moment(record.fecha, 'DD/MM/YYYY').toDate();

                            // Modificar valores de record.tipo y record.cuentaAsociada
                            record.fecha = fecha;
                            record.cuenta = cuentaId;
                            record.subcuenta = subcuentaId;
                            record.concepto = conceptoId;
                            record.proveedor = proveedorId;
                            record.negocio = negocioId;
                        } catch (error) {
                            setAlerta({ msg: 'Error al obtener _id de cuenta , subcuenta, concepto, proveedor, conceptos, negocios:', error: true });
                            continue;
                        }
                        break;
                    case "prestamos":
                        apiUrl = "/prestamos";
                        break;
                    case "empleados":
                        apiUrl = "/empleados";
                        break;
                    default:
                        setAlerta({ msg: 'Catálogo no reconocido', error: true });
                        continue;
                }

                try {
                    const dataToSend = { ...record };
                    delete dataToSend.catalogo; // Excluir el campo 'catalogo'

                    const { data } = await clienteAxios.post(apiUrl, dataToSend, config);
                    successCount++;
                    console.log(`Registro insertado en ${apiUrl}:`, data);
                } catch (error) {
                    console.error(`Error al insertar en ${apiUrl}:`, error);

                    // En caso de desconexión, esperar y reintentar después de 5 segundos
                    if (error.message.includes("Network Error")) {
                        console.log("Esperando 5 segundos antes de reintentar...");
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }

                }
            }
            setAlerta({ msg: `Operación completada. ${successCount} registros insertados con éxito.`, error: false });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        handleCatalogChange,
        handleFileChange,
        handleFileDrop,
        handleDownloadTemplate,
        handleSubmit,
        preventDefaultHandler,
        selectedCatalog,
        file,
        setFile,
        loading,
        setLoading,
        alerta,
    };
};

export default useCargaMasiva;
