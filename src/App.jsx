import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Negocios from './paginas/Negocios'
import Bancos from './paginas/Bancos'
import Proveedores from './paginas/Proveedores'
import Tipos from './paginas/Tipos'
import Cuentas from './paginas/Cuentas'
import Subcuentas from './paginas/Subcuentas'
import Conceptos from './paginas/Conceptos'
import Movimientos from './paginas/Movimientos'
import Prestamos from './paginas/Prestamos'
import Reportes from './paginas/Reportes'
import Herramientas from './paginas/Herramientas'
import CargaMasiva from './paginas/CargaMasiva'
import Configuracion from './paginas/Configuracion'

import {AuthProvider} from './context/AuthProvider'
import {NegociosProvider} from './context/NegociosProvider'
import {BancosProvider} from './context/BancosProvider'
import {ProveedoresProvider} from './context/ProveedoresProvider'
import {TiposProvider} from './context/TiposProvider'
import {CuentasProvider} from './context/CuentasProvider'
import {SubcuentasProvider} from './context/SubcuentasProvider'
import {ConceptosProvider} from './context/ConceptosProvider'
import {MovimientosProvider} from './context/MovimientosProvider'
import {PrestamosProvider} from './context/PrestamosProvider'
import {ReportesProvider} from './context/ReportesProvider'
import {HerramientasProvider} from './context/HerramientasProvider'
import {CargaMasivaProvider} from './context/CargaMasivaProvider'
import {ConfiguracionesProvider} from './context/ConfiguracionesProvider'





function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
          <NegociosProvider>
          <BancosProvider>
          <ProveedoresProvider>
          <TiposProvider>
          <CuentasProvider>
          <SubcuentasProvider>
          <ConceptosProvider>
          <MovimientosProvider>
          <PrestamosProvider>
          <ReportesProvider>
          <HerramientasProvider>
          <CargaMasivaProvider>
          <ConfiguracionesProvider>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Login />} />
                    <Route path="olvide-password" element={<OlvidePassword />} />
                    <Route path="olvide-password/:token" element={<NuevoPassword />} />
                    <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                </Route>
                

                <Route path="/registrar" element={<RutaProtegida />}>
                    <Route index element={<Registrar />} />
                </Route>
                <Route path="/negocios" element={<RutaProtegida />}>
                    <Route index element={<Negocios />} />
                </Route>
                <Route path="/bancos" element={<RutaProtegida />}>
                    <Route index element={<Bancos />} />
                </Route>
                <Route path="/proveedores" element={<RutaProtegida />}>
                    <Route index element={<Proveedores />} />
                </Route>
                <Route path="/tipos" element={<RutaProtegida />}>
                    <Route index element={<Tipos />} />
                </Route>
                <Route path="/cuentas" element={<RutaProtegida />}>
                    <Route index element={<Cuentas />} />
                </Route>
                <Route path="/subcuentas" element={<RutaProtegida />}>
                    <Route index element={<Subcuentas />} />
                </Route>
                <Route path="/conceptos" element={<RutaProtegida />}>
                    <Route index element={<Conceptos />} />
                </Route>
                <Route path="/movimientos" element={<RutaProtegida />}>
                    <Route index element={<Movimientos />} />
                </Route>
                <Route path="/prestamos" element={<RutaProtegida />}>
                    <Route index element={<Prestamos />} />
                </Route>
                <Route path="/reportes" element={<RutaProtegida />}>
                    <Route index element={<Reportes />} />
                </Route>
                <Route path="/herramientas" element={<RutaProtegida />}>
                    <Route index element={<Herramientas />} />
                </Route>
                <Route path="/cargamasiva" element={<RutaProtegida />}>
                    <Route index element={<CargaMasiva />} />
                </Route>
                <Route path="/configuraciones" element={<RutaProtegida />}>
                    <Route index element={<Configuracion />} />
                </Route>
            </Routes>
          </ConfiguracionesProvider>
          </CargaMasivaProvider>
          </HerramientasProvider>
          </ReportesProvider>
          </PrestamosProvider>
          </MovimientosProvider>
          </ConceptosProvider>
          </SubcuentasProvider>
          </CuentasProvider>
          </TiposProvider>
          </ProveedoresProvider>
          </BancosProvider>
          </NegociosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
