"""Pone en las tarjetas de promoción los precios reales del catálogo."""

import collections
import json
import pathlib

ITEMS_ES = [
    {
        "tag": "Ahorra $25",
        "title": "Combo 2 en 1",
        "body": "Dos actividades a elegir en una sola salida de dos horas.",
        "price": 100,
        "before": 125,
        "href": "/tours/combo-2x1",
        "photo": "mar",
    },
    {
        "tag": "Ahorra $50",
        "title": "Combo 3 en 1",
        "body": "Tres actividades distintas en tres horas de recorrido.",
        "price": 125,
        "before": 175,
        "href": "/tours/combo-3x1",
        "photo": "dunas",
    },
    {
        "tag": "Ahorra $60",
        "title": "Pase de Día Completo",
        "body": "Acceso libre a las actividades, Beach Club y comida.",
        "price": 239,
        "before": 299,
        "href": "/pase-de-dia",
        "photo": "desierto",
    },
    {
        "tag": "Ahorra $35",
        "title": "Combo 2 en 1 Premium",
        "body": "Mismo formato, con las unidades de gama alta.",
        "price": 140,
        "before": 175,
        "href": "/tours/combo-2x1-premium",
        "photo": "canon",
    },
]

ITEMS_EN = [
    {
        "tag": "Save $25",
        "title": "2-in-1 Combo",
        "body": "Two activities of your choice in a single two-hour outing.",
        "price": 100,
        "before": 125,
        "href": "/tours/combo-2x1",
        "photo": "mar",
    },
    {
        "tag": "Save $50",
        "title": "3-in-1 Combo",
        "body": "Three different activities across three hours of riding.",
        "price": 125,
        "before": 175,
        "href": "/tours/combo-3x1",
        "photo": "dunas",
    },
    {
        "tag": "Save $60",
        "title": "Full Day Pass",
        "body": "Open access to the activities, Beach Club and dining.",
        "price": 239,
        "before": 299,
        "href": "/pase-de-dia",
        "photo": "desierto",
    },
    {
        "tag": "Save $35",
        "title": "2-in-1 Combo Premium",
        "body": "Same format, built around the high-end machines.",
        "price": 140,
        "before": 175,
        "href": "/tours/combo-2x1-premium",
        "photo": "canon",
    },
]

# Precios reales del Pase de Día (los suyos, sin margen añadido)
PASES = {"medio-dia": (199, None), "medio-dia-extendido": (249, None), "dia-completo": (239, 299)}

for name, items in (("es", ITEMS_ES), ("en", ITEMS_EN)):
    path = pathlib.Path(__file__).parent.parent / "src" / "dictionaries" / f"{name}.json"
    doc = json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=collections.OrderedDict)
    doc["promos"]["items"] = items
    path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{name}.json: promociones con precios reales")

# Pase de día en activities.ts
act = pathlib.Path(__file__).parent.parent / "src" / "lib" / "activities.ts"
src = act.read_text(encoding="utf-8")
for slug, (price, before) in PASES.items():
    import re

    bloque = re.search(r'\{\s*slug: "%s",.*?\n  \}' % slug, src, re.S)
    if not bloque:
        continue
    nuevo = re.sub(r"price: \d+,", f"price: {price},", bloque.group(0), count=1)
    nuevo = re.sub(
        r"priceBefore: (?:\d+|null),",
        f"priceBefore: {before if before else 'null'},",
        nuevo,
        count=1,
    )
    src = src.replace(bloque.group(0), nuevo)
act.write_text(src, encoding="utf-8")
print("activities.ts: pases con precios reales")
