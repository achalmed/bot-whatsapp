/**
 * Datos del despacho que el bot comparte.
 *
 * Los datos propios del despacho (nombre, enlaces, dirección, contacto, redes) NO se escriben aquí:
 * se leen de las variables de entorno o del archivo `.env` (ignorado por git; plantilla en `.env.example`).
 * Así el repositorio, que es público, no contiene datos del cliente.
 * Lo que dice "REEMPLAZAR" es el valor por defecto mientras falte la variable.
 *
 * Aquí sí se editan los textos genéricos: horarios, recomendaciones, requisitos y minutos de pausa.
 */

// Carga `.env` si existe (Node 20.12 o superior); si no existe, se usan las variables del entorno.
try {
    process.loadEnvFile?.()
} catch {
    // Sin `.env`: no es un error.
}

const env = (nombre, porDefecto) => process.env[nombre]?.trim() || porDefecto

const direccion = env('DESPACHO_DIRECCION', 'REEMPLAZAR dirección de la oficina')

const redes = [
    { nombre: 'Facebook', enlace: env('DESPACHO_FACEBOOK_URL') },
    { nombre: 'X (Twitter)', enlace: env('DESPACHO_X_URL') },
    { nombre: 'Instagram', enlace: env('DESPACHO_INSTAGRAM_URL') },
    { nombre: 'TikTok', enlace: env('DESPACHO_TIKTOK_URL') },
    { nombre: 'YouTube', enlace: env('DESPACHO_YOUTUBE_URL') },
].filter((r) => r.enlace)

export default {
    nombreDespacho: env('DESPACHO_NOMBRE', 'Despacho del Diputado REEMPLAZAR_NOMBRE'),

    mesaDePartes: {
        enlace: env('DESPACHO_MESA_PARTES_URL', 'https://REEMPLAZAR-enlace-de-mesa-de-partes'),
        horarioRecepcion: 'Lunes a viernes de 8:30 a. m. a 4:30 p. m. (documentos enviados fuera de horario se registran el siguiente día hábil)',
        recomendaciones: [
            'Adjunta tu documento en formato PDF.',
            'Indica tu nombre completo, DNI, teléfono y correo electrónico.',
            'Describe brevemente el asunto de tu solicitud.',
            'Guarda el número o constancia de recepción para hacer seguimiento.',
        ],
    },

    requisitos: [
        'Solicitud dirigida al Diputado, con firma y fecha.',
        'Copia de DNI del solicitante (o del representante legal).',
        'Documentos que sustenten el pedido (si corresponde).',
        'Datos de contacto: teléfono y correo electrónico.',
    ],

    oficina: {
        direccion,
        // Sin enlace propio, se arma la búsqueda de Google Maps con la dirección.
        mapa: env('DESPACHO_MAPA_URL', `https://maps.google.com/?q=${encodeURIComponent(direccion)}`),
        horarioAtencion: 'Lunes a viernes de 8:30 a. m. a 4:30 p. m.',
    },

    contacto: {
        correo: env('DESPACHO_CORREO', 'REEMPLAZAR@correo.gob.pe'),
        telefono: env('DESPACHO_TELEFONO', 'REEMPLAZAR'),
    },

    // Solo las redes con enlace en `.env`; si no hay ninguna, la opción 4 lo dice sin mostrar enlaces falsos.
    redes,

    /**
     * Cuando alguien elige "hablar con el equipo", el bot deja de responderle
     * durante estos minutos para que una persona atienda desde el mismo WhatsApp.
     */
    pausaAtencionMinutos: Number(env('DESPACHO_PAUSA_MINUTOS', 60)),
}
