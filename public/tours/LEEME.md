# Fotos de las actividades

Las fotos actuales son **material de Cactus Tours**, el operador. Adrenalina Cabo
es revendedor autorizado, así que su uso está cubierto por esa relación
comercial. Si esa relación cambia, hay que reemplazarlas.

## Archivos y a qué actividad van

| Archivo | Se usa en |
|---|---|
| `atv.webp` | ATV Migriño |
| `atv-playa.webp` | ATV Playa y Dunas |
| `utv.webp` | Side by Side, Can-Am X3, Maverick |
| `ninos.webp` | Mini RZR, página de Niños |
| `camellos.webp` | Paseo en camello |
| `camellos-2.webp` | Combo 2 en 1, mosaico de Combos |
| `caballos.webp` | Cabalgata |
| `sky-bike.webp` | Sky Bike, bloque de Bienvenida |
| `hero-skybike.webp` | Portada (2560 px), Combo 3 en 1 |
| `skybike-aereo.webp` | Tomas aéreas |
| `parque.webp` | — libre (es una toma del Sky Bike) |
| `torre.webp` | Combo Balandra, mosaico de Park Pass |

## Fotos que faltan

Estas actividades salen con degradado de color en vez de foto. Hay que
pedírselas al cliente:

| Actividad | Por qué |
|---|---|
| Bicicleta eléctrica | No hay foto de bici de suelo |
| Bicicleta de montaña | No hay foto de bici de suelo |
| Can-Am X3 ($240) | Comparte foto con Side by Side y Maverick |
| Maverick RC/RS ($480) | Comparte foto con Side by Side y Can-Am X3 |

Ojo con las bicicletas: **no** sirve una foto del Sky Bike. El Sky Bike es la
bici colgada del cable; estas dos van por el suelo. Usar una del Sky Bike hace
parecer que son el mismo producto (ya pasó una vez).

Los tres UTV cuestan $164, $240 y $480. Con la misma foto en los tres, no se
ve por qué uno cuesta el triple que el otro.

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
