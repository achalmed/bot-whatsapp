---
tipo: estado
estado: activo
actualizado: 2026-10-18
---
# estado.md — bot-whatsapp

## Hecho

| fecha | qué | dónde se ve |
|---|---|---|
| 2026-10-18 | Alta en el ecosistema: contrato documental (README, `CLAUDE.md`, este estado) y entrada en `meta/workspace.yml` | este commit |
| 2026-10-18 | Datos del despacho fuera del código: `src/config.js` los lee de `.env`; la opción 4 sin enlaces falsos | commit `6490937` |

## En curso

nada en curso.

## Por hacer

- 2026-10-18 · autor · Completar en `.env` las redes oficiales del despacho; mientras falten, la opción 4 avisa que pronto se compartirán.
- 2026-10-18 · autor · Confirmar el teléfono de contacto del `.env`: si el bot corre en ese mismo número, la opción 3 devuelve al ciudadano el número al que ya escribe.
- 2026-10-18 · autor · Actualizar `WA_VERSION` del `.env` antes de que caduque la 2.3000.1050767301 (wppconnect la da por vencida el 2026-12-18). · limite: 2026-12-18
- 2026-10-18 · autor · RQ-SEC-02 del doctor: 7 commits de 2022 heredados del upstream (autor Leifer Mendez: `7ed67e0`, `fe7567e`, `edf4577`, `7f437d0` y sus limpiezas) traen una llave de Google Cloud y un token de GitHub **suyos**, públicos también en el repo original; nada que rotar aquí. Decidir si se reescribe el historial (force-push en un repo público) o se declara la excepción en el doctor.
- 2026-10-18 · autor · Decidir dónde corre el bot 24/7 (esta máquina o un servidor con Docker); hoy solo responde mientras `npm start` está abierto.

## Futuro

- Pasar a la API oficial de WhatsApp Business (`@builderbot/provider-meta`) si el despacho la contrata.
