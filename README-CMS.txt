ICE AND FIRE — CMS / PÁGINAS Y PESTAÑAS

Archivos incluidos en sus ubicaciones:
- public/admin/index.html
- public/admin/config.yml
- src/App.tsx
- src/components/CmsNavigation.tsx
- src/components/CmsBlockRenderer.tsx
- src/pages/CmsSectionPage.tsx
- src/pages/TeamMember.tsx
- src/data/pages.json

QUÉ CAMBIA

1. La portada "/" ya no muestra todas las secciones una debajo de otra. Muestra el Hero.
2. El menú se construye desde src/data/pages.json.
3. Desde Decap puedes crear, eliminar, ocultar, ordenar y renombrar pestañas.
4. Una página puede reutilizar una sección React existente.
5. Una página también puede ser completamente creada mediante bloques.
6. Los bloques disponibles son texto, imagen, video, botón, galería, contenido embebido y tarjetas.
7. Los integrantes tienen páginas individuales.
8. El CMS permite añadir autobiografía, función, video y galería a cada integrante.
9. Se añadieron controles de visibilidad para galería, póster y contacto.
10. Se mantienen los campos científicos y educativos de tu content.json.

IMPORTANTE

Antes de reemplazar archivos, haz una copia de seguridad de tu proyecto.

Para publicar:
git add .
git commit -m "feat: new CMS pages and dynamic navigation"
git push origin main

Después Vercel debería construir automáticamente.

CMS:
https://iceandfire-psi.vercel.app/admin/

NOTA SOBRE PÁGINAS TOTALMENTE NUEVAS

Las páginas tipo "blocks" no necesitan crear un componente React nuevo: se pueden construir desde Decap usando los bloques disponibles.

Las páginas tipo "section" utilizan los componentes React que ya existen en src/sections.

Para que una página nueva aparezca en el menú:
- visible = true
- inMenu = true
- order define su posición

El sistema está preparado para ampliar los tipos de bloques posteriormente.
