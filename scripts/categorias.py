"""Deja las categorías exactamente como las de cactustours.com.

Sus ocho mosaicos, en su orden:
  Combos · Park Pass · Sky Bikes · UTV Can-ams · ATVs · Camel Ride ·
  Horseback Ride · For kids

Camellos y caballos son mosaicos separados (no una categoría "con animales"),
y el Sky Bike tiene el suyo (no una categoría "altura").
"""

import collections
import json
import pathlib
import re

RAIZ = pathlib.Path(__file__).parent.parent

# --- 1. Catálogo: separar animal → camel/horse, aereo → skybike ------------
act = RAIZ / "src" / "lib" / "activities.ts"
src = act.read_text(encoding="utf-8")

src = src.replace(
    'export type Category = "atv" | "utv" | "animal" | "aereo" | "bici" | "combo";',
    'export type Category =\n'
    '  | "combo"\n'
    '  | "skybike"\n'
    '  | "utv"\n'
    '  | "atv"\n'
    '  | "camel"\n'
    '  | "horse"\n'
    '  | "bike";',
)
src = re.sub(
    r"export const CATEGORY_ORDER: Category\[\] = \[[^\]]*\];",
    "/** El orden de sus mosaicos en la portada. */\n"
    "export const CATEGORY_ORDER: Category[] = [\n"
    '  "combo",\n  "skybike",\n  "utv",\n  "atv",\n  "camel",\n  "horse",\n  "bike",\n];',
    src,
    flags=re.S,
)

# Reasignar la categoría de cada actividad
for slug, cat in {
    "camellos": "camel",
    "caballos": "horse",
    "sky-bike": "skybike",
    "bici-electrica": "bike",
    "bici-montana": "bike",
}.items():
    bloque = re.search(r'\{\s*slug: "%s",.*?\n  \}' % re.escape(slug), src, re.S).group(0)
    src = src.replace(bloque, re.sub(r'category: "\w+",', f'category: "{cat}",', bloque, count=1))

act.write_text(src, encoding="utf-8")
print("activities.ts: categorías separadas")

# --- 2. Diccionarios: nombres tal como los rotula la referencia -------------
NOMBRES = {
    "es": {
        "catCombo": "Combos",
        "catSkybike": "Sky Bikes",
        "catUtv": "UTV Can-Am",
        "catAtv": "Cuatrimotos",
        "catCamel": "Paseo en Camello",
        "catHorse": "Cabalgata",
        "catBike": "Bicicletas",
    },
    "en": {
        "catCombo": "Combos",
        "catSkybike": "Sky Bikes",
        "catUtv": "UTV Can-ams",
        "catAtv": "ATVs",
        "catCamel": "Camel Ride",
        "catHorse": "Horseback Ride",
        "catBike": "Bikes",
    },
}

CATS_ES = {
    "camel": {
        "name": "Paseo en Camello",
        "tagline": "Caminata guiada por el desierto y la playa, desde 5 años",
        "intro": "Nuestros camellos viven en un santuario registrado ante SEMARNAT y caminan a su ritmo, siempre con un cuidador a pie. No es un tour de velocidad: es de paisaje, de fotos y de convivir con los animales.\n\nEs lo que mejor funciona con niños chicos y con abuelos, y de lejos lo que más fotos genera del viaje.",
        "note": "Desde 5 años. No se necesita experiencia previa.",
    },
    "horse": {
        "name": "Cabalgata",
        "tagline": "Trote tranquilo frente a las olas del Pacífico",
        "intro": "Caballos dóciles, guía a tu lado todo el recorrido y una ruta que va del desierto directo a la orilla. No hace falta saber montar: ajustamos el ritmo al del grupo.\n\nEs el tour más tranquilo que tenemos, y de lejos el mejor al atardecer.",
        "note": "Desde 6 años, peso máximo 110 kg.",
    },
    "skybike": {
        "name": "Sky Bikes",
        "tagline": "850 metros suspendido sobre el cañón",
        "intro": "Una bicicleta fija sobre un cable tendido de un lado del cañón al otro. Vas sentado, pedaleando a tu ritmo, con arnés doble y línea de vida independiente.\n\nNo hay caída libre ni velocidad: es altura y vista. Por eso funciona para quien quiere el paisaje sin la adrenalina de una tirolesa tradicional.",
        "note": "Desde 8 años, estatura mínima 1.20 m y peso máximo 120 kg.",
    },
}
CATS_EN = {
    "camel": {
        "name": "Camel Ride",
        "tagline": "A guided walk through desert and beach, from age 5",
        "intro": "Our camels live in a sanctuary registered with SEMARNAT and walk at their own pace, always with a handler on foot. This isn't a speed tour: it's about the landscape, the photos and time with the animals.\n\nIt's what works best with small children and grandparents, and easily what generates the most photos from the trip.",
        "note": "From age 5. No previous experience needed.",
    },
    "horse": {
        "name": "Horseback Ride",
        "tagline": "An easy trot facing the Pacific waves",
        "intro": "Gentle horses, a guide beside you the whole way, and a route that runs from the desert straight to the shoreline. You don't need to know how to ride: we set the pace to the group.\n\nIt's the calmest tour we run, and by far the best one at sunset.",
        "note": "From age 6, maximum weight 110 kg.",
    },
    "skybike": {
        "name": "Sky Bikes",
        "tagline": "850 metres suspended above the canyon",
        "intro": "A fixed bicycle on a cable strung from one side of the canyon to the other. You sit and pedal at your own pace, in a double harness with an independent safety line.\n\nThere's no free fall and no speed: it's height and views. That's why it works for anyone who wants the scenery without the adrenaline of a traditional zipline.",
        "note": "From age 8, minimum height 1.20 m and maximum weight 120 kg.",
    },
}

for name, nombres, cats in (("es", NOMBRES["es"], CATS_ES), ("en", NOMBRES["en"], CATS_EN)):
    p = RAIZ / "src" / "dictionaries" / f"{name}.json"
    doc = json.loads(p.read_text(encoding="utf-8"), object_pairs_hook=collections.OrderedDict)

    for k in ("catAnimal", "catAereo", "catBici"):
        doc["tours"].pop(k, None)
    doc["tours"].update(nombres)

    c = doc.get("categories", {})
    c.pop("animal", None)
    c.pop("aereo", None)
    if "bici" in c:
        c["bike"] = c.pop("bici")
    c.update(cats)
    doc["categories"] = c

    p.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{name}.json: nombres y textos de categoría")
