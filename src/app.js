import { createBot, createProvider } from '@builderbot/bot'
import { JsonFileDB as Database } from '@builderbot/database-json'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { createDespachoFlow } from './flows.js'

const PORT = process.env.PORT ?? 3008

// Si aparece un error de autenticación (ERRO AUTH), actualiza la versión de WhatsApp Web
// con el valor vigente de https://wppconnect.io/whatsapp-versions/
// Ejemplo: WA_VERSION=2.3000.1035824857
const WA_VERSION = (process.env.WA_VERSION ?? '2.3000.1035824857').split('.').map(Number)

const main = async () => {
    const adapterProvider = createProvider(Provider, { version: WA_VERSION })
    const adapterDB = new Database({ filename: 'db.json' })

    const { handleCtx, httpServer } = await createBot({
        flow: createDespachoFlow(),
        provider: adapterProvider,
        database: adapterDB,
    })

    // Reactivar o pausar el bot para un número: { "number": "51987654321", "intent": "remove" | "add" }
    adapterProvider.server.post(
        '/v1/blacklist',
        handleCtx(async (bot, req, res) => {
            const { number, intent } = req.body
            if (intent === 'remove') bot.blacklist.remove(number)
            if (intent === 'add') bot.blacklist.add(number)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ status: 'ok', number, intent }))
        })
    )

    httpServer(+PORT)
}

main()
