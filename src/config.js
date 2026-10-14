/**
 * Datos del despacho que el bot comparte.
 * Edita SOLO este archivo para cambiar enlaces, horarios o textos.
 * Todo lo que dice "REEMPLAZAR" debe completarse antes de poner el bot en producción.
 */
export default {
    nombreDespacho: 'Despacho del Diputado REEMPLAZAR_NOMBRE',

    mesaDePartes: {
        enlace: 'https://REEMPLAZAR-enlace-de-mesa-de-partes',
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
        direccion: 'REEMPLAZAR dirección de la oficina',
        mapa: 'https://maps.google.com/?q=REEMPLAZAR',
        horarioAtencion: 'Lunes a viernes de 8:30 a. m. a 4:30 p. m.',
    },

    contacto: {
        correo: 'REEMPLAZAR@correo.gob.pe',
        telefono: 'REEMPLAZAR',
    },

    redes: [
        { nombre: 'Facebook', enlace: 'https://facebook.com/REEMPLAZAR' },
        { nombre: 'X (Twitter)', enlace: 'https://x.com/REEMPLAZAR' },
    ],

    /**
     * Cuando alguien elige "hablar con el equipo", el bot deja de responderle
     * durante estos minutos para que una persona atienda desde el mismo WhatsApp.
     */
    pausaAtencionMinutos: 60,
}
