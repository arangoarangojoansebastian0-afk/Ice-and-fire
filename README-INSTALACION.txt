ICE AND FIRE — INSTALACIÓN

1. Instala dependencias con `npm install`.
2. Inicia el entorno local con `npm run dev`.
3. Comprueba el resultado de producción con `npm run build`.

El contenido editable está en `src/data/content.json` y la estructura de las
páginas en `src/data/pages.json`. Decap CMS se sirve desde `/admin/` y usa
`public/admin/config.yml`.

Para Vercel, `vercel.json` incluye el fallback de SPA necesario para abrir o
recargar rutas como `/equipo` y perfiles de integrantes directamente.
