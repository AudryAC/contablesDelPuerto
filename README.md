# Soluciones Contables del Puerto — Starter Astro

Implementación inicial del **Header + Hero + barra de beneficios** en Astro y CSS, basada en el mockup de referencia.

## Requisitos
- Node.js 22.23.4 o posterior (versión par/LTS compatible)
- npm

## Inicio
```bash
npm install
npm run dev
```
Luego abre la URL local indicada por Astro (normalmente http://localhost:4321).

## Estructura
- `src/components/Header.astro`: logo de texto, navegación y menú responsive.
- `src/components/Hero.astro`: título, subtítulo, acciones y capas visuales.
- `src/components/Benefits.astro`: cuatro beneficios que se superponen al final del Hero.
- `src/layouts/Layout.astro`: HTML base, SEO, fuentes y CSS.
- `src/styles/global.css`: variables de marca y estilos responsive.
- `public/images/puerto-vallarta.jpg.png`: fotografía usada como fondo.
- `public/images/asesoria-equipo.png`: personas + laptop con transparencia.
- `public/images/hero-arcos.svg`: curvas translúcidas independientes.

## Consideraciones
- El logotipo del Header está reconstruido con texto y un ícono SVG temporal para no confundirlo con el símbolo de otro logo compartido. Sustituir por el logotipo oficial cuando esté disponible.
- Las imágenes disponibles son variantes generadas de la referencia; la composición es aproximada, no una extracción pixel-perfect del mockup.
- `#contacto`, `#servicios` y `#blog` son anclas vacías por ahora. Su contenido se añadirá después.
- El formulario y la conexión de correo NO forman parte de esta primera entrega.
- El proyecto utiliza CSS directamente para evitar dependencias adicionales; Tailwind se puede integrar más adelante.
