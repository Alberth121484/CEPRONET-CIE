import Card from '../components/Card.jsx'
import { Link } from 'react-router-dom';


const Herramientas = () => {

    return (
        <>

            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-black">Herramientas</h1>
                </div>
            </div>
           
            <div className="flex flex-wrap">
           
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pt-10">
                    <Link
                    to="/cargamasiva"
                    className='font-bold uppercase'
                >
                        <Card
                            title="Carga masiva"
                            text="En este apartado podrás administrar las cargas masivas para los catálogos del sistema."
                            image="../../public/cargamasiva.jpg"
                            linkTo="/CargaMasiva"
                        />
                        </Link>
                    </div>
                

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pt-10">
                <Link
                    to="/registrar"
                    className='font-bold uppercase'
                >
                    <Card 
                    title="Crear cuenta" 
                    text="En este apartado podrás administrar las cuentas de usuario de el sistema." 
                    image="../../public/add-users.png" 
                    />
                    </Link>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pt-10">
                <Link
                    to="/configuraciones"
                    className='font-bold uppercase'
                >
                    <Card 
                    title="Configuraciones" 
                    text="En este apartado podrás Cambiar el nombre de la empresa y asignarle un logotipo." 
                    image="../../public/configuracion.png" 
                    />
                    </Link>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pt-10">
                    <Card title="Card 4" text="Description 4" image="path/to/image4.jpg" />
                </div>
            </div>


        </>
    );
};

export default Herramientas;
