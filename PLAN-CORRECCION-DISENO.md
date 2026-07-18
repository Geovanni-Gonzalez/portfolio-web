# Auditoría de diseño y plan de corrección — portfolio-web

**Fecha:** 17 de julio de 2026
**Método:** revisión completa del código fuente (componentes Astro/React, `global.css`, datos e i18n) + render del build (`dist/`) en Chromium a 1440px y 390px, en modo oscuro y claro.

---

## 1. Resumen ejecutivo

El sitio tiene una base técnica sólida (i18n, skip link, `prefers-reduced-motion`, estados de foco, empty states en proyectos), pero el diseño sufre de tres problemas de fondo:

1. **Ruido visual acumulado.** Shader animado de fondo + textura de rejilla fija sobre todo el contenido + glows + spotlight + AOS + gradientes compiten entre sí y contra el texto. En modo claro el resultado es especialmente confuso.
2. **Jerarquía plana.** Casi todo el texto es `font-black`/`font-bold`, en mayúsculas y con tracking amplio; hay etiquetas de 10px por todas partes y todas las secciones son grillas de tarjetas idénticas. Cuando todo grita, nada destaca.
3. **Falta de curaduría.** 31 proyectos idénticos sin imágenes reales (30 de 31 usan placeholder de iniciales), contenido duplicado entre Hero y Sobre mí, blog con posts de prueba en dos idiomas mezclados y varios errores de ortografía. Para un portfolio, esto afecta directamente la credibilidad ante reclutadores.

---

## 2. Hallazgos

Severidad: 🔴 Alta · 🟡 Media · 🔵 Baja

### A. Ruido visual e identidad

| # | Sev. | Problema | Evidencia |
|---|------|----------|-----------|
| A1 | 🔴 | La textura de rejilla (`body::before`) está en `z-index: 9999` con opacidad 0.16 **por encima de todo el contenido**, incluido el modal de proyectos (`z-[100]`). Vela el texto y resta nitidez a toda la página. | `global.css` |
| A2 | 🔴 | El fondo Warp (WebGL) a opacidad 0.32–0.46 compite con el contenido. En **modo claro** se ve como manchas salmón/turquesa lavadas detrás del hero y el navbar. Además corre siempre: también en móvil y aunque el usuario tenga `prefers-reduced-motion` (el CSS no detiene un canvas). | `BaseLayout.astro`, `WarpBackground.tsx`, captura modo claro |
| A3 | 🟡 | Texto con degradado + glow en el apellido del hero (`bg-clip-text` naranja→blanco→teal con `drop-shadow`). Es un cliché que resta legibilidad; el énfasis se logra mejor con color sólido y peso. | `Hero.astro` |
| A4 | 🟡 | Todo es tarjeta, y hay **tarjetas anidadas**: métricas dentro del panel del hero, stat-tiles dentro del panel de skills, timeline dentro de una mega-tarjeta en Educación. Cinco secciones seguidas son grillas de tarjetas casi idénticas (icono + título + texto). | `Hero.astro`, `SkillsExplorer.tsx`, `Education.astro`, `ContributionAreas.astro` |
| A5 | 🔴 | Tipografía "gritona" y plana: `font-black` + `uppercase` + `tracking-[0.12–0.22em]` en decenas de elementos, y **micro-etiquetas de 10–11px** (métricas, badges, fechas, niveles) por debajo del tamaño legible. La jerarquía real desaparece. | Hero, SkillsExplorer, ProjectCard, TimelineItem, ContactForm |
| A6 | 🟡 | Acento de borde lateral (`border-l-2` / `border-l-4` de color) usado como muletilla en 4+ componentes: cita de About, subtítulo de Educación, subtítulo de TimelineItem, descripción de cada ProjectCard. | `About.astro`, `Education.astro`, `TimelineItem.astro`, `ProjectCard.tsx` |
| A7 | 🟡 | Tres acentos (naranja, teal, celeste) sin reglas claras: los hovers cambian naranja→teal arbitrariamente, los badges alternan color sin significado. Falta una estrategia: un acento dominante y usos definidos para el resto. | `global.css`, varios componentes |

### B. Arquitectura de información y UX

| # | Sev. | Problema | Evidencia |
|---|------|----------|-----------|
| B1 | 🔴 | **31 proyectos en una sola grilla sin jerarquía**, 30 sin imagen real (placeholder de iniciales "SG", "AG"…, varios repetidos). En móvil la página alcanza ~28.000px de alto. Un reclutador no distingue el proyecto estrella del ejercicio de clase. | `projects.json`, capturas desktop/móvil |
| B2 | 🟡 | El navbar no tiene enlace a **Educación/Certificaciones**, y el orden del menú (…Áreas, Proyectos, Blog, Contacto) no coincide con el orden real de la página (Educación va antes de Proyectos). El footer también omite secciones. | `Navbar.astro`, `pages/*/index.astro` |
| B3 | 🟡 | Contenido duplicado: el panel lateral del hero repite stack, estado y enfoque que vuelven a aparecer en Sobre mí; hay dos botones "Descargar CV"; el título "Sobre mí" aparece dos veces seguidas (encabezado de sección + título de la tarjeta); la métrica dice "25+" pero la sección muestra "31 proyectos visibles". | `Hero.astro`, `About.astro` |
| B4 | 🔴 | Blog: la sección de la home lista los posts **sin filtrar por idioma** (aparecen "How I Optimized My Portfolio with Astro" y "Cómo optimicé mi portafolio con Astro", el mismo artículo dos veces); fechas de 2023; "Próximamente más artículos…" y el título "Blog" hardcodeados; en la página `/blog` el título es **"Blog Technical"**; desde `/en/` los enlaces apuntan a `/blog/...` sin prefijo de idioma. | `Blog.astro`, `pages/blog/index.astro`, captura |
| B5 | 🟡 | Contacto: el correo y el teléfono son botones que **copian al portapapeles** en vez de `mailto:` / `tel:` (comportamiento inesperado); LinkedIn/GitHub se abren con `window.open` desde un `<button>` en vez de ser enlaces reales (sin clic medio, sin SEO). `SocialButtonsContact.astro` es un duplicado muerto que ya no se usa. | `ContactInfo.jsx`, `SocialButtonsContact.astro` |
| B6 | 🔵 | La raíz `/` redirige con meta-refresh (HTML de 298 bytes): flash en blanco y señal SEO subóptima. Mejor un redirect 308 de servidor (`astro.config` redirects o `vercel.json`). | `dist/index.html` |

### C. Accesibilidad

| # | Sev. | Problema | Evidencia |
|---|------|----------|-----------|
| C1 | 🔴 | **Doble `<main>` anidado**: `BaseLayout` ya renderiza `<main id="main-content">` y las páginas envuelven su contenido en otro `<main>`. Landmark inválido para lectores de pantalla. | `BaseLayout.astro` + `pages/*/index.astro` (verificado en el HTML del build: 2 `<main>`) |
| C2 | 🔴 | El tema se aplica en un `useEffect` de React tras la hidratación → **flash de tema incorrecto** al cargar para usuarios de modo claro, y posibles parpadeos entre navegaciones con ClientRouter. Falta un script inline en `<head>` que lea `localStorage` antes del primer paint. | `ThemeToggle.jsx`, `BaseLayout.astro` |
| C3 | 🔴 | Texto de 10px en mayúsculas con tracking 0.2em en etiquetas funcionales (niveles de skill, fechas, métricas): por debajo del mínimo legible. | múltiples componentes |
| C4 | 🟡 | El modal de proyecto no tiene focus trap (Tab se escapa al fondo) ni devuelve el foco al botón que lo abrió al cerrarse. | `ProjectModal.tsx` |
| C5 | 🟡 | Cadenas en español hardcodeadas que aparecen en la versión EN: "¡Copiado!", "…copiado", "Volver arriba", "Cerrar menú", "Abrir menú", "Próximamente más artículos…", `alt="Captura de …"`. | `ContactInfo.jsx`, `ScrollToTop.jsx`, `HamburgerMenu.jsx`, `Blog.astro`, `ProjectCard.tsx` |
| C6 | 🟡 | `prefers-reduced-motion` está cubierto en CSS, pero el shader WebGL y AOS siguen animando (no dependen de CSS). | `WarpBackground.tsx`, `AOSWrapper.jsx` |
| C7 | 🟡 | Los íconos de Habilidades (`@iconify/react`) se descargan de `api.iconify.design` **en runtime**: con red lenta o bloqueada quedan cajas vacías (verificado en el render offline) y provocan layout shift. En el resto del sitio ya usas `astro-iconify` en build. | `SkillsExplorer.tsx`, captura |

### D. Rendimiento

| # | Sev. | Problema | Evidencia |
|---|------|----------|-----------|
| D1 | 🔴 | **El logo SVG pesa 88KB** y está inline en cada página (`Logo.astro` = 88KB; además `logo.svg` de 88KB como favicon). Casi seguro es un bitmap vectorizado; un logo "GG" bien trazado debería pesar 1–3KB. | `Logo.astro`, `public/logo.svg` |
| D2 | 🟡 | Cada página pesa ~380KB de HTML: `projects.json` completo (31 proyectos, con los textos de **ambos** idiomas) se serializa como props de la isla React. Conviene proyectar solo los campos y el idioma necesarios. | `dist/es/index.html`, `Projects.astro` |
| D3 | 🟡 | Coste continuo en runtime: shader WebGL siempre activo (batería en móvil), listener global de `mousemove` para el spotlight, y la regla universal `* { transition: background-color, border-color, color }` que aplica transiciones a todos los elementos de la página. | `global.css`, `SpotlightEffect.astro` |

### E. Contenido y microcopy

| # | Sev. | Problema | Evidencia |
|---|------|----------|-----------|
| E1 | 🔴 | Ortografía y gramática en textos visibles: "Analisis de Ventas" (sin tilde), "Portfolio Web es **un aplicacion** web **publicado**", "practica academica y tecnica" (sin tildes, repetido en varios proyectos), "Blog Technical". En un portfolio, cada typo cuesta entrevistas. | `projects.json`, `pages/blog/index.astro` |
| E2 | 🔵 | Componentes/nombres desalineados: `GradientTitle` ya no tiene gradiente; conviven dos sistemas de títulos de sección distintos (GradientTitle en la home, SectionTitle en el blog) con estilos diferentes. | `GradientTitle.astro`, `SectionTitle.astro` |

---

## 3. Plan de corrección

Ordenado por relación impacto/esfuerzo. Cada fase deja el sitio deployable.

### Fase 1 — Credibilidad inmediata (1–2 días, sin decisiones de diseño)

1. **Corregir ortografía** en `projects.json` y textos: tildes ("Análisis", "práctica académica y técnica"), concordancia ("una aplicación web publicada"), renombrar "Blog Technical" → "Blog técnico".
2. **Arreglar el blog**: filtrar posts por `lang` en `Blog.astro`, prefijar enlaces con el idioma en `/en/`, internacionalizar "Próximamente…" (o eliminarlo), y valorar ocultar la sección hasta tener 2–3 artículos reales (un blog con posts de prueba de 2023 resta más de lo que suma).
3. **Eliminar el `<main>` duplicado** de las páginas (dejar solo el de `BaseLayout`).
4. **Script inline anti-flash de tema** en `<head>`: leer `localStorage.theme` y poner `data-theme` antes del primer paint (y re-aplicarlo en `astro:after-swap`).
5. **Contacto semántico**: `mailto:` y `tel:` como enlaces (con botón secundario de copiar si quieres conservarlo), `<a>` reales para LinkedIn/GitHub; borrar `SocialButtonsContact.astro`.
6. **Navegación coherente**: añadir Educación al navbar y footer, y alinear el orden del menú con el orden real de las secciones.
7. **Internacionalizar** las cadenas hardcodeadas (copiado, menú, volver arriba, alt de imágenes).

### Fase 2 — Bajar el ruido, recuperar jerarquía (2–4 días)

8. **Textura de rejilla**: moverla detrás del contenido (`z-index: -1` junto al fondo) o eliminarla; nunca por encima del modal.
9. **Domar el fondo Warp**: bajar opacidad (~0.15–0.20), desactivarlo en móvil, con `prefers-reduced-motion` y en modo claro (donde más daño hace: sustituir por un degradado estático sutil). Es la decisión con más impacto visual de todo el plan.
10. **Escala tipográfica**: definir 4–5 pasos con contraste real de tamaño (ratio ≥1.25). Reservar `font-black` para el H1 y los H2 de sección; cuerpo en `font-normal`; subir toda micro-etiqueta a ≥12px y reducir el uso de uppercase+tracking a 1–2 usos deliberados (por ejemplo, solo los kickers de sección).
11. **Estrategia de color**: naranja como único acento protagonista (~10% de la superficie: CTAs, enlaces activos, marcador de sección); teal solo para estados de éxito/actividad definidos; eliminar el degradado del apellido del hero (color sólido); eliminar el celeste o reservarlo para enlaces.
12. **Sustituir los bordes laterales** de color por tinte de fondo suave o simplemente nada; diferenciar secciones alternando fondos/anchos en lugar de meter todo en tarjetas (Educación y Certificaciones funcionan mejor como timeline "desnudo" sin la mega-tarjeta contenedora).
13. **Simplificar el hero**: elegir entre el panel lateral o la sección About para el resumen técnico (hoy se duplican); un solo CV download visible; unificar métricas reales ("31 proyectos", no "25+").

### Fase 3 — Curaduría de proyectos (3–5 días, el mayor salto de calidad percibida)

14. **Seleccionar 6 proyectos destacados** con captura real, y estructura problema → solución → rol → impacto (los campos ya existen en el JSON). El resto pasa a una lista compacta colapsada ("Ver archivo completo") con búsqueda/filtros, o a una página `/proyectos` secundaria.
15. **Generar capturas reales** (o GIFs cortos) de los destacados; para CLI/TUI, captura de terminal estilizada. Eliminar los placeholders de iniciales repetidas.
16. **Recortar el payload**: pasar a la isla React solo los campos del idioma activo.

### Fase 4 — Accesibilidad y rendimiento fino (2–3 días)

17. **Modal**: focus trap + devolución de foco al cerrar (o sustituir el modal por un panel de detalle inline/página por proyecto, que además es enlazable).
18. **Íconos de Habilidades en build-time** (astro-icon/iconify bundled) para eliminar la dependencia de red en runtime.
19. **Rehacer el logo como SVG real** (<5KB) y optimizar con SVGO; añadir favicon PNG de respaldo.
20. **Quitar la transición universal** `* { transition: … }` y limitarla a los elementos interactivos; pausar el spotlight cuando no hay tarjetas visibles.
21. **Redirect de raíz en servidor** (`redirects` de Astro/Vercel) en lugar de meta-refresh.

### Verificación final (medio día)

- Lighthouse ≥ 95 en Performance/Accessibility/Best Practices/SEO (móvil y desktop).
- axe DevTools sin errores críticos; validar que hay un solo `<main>`.
- Prueba real en móvil (scroll total < ~8.000px con proyectos colapsados).
- Revisión de modo claro pantalla por pantalla.
- `grep` de cadenas en español en la build de `/en/` y viceversa.
- Corrector ortográfico sobre `projects.json` y `ui.ts`.

---

## 4. Lo que ya está bien (no tocar)

Skip link funcional, estados `focus-visible` consistentes, `prefers-reduced-motion` en CSS, empty state con "limpiar filtros" en proyectos, validación y estados del formulario de contacto, `aria-live` en el contador de proyectos, estructura i18n con rutas por idioma, y el command palette. Son detalles por encima de la media; el plan busca que el resto del sitio esté a esa altura.
