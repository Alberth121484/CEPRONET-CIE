export const formatearFecha = (fecha) => {
    if (!fecha) {
        return ''; // Otra acción o valor por defecto según tus necesidades
    }

    // Si la fecha es un objeto Date, úsala directamente
    if (fecha instanceof Date) {
        const opciones = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        return fecha.toLocaleDateString('es-ES', opciones);
    }

    // Si la fecha es una cadena, conviértela a un objeto Date y luego formatea
    const nuevaFecha = new Date(
        fecha.split('T')[0].split('-')[0],  // Year
        fecha.split('T')[0].split('-')[1] - 1,  // Month (subtracting 1 since months are 0-indexed in JavaScript Date)
        fecha.split('T')[0].split('-')[2]   // Day
    );

    const opciones = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };

    return nuevaFecha.toLocaleDateString('es-ES', opciones);
};
