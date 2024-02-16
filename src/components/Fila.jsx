// TablaMovimientos.jsx
import { useState } from 'react';
import Fila from './Fila';

const TablaMovimientos = () => {
    const [movimientos, setMovimientos] = useState([]);

    // Resto del código...

    return (
        <table>
            <thead>
                {/* Aquí coloca tus encabezados de columna */}
            </thead>
            <tbody>
                {movimientos.map((movimiento, index) => (
                    <Fila
                        key={index}
                        rowIndex={index}
                        movimientos={movimientos}
                        cuentas={cuentas}
                        subcuentas={subcuentas}
                        conceptos={conceptos}
                        proveedores={proveedores}
                        handleDoubleClick={handleDoubleClick}
                        handleCellBlur={handleCellBlur}
                        handleInputChange={handleInputChange}
                        setMovimientos={setMovimientos}
                        esEditable={esEditable}
                        manejarEdicion={manejarEdicion}
                        editingDateRows={editingDateRows}
                        setEditingDateRows={setEditingDateRows}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default TablaMovimientos;
