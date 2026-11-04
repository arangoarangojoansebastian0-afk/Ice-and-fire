// Actualiza únicamente los textos de los contextos y conserva el resto de content.json.
// Ejecutar desde la raíz del proyecto: node aplicar-contextos.mjs
import fs from 'node:fs';
const target = 'src/data/content.json';
const patchFile = 'contextos-actualizados.json';
if (!fs.existsSync(target) || !fs.existsSync(patchFile)) {
  console.error('No encuentro src/data/content.json o contextos-actualizados.json. Ejecuta este script desde la raíz del proyecto y extrae primero el ZIP.');
  process.exit(1);
}
const content = JSON.parse(fs.readFileSync(target, 'utf8'));
const patch = JSON.parse(fs.readFileSync(patchFile, 'utf8'));
if (!Array.isArray(content.contextTiers)) {
  console.error('No se encontró contextTiers en content.json. No se modificó ningún archivo.');
  process.exit(1);
}
for (const [index, values] of Object.entries(patch)) {
  const tier = content.contextTiers[Number(index)];
  if (!tier) continue;
  if (typeof values.text === 'string') tier.text = values.text;
  if (typeof values.source === 'string') tier.source = values.source;
}
fs.writeFileSync(target, JSON.stringify(content, null, 2) + '\n', 'utf8');
console.log('Contextos actualizados sin reemplazar el resto de content.json.');
