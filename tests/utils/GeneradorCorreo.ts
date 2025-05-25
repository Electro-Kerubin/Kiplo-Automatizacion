export function GeneradorCorreo(nombre: string): string {
    const ahora = new Date();

    // Formato de fecha en formato "ddmmyyyy"
    const fecha = ahora.toLocaleDateString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '');

    // Formato de hora en formato "HHMM"
    const hora = ahora.toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).replace(/:/g, '');

    // Genera el correo en el formato "nombre_fecha_hora@dominio"
    return `${nombre.toLowerCase()}.${fecha}${hora}@qatest.cl`;
}