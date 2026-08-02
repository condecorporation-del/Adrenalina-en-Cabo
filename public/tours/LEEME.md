# Fotos de las actividades

Las fotos actuales son **material de Cactus Tours**, el operador. Adrenalina Cabo
es revendedor autorizado, así que su uso está cubierto por esa relación
comercial. Si esa relación cambia, hay que reemplazarlas.

## Archivos y a qué actividad van

| Archivo | Se usa en |
|---|---|
| `atv.webp` | ATV Migriño, ATV Playa y Dunas |
| `utv.webp` | Side by Side, Can-Am X3, Maverick |
| `ninos.webp` | Mini RZR, página de Niños |
| `camellos.webp`, `camellos-2.webp` | Paseo en camello |
| `caballos.webp` | Cabalgata |
| `sky-bike.webp` | Sky Bike |
| `hero-skybike.webp` | Portada (2560 px) |
| `skybike-aereo.webp` | Combo Balandra, tomas aéreas |
| `combos.webp`, `combo-skybike.webp` | Combos, bicicletas |
| `pase-de-dia.webp` | Pase de Día |

## Cómo cambiar una foto

1. Pon el archivo en esta carpeta, por ejemplo `atv-migrino.webp`.
2. En `src/lib/activities.ts`, busca la actividad y edita su línea `image`:

```ts
{
  slug: "atv-migrino",
  image: "/tours/atv-migrino.webp",   // ← esta línea
  ...
}
```

Next se encarga del resto: convierte a AVIF/WebP, genera los tamaños
responsivos y carga diferida. No hay que tocar el diseño.

## Requisitos

| | |
|---|---|
| Proporción | Horizontal, 3:2 o 16:9 |
| Ancho mínimo | 1200 px (1600+ para heroes) |
| Formato | WebP, JPG o PNG |

Deja aire en la parte inferior de la imagen: ahí van el rating y la duración
encima de la foto en las tarjetas.
