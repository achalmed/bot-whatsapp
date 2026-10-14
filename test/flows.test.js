import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createBot, TestTool } from '@builderbot/bot'
import { createDespachoFlow } from '../src/flows.js'
import config from '../src/config.js'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const setup = async () => {
    const provider = new TestTool.TestProvider()
    const sent = []
    provider.sendMessage = async (userId, message) => {
        sent.push({ userId, message })
        return { userId, message }
    }
    const bot = await createBot({ flow: createDespachoFlow(), provider, database: new TestTool.TestDB() })
    const say = async (from, body) => {
        sent.length = 0
        provider.emit('message', { from, body, name: 'Prueba' })
        await wait(300)
        return sent.map((s) => s.message).join('\n')
    }
    return { bot, say }
}

test('cualquier saludo muestra el menú', async () => {
    const { say } = await setup()
    const reply = await say('51900000001', 'buenas tardes')
    assert.match(reply, /Mesa de Partes Virtual/)
    assert.match(reply, /\*5\*/)
})

test('opción 1 envía el enlace de mesa de partes', async () => {
    const { say } = await setup()
    await say('51900000002', 'hola')
    const reply = await say('51900000002', '1')
    assert.ok(reply.includes(config.mesaDePartes.enlace))
})

test('opciones 2, 3 y 4 responden su contenido', async () => {
    const { say } = await setup()
    await say('51900000003', 'menu')
    assert.ok((await say('51900000003', '2')).includes(config.requisitos[0]))
    await say('51900000003', 'menu')
    assert.ok((await say('51900000003', '3')).includes(config.oficina.direccion))
    await say('51900000003', 'Menú')
    assert.ok((await say('51900000003', '4')).includes(config.redes[0].enlace))
})

test('opción inválida repite el menú', async () => {
    const { say } = await setup()
    await say('51900000004', 'hola')
    const reply = await say('51900000004', '9')
    assert.match(reply, /Opción no válida/)
})

test('opción 5 pausa el bot para ese número', async () => {
    const { bot, say } = await setup()
    await say('51900000005', 'hola')
    const reply = await say('51900000005', '5')
    assert.match(reply, /equipo del despacho/)
    assert.equal(bot.dynamicBlacklist.checkIf('51900000005'), true)
    assert.equal(await say('51900000005', 'hola'), '')
    bot.dynamicBlacklist.remove('51900000005')
    assert.match(await say('51900000005', 'hola'), /Mesa de Partes Virtual/)
})
