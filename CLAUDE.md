---
tipo: guia_ia
estado: activo
---
# CLAUDE.md — bot-whatsapp (repo `bot-whatsapp`)

Bot informativo de WhatsApp de un despacho parlamentario: menú de cinco opciones sobre BuilderBot 1.4.4 y
Baileys (Node, npm). No guarda formularios ni hace envíos masivos. Léase antes: `README.md`, `estado.md`.
Rigen las reglas del `CLAUDE.md` raíz de `~/Documents`: aquí solo lo que el raíz no dice.

## Reglas propias

- **Repositorio público: nada del despacho en git.** Nombre, enlaces, dirección, correo, teléfono y redes
  viven solo en `.env` (ignorado; plantilla `.env.example`) y `src/config.js` los lee con `env()`. Antes de
  cada commit, `git diff --cached` no debe nombrar al titular ni sus datos.
- **El `.env` copia solo datos institucionales** del perfil del despacho (los del membrete), nunca datos
  personales del titular; qué se lee de allí consta en el registro de consumidores del despacho.
- **Exento del contrato de suites** (`meta/workspace.yml` → `suites: exenta`): sin `suite.yml` ni
  `core/env`; app Node autónoma.
- **Los textos genéricos** (horarios, recomendaciones, requisitos) se editan en `src/config.js`; el menú y
  las respuestas, en `src/flows.js`. Una opción nueva lleva su prueba en `test/flows.test.js`.
- **Las pruebas no dependen del `.env`:** comparan contra `config`, y pasan con datos reales y sin ellos.
- **No usar «Sync fork»** en GitHub: el repo figura como fork de BuilderBot y lo sobrescribiría; las
  actualizaciones llegan por npm y Dependabot.

## Verificar

```bash
nvm use default && npm test       # 5 conversaciones simuladas; el Node del sistema no trae npm
npm start                         # QR en bot.qr.png; sesión en bot_sessions/
```

## Trampas

- `ERROR AUTH` al arrancar: venció `WA_VERSION`. Se toma la vigente de wppconnect (sin `-alpha`) y se pone
  en el `.env`; `config.js` carga el `.env` antes de que `app.js` la lea.
- `bot_sessions/` es la sesión vinculada del número: borrarla obliga a escanear de nuevo.

## Dónde está cada cosa

| pregunta | documento |
|---|---|
| cómo se configura, ejecuta y despliega | `README.md` §Uso |
| qué está en curso y qué queda | `estado.md` |
| qué datos hay que poner | `.env.example` |

<!-- Notas para mantenedores (no entran al contexto): ≤ 100 líneas (RQ-DOC-05). `AGENTS.md` es un enlace a este archivo. -->
