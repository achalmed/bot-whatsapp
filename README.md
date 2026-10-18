# Bot de WhatsApp del despacho

Bot informativo de WhatsApp para el despacho de un diputado. Responde automáticamente con un menú:

1. 📥 **Mesa de Partes Virtual**: enlace, horario de recepción y recomendaciones
2. 📄 **Requisitos** para presentar un documento
3. 🕒 **Horario y dirección** de la oficina, correo y teléfono
4. 📢 **Redes sociales**
5. 👤 **Hablar con el equipo**: el bot se pausa para ese número (60 min por defecto) para que una persona responda desde el mismo WhatsApp

Cualquier mensaje (por ejemplo «hola» o «buenas tardes») muestra el menú. Escribir `menu` vuelve al inicio.

Está hecho con [BuilderBot](https://builderbot.app) 1.4.4, el sucesor activo de `@bot-whatsapp/bot`.

## Estructura

```
src/config.js       ← datos del despacho (lo único que hay que editar)
src/flows.js        ← menú y respuestas
src/app.js          ← conexión con WhatsApp y servidor HTTP
test/flows.test.js  ← simulación de conversaciones
```

## 1. Configurar los datos del despacho

Edita **solo** `src/config.js` y reemplaza todo lo que diga `REEMPLAZAR`: nombre del diputado, enlace de la mesa de partes, dirección, correo, teléfono y redes. Ahí también puedes cambiar los horarios, los requisitos y los minutos de pausa.

## 2. Ejecutar

Requisitos: Node.js 20 o superior y un teléfono con WhatsApp (de preferencia un número exclusivo del despacho).

```bash
git clone https://github.com/achalmed/bot-whatsapp.git
cd bot-whatsapp
npm install
npm test     # simula conversaciones y comprueba el menú
npm start
```

Al iniciar se genera `bot.qr.png` (y el QR aparece en la terminal). Escanéalo desde el teléfono en **WhatsApp → Dispositivos vinculados → Vincular un dispositivo**. La sesión se guarda en `bot_sessions/`; no hace falta volver a escanear mientras exista esa carpeta.

> Si aparece un error de autenticación (`ERRO AUTH`), WhatsApp cambió de versión. Consulta la vigente en <https://wppconnect.io/whatsapp-versions/> e iníciala así: `WA_VERSION=2.3000.XXXXXXXXXX npm start`.

### Con Docker (servidor 24/7)

```bash
docker build -t despacho-bot .
docker run -d --restart unless-stopped -p 3008:3008 \
  -v $(pwd)/bot_sessions:/app/bot_sessions despacho-bot
docker logs -f <id>   # para ver el QR la primera vez
```

## 3. Reactivar el bot para un ciudadano antes de tiempo

Cuando el equipo termine de atender a alguien que eligió la opción 5:

```bash
curl -X POST http://localhost:3008/v1/blacklist \
  -H 'Content-Type: application/json' \
  -d '{"number": "51987654321", "intent": "remove"}'
```

Con `"intent": "add"` se pausa el bot para un número.

## 4. Actualizaciones de BuilderBot

El código de BuilderBot no está copiado en este repositorio: se descarga de npm según las versiones de `package.json`. **Dependabot** (`.github/dependabot.yml`) revisa cada lunes si hay versiones nuevas y, si las hay, abre un PR automático; las pruebas corren solas y basta con aprobarlo si salen en verde.

> ⚠️ **No uses el botón «Sync fork» de GitHub.** Este repositorio figura como fork del código de la librería, por eso GitHub dice que está «behind codigoencasa/builderbot:main». Sincronizarlo reemplazaría o borraría el bot del despacho. Las actualizaciones llegan por npm, no por el fork.

## Advertencias importantes

- **Conexión no oficial.** Este bot usa Baileys, que se conecta como «WhatsApp Web». Es gratis, pero WhatsApp no lo autoriza oficialmente y puede bloquear el número si detecta spam. Úsalo solo para **responder** (no para envíos masivos) y con un número dedicado. Para una solución institucional estable, BuilderBot también soporta la API oficial de **WhatsApp Business (Meta Cloud API)** con `@builderbot/provider-meta`; requiere verificar la cuenta en Meta y tiene costo por conversación.
- **Datos personales.** El bot no guarda formularios, pero las conversaciones con DNI y datos de contacto quedan en el teléfono. Trátalas según la Ley N.° 29733 de Protección de Datos Personales.
- **Necesita estar encendido.** El bot solo responde mientras el proceso está corriendo (PC o servidor) y el teléfono vinculado tiene conexión a internet al menos de vez en cuando.

## Versión anterior

El bot de 2022 de la Municipalidad Distrital de San Juan Bautista quedó guardado en la rama [`mdsjb-2022`](https://github.com/achalmed/bot-whatsapp/tree/mdsjb-2022). Usa `whatsapp-web.js` 1.16 y Dialogflow; ya no conecta con WhatsApp y se conserva solo como historial. No abras un PR de esa rama hacia `main`.
