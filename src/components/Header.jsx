import { useState } from 'react'
import { Link } from 'react-router-dom'
import useNegocios from '../hooks/useNegocios'
import useConfiguracion from '../hooks/useConfiguracion'
import useAuth from '../hooks/useAuth'


const Header = () => {

    const { cerrarSesionNegocios } = useNegocios()
    const { cerrarSesionAuth } = useAuth()

    const handleCerrarSesion = () => {
        cerrarSesionAuth()
        cerrarSesionNegocios()
        localStorage.removeItem('token')
    }
    //Menú emergente
    const { configuraciones } = useConfiguracion()
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    //console.log(configuraciones[0].logotipo)
    const closeDropdown = () => {
        setDropdownOpen(false);
    };
    let hayIcono = false
    if (configuraciones.length > 0 && configuraciones[0].logotipo) {
        hayIcono = true
    } else {
        hayIcono = false
    }

    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <div className='flex items-center space-x-3'>
                    {hayIcono && (
                        <img src={configuraciones.length > 0 ? '../../public/icon/'+configuraciones[0].logotipo : ""} alt="" className='h-14 w-18' />
                    )}
                    <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
                    {configuraciones.length > 0 ? configuraciones[0].nombre : ""}
                    </h2>
                </div>

                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <Link
                        to="/movimientos"
                        className='font-bold uppercase'
                    >Movimientos</Link>
                    <Link
                        to="/prestamos"
                        className='font-bold uppercase'
                    >Prestamos</Link>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="font-bold uppercase cursor-pointer focus:outline-none"
                        >
                            Catalogos
                        </button>
                        {dropdownOpen && (
                            <div
                                className="absolute left-0 mt-2 bg-white border rounded-md shadow-md"
                                onMouseLeave={closeDropdown}
                            >
                                <ul>
                                    <li><Link to="/negocios" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 uppercase font-bold">Negocios</Link></li>
                                    <li><Link to="/proveedores" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 uppercase font-bold">Proveedores</Link></li>
                                    <li><Link to="/cuentas" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 uppercase font-bold">Cuentas</Link></li>
                                    <li><Link to="/subcuentas" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 uppercase font-bold">Subcuentas</Link></li>
                                    <li><Link to="/conceptos" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 uppercase font-bold">Conceptos</Link></li>
                                    <li><Link to="/bancos" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 uppercase font-bold">Bancos</Link></li>
                                    <li><Link to="/tipos" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 uppercase font-bold">Tipos de Movimiento</Link></li>
                                    {/* Agrega más enlaces según sea necesario */}
                                </ul>
                            </div>
                        )}
                    </div>
                    <Link
                        to="/reportes"
                        className='font-bold uppercase'
                    >Reportes</Link>
                    <Link
                        to="/herramientas"
                        className='font-bold uppercase'
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="currentColor"
                        className="w-6 h-6 text-gray-500 hover:text-gray-700"
                    >
                            <path
                                fillRule="evenodd"
                                d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                                clipRule="evenodd"
                            />
                            <path
                                d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z"
                            />
                            <path
                                fillRule="evenodd"
                                d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>


                    <button
                        type="button"
                        className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                        onClick={handleCerrarSesion}
                    >Cerrar Sesión</button>

                </div>
            </div>
        </header>
    )
}

export default Header