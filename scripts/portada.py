"""Ajusta el contenido de la portada al de cactustours.com, sección por sección.

Extraído de su DOM (ver docs/comparacion-cactus.md). Orden y encabezados:
  "Buy now and save!" / Promotions  →  Categories  →  Welcome  →
  "3 easy steps" / How to reserve   →  Location / We are Cactus  →
  Testimonials  →  Questions? / FAQ →  Reserve your tour  →  Why choose us?
"""

import collections
import json
import pathlib

ES = {
    "promos": {
        "eyebrow": "¡Compra ahora y ahorra!",
        "title": "Promociones",
    },
    "cats": {"title": "Categorías"},
    "welcome": {
        "eyebrow": "Bienvenido a Adrenalina Cabo",
        "title": "¡Siente la adrenalina, siente Adrenalina Cabo!",
        "body": "Somos el parque de experiencias al aire libre líder en Los Cabos, con seguridad, calidad y servicio como bandera.",
        "claim": "Poseedores del récord Guinness a la tirolesa en bicicleta más larga del mundo",
        "cta": "Ver más",
    },
    "steps": {
        "eyebrow": "3 pasos sencillos",
        "title": "Cómo reservar",
        "items": [
            {
                "n": "01",
                "title": "Explora los tours",
                "body": "Haz clic para ver las opciones disponibles.",
            },
            {
                "n": "02",
                "title": "Elige una opción",
                "body": "Elige tu tour y tu horario.",
            },
            {
                "n": "03",
                "title": "Paga como prefieras",
                "body": "Aceptamos tarjetas de débito y crédito, incluidas Amex, Visa y Mastercard.",
            },
        ],
    },
    "location": {
        "eyebrow": "Ubicación",
        "title": "Aquí estamos",
        "body": "Carretera Federal 19 km 100, Migriño, 23597 Cabo San Lucas, B.C.S. A unos 30 minutos del centro de Cabo San Lucas.",
        "cta": "Ver en Google Maps",
    },
    "reviews": {
        "eyebrow": "Testimonios",
        "title": "¿Por qué nos quieren nuestros clientes?",
        "chips": [
            "Tours familiares",
            "Apto para niños",
            "Aventura",
            "Pura adrenalina",
            "Combos",
            "¡Y mucho más!",
        ],
    },
    "faq": {"eyebrow": "¿Preguntas?", "title": "Preguntas frecuentes"},
    "closing": {
        "eyebrow": "¡Experiencias extraordinarias!",
        "title": "Reserva tu tour",
        "body": "¿Listo para la aventura?",
        "cta": "Ver tours",
    },
    "why": {
        "eyebrow": "Adrenalina Cabo",
        "title": "¿Por qué elegirnos?",
        "items": [
            {
                "title": "Variedad de tours",
                "body": "Cuatrimotos, UTV Can-Am, camellos, caballos, Sky Bikes, bicicletas y combos. Hay algo para cada edad y cada nivel.",
            },
            {
                "title": "Seguridad",
                "body": "La seguridad es la prioridad. Tenemos guías expertos y vehículos en excelente estado para que la experiencia sea segura y disfrutable.",
            },
            {
                "title": "Servicio de calidad",
                "body": "Guías bilingües, transporte redondo desde tu hotel, comida incluida y servicio médico en sitio las 24 horas.",
            },
        ],
    },
}

EN = {
    "promos": {"eyebrow": "Buy now and save!", "title": "Promotions"},
    "cats": {"title": "Categories"},
    "welcome": {
        "eyebrow": "Welcome to Adrenalina Cabo",
        "title": "Feel the adrenaline, feel Adrenalina Cabo!",
        "body": "We are the leading outdoor experience park in Los Cabos, built on safety, quality and service.",
        "claim": "Guinness World Record holders for the world's longest Sky Bike zipline",
        "cta": "See more",
    },
    "steps": {
        "eyebrow": "3 easy steps",
        "title": "How to reserve",
        "items": [
            {
                "n": "01",
                "title": "Explore our tours",
                "body": "Click to see available options.",
            },
            {
                "n": "02",
                "title": "Choose an option",
                "body": "Choose your tour and your departure time.",
            },
            {
                "n": "03",
                "title": "Pay how you'd like",
                "body": "We accept debit and credit cards including Amex, Visa and Mastercard.",
            },
        ],
    },
    "location": {
        "eyebrow": "Location",
        "title": "Here's where we are",
        "body": "Carretera Federal 19 km 100, Migriño, 23597 Cabo San Lucas, B.C.S. About 30 minutes from downtown Cabo San Lucas.",
        "cta": "View on Google Maps",
    },
    "reviews": {
        "eyebrow": "Testimonials",
        "title": "Why do our clients love us?",
        "chips": [
            "Family tours",
            "Kid friendly",
            "Adventure",
            "Full of adrenaline",
            "Combos",
            "Much more!",
        ],
    },
    "faq": {"eyebrow": "Questions?", "title": "Frequently asked Questions"},
    "closing": {
        "eyebrow": "Extraordinary experiences!",
        "title": "Reserve your tour",
        "body": "Ready for adventure?",
        "cta": "See tours",
    },
    "why": {
        "eyebrow": "Adrenalina Cabo",
        "title": "Why choose us?",
        "items": [
            {
                "title": "Variety of tours",
                "body": "ATVs, Can-Am UTVs, camels, horses, Sky Bikes, bikes and combos. There's something for every age and every level.",
            },
            {
                "title": "Safety",
                "body": "Safety is our priority. We have expert guides and vehicles in excellent condition to ensure a safe and enjoyable experience.",
            },
            {
                "title": "Quality service",
                "body": "Bilingual guides, round-trip transportation from your hotel, food included and on-site medical service 24 hours a day.",
            },
        ],
    },
}


def merge(dest, src):
    """Sobrescribe solo las claves indicadas, conservando el resto."""
    for k, v in src.items():
        if isinstance(v, dict) and isinstance(dest.get(k), dict):
            merge(dest[k], v)
        else:
            dest[k] = v


for name, data in (("es", ES), ("en", EN)):
    path = pathlib.Path(__file__).parent.parent / "src" / "dictionaries" / f"{name}.json"
    doc = json.loads(path.read_text(encoding="utf-8"), object_pairs_hook=collections.OrderedDict)
    merge(doc, data)
    # La portada muestra 5 preguntas; el resto vive en la página de FAQ.
    doc["faq"]["seeMore"] = "Ver más" if name == "es" else "See more"
    path.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{name}.json alineado con la portada de Cactus")
