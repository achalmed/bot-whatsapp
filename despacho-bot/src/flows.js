import { addKeyword, createFlow, EVENTS, utils } from '@builderbot/bot'
import config from './config.js'

const VOLVER = '\nEscribe *menu* para volver al inicio.'

const MENU = [
    `🏛️ Bienvenido(a) al *${config.nombreDespacho}*.`,
    '',
    'Responde con el número de la opción:',
    '*1* 📥 Mesa de Partes Virtual',
    '*2* 📄 Requisitos para presentar un documento',
    '*3* 🕒 Horario y dirección de la oficina',
    '*4* 📢 Redes sociales',
    '*5* 👤 Hablar con el equipo del despacho',
].join('\n')

const mesaDePartesFlow = addKeyword(utils.setEvent('MESA_DE_PARTES')).addAnswer(
    [
        '📥 *Mesa de Partes Virtual*',
        '',
        `Envía tus documentos aquí: ${config.mesaDePartes.enlace}`,
        '',
        `🕒 ${config.mesaDePartes.horarioRecepcion}`,
        '',
        '*Recomendaciones:*',
        ...config.mesaDePartes.recomendaciones.map((r) => `• ${r}`),
        VOLVER,
    ].join('\n')
)

const requisitosFlow = addKeyword(utils.setEvent('REQUISITOS')).addAnswer(
    [
        '📄 *Requisitos para presentar un documento*',
        '',
        ...config.requisitos.map((r) => `• ${r}`),
        '',
        `Preséntalo por la Mesa de Partes Virtual: ${config.mesaDePartes.enlace}`,
        VOLVER,
    ].join('\n')
)

const oficinaFlow = addKeyword(utils.setEvent('OFICINA')).addAnswer(
    [
        '🕒 *Horario y dirección*',
        '',
        `📍 ${config.oficina.direccion}`,
        `🗺️ ${config.oficina.mapa}`,
        `🕒 ${config.oficina.horarioAtencion}`,
        '',
        `✉️ ${config.contacto.correo}`,
        `📞 ${config.contacto.telefono}`,
        VOLVER,
    ].join('\n')
)

const redesFlow = addKeyword(utils.setEvent('REDES')).addAnswer(
    ['📢 *Síguenos en redes sociales*', '', ...config.redes.map((r) => `• ${r.nombre}: ${r.enlace}`), VOLVER].join(
        '\n'
    )
)

const atencionFlow = addKeyword(utils.setEvent('ATENCION')).addAction(async (ctx, { flowDynamic, blacklist }) => {
    await flowDynamic(
        [
            '👤 Hemos registrado tu pedido. Una persona del equipo del despacho te responderá por este chat en horario de atención.',
            '',
            'Escribe tu consulta a continuación (nombre, DNI y asunto).',
            `🕒 ${config.oficina.horarioAtencion}`,
        ].join('\n')
    )
    // Pausa el bot para este número, así el equipo responde sin interrupciones.
    blacklist.add(ctx.from)
    setTimeout(() => blacklist.remove(ctx.from), config.pausaAtencionMinutos * 60 * 1000).unref()
})

const OPCIONES = {
    1: mesaDePartesFlow,
    2: requisitosFlow,
    3: oficinaFlow,
    4: redesFlow,
    5: atencionFlow,
}

const menuFlow = addKeyword(['menu', 'menú', 'inicio', 'hola']).addAnswer(
    MENU,
    { capture: true },
    async (ctx, { gotoFlow, fallBack }) => {
        const flow = OPCIONES[ctx.body.trim()]
        if (!flow) return fallBack(`❌ Opción no válida. Responde solo con un número del 1 al 5.\n\n${MENU}`)
        return gotoFlow(flow)
    }
)

// Cualquier mensaje que no coincida con una palabra clave muestra el menú.
const welcomeFlow = addKeyword(EVENTS.WELCOME).addAction(async (_, { gotoFlow }) => gotoFlow(menuFlow))

export const createDespachoFlow = () =>
    createFlow([welcomeFlow, menuFlow, mesaDePartesFlow, requisitosFlow, oficinaFlow, redesFlow, atencionFlow])
