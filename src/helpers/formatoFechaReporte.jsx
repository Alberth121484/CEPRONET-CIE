export const formatoFechaReporte = (fecha) => {
        if (!fecha) {
            return ''; // Otra acción o valor por defecto según tus necesidades
        }
    
        // Si la fecha es un objeto Date, úsala directamente
        if (fecha instanceof Date) {
            const year = fecha.getFullYear();
            const month = String(fecha.getMonth() + 1).padStart(2, '0');
            const day = String(fecha.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    
        // Si la fecha es una cadena, conviértela a un objeto Date y luego formatea
        const nuevaFecha = new Date(
            fecha.split('T')[0].split('-')[0],  // Year
            fecha.split('T')[0].split('-')[1] - 1,  // Month (subtracting 1 since months are 0-indexed in JavaScript Date)
            fecha.split('T')[0].split('-')[2]   // Day
        );
    
        const year = nuevaFecha.getFullYear();
        const month = String(nuevaFecha.getMonth() + 1).padStart(2, '0');
        const day = String(nuevaFecha.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    };
    
    