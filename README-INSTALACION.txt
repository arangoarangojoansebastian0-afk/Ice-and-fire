ARCHIVOS PARA ICE AND FIRE + DECAP CMS

1. Reemplaza public/admin/config.yml por el archivo incluido.
2. Reemplaza public/admin/index.html por el incluido.
3. Reemplaza src/App.tsx por el incluido.
4. Reemplaza src/sections/Team.tsx por el incluido.
5. Copia src/pages/TeamMember.tsx en tu proyecto.
6. El CMS ahora tiene campos para configuración, inicio, equipo avanzado, problemática, investigación, Spray Fire, videojuego, STEAM+H, cronograma, bibliografía, historia, videos, imágenes, botones, póster y archivos.

IMPORTANTE: el nuevo config.yml introduce objetos nuevos como site.home, site.spray y site.game. Tu content.json actual todavía usa campos antiguos como sprayWhy, sprayHow, gamePurpose, gameLevels, gameMechanics, sprayIngredients, etc. Antes de publicar, hay que migrarlos o mantenerlos duplicados para que los componentes actuales sigan funcionando.
