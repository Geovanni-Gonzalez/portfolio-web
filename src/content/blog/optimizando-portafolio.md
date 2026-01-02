---
title: "Cómo optimicé mi portafolio con Astro"
description: "Descubre cómo logré un rendimiento perfecto y un diseño adaptable utilizando Astro y React."
date: 2024-01-01
tags: ["Astro", "React", "Performance", "Web Development"]
lang: "es"
image: "/images/profile.webp"
---

## Introducción

Crear un portafolio moderno requiere más que solo un buen diseño; necesita rendimiento y accesibilidad. En este proyecto, elegí **Astro** por su arquitectura de "Islas", que me permite enviar cero JavaScript al cliente por defecto.

## El Desafío

Mi objetivo era tener un sitio web que cargara instantáneamente en dispositivos móviles pero que aún tuviera interacciones ricas como las de React.

## La Solución

Utilizando **React** solo para componentes interactivos (como el carrusel de proyectos y el selector de idioma) y Astro para todo el contenido estático, logré reducir el tamaño del bundle javascript drásticamente.

### Fragmento de Código

```astro
---
// Ejemplo de componente Astro
const { title } = Astro.props;
---
<h1>{title}</h1>
```

## Conclusión

El resultado es un sitio web rápido, accesible y fácil de mantener.
