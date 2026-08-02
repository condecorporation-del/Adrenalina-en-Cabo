"""Extrae el contenido de la portada de Cactus Tours y el de la nuestra,
en orden de aparición, para compararlos uno contra uno.

Uso:  python scripts/diff-cactus.py
"""

import html
import pathlib
import re
import sys

RUIDO = re.compile(
    r"^(function|var |window|document|\{|\}|\[|\]|//|/\*|@|\$|const |let |if\(|return)",
)


def texto_en_orden(ruta: pathlib.Path) -> list[str]:
    """Devuelve los textos visibles de un HTML, en orden, sin scripts ni estilos."""
    crudo = ruta.read_text(encoding="utf-8", errors="ignore")
    cuerpo = crudo[crudo.find("<body") :] if "<body" in crudo else crudo
    cuerpo = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", cuerpo, flags=re.S | re.I)

    piezas: list[str] = []
    for m in re.finditer(r">([^<>]{2,160})<", cuerpo):
        t = html.unescape(m.group(1)).strip()
        t = re.sub(r"\s+", " ", t)
        if not t or RUIDO.match(t):
            continue
        if len(t) < 3 or t.count(";") > 3 or t.count("&") > 3:
            continue
        piezas.append(t)

    # Quita repeticiones consecutivas
    limpio: list[str] = []
    for t in piezas:
        if not limpio or limpio[-1] != t:
            limpio.append(t)
    return limpio


def main() -> None:
    base = pathlib.Path(__file__).parent.parent
    ellos = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path("/tmp/cactus/home.html")
    nuestro = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else pathlib.Path("/tmp/home_es.html")

    a = texto_en_orden(ellos)
    b = texto_en_orden(nuestro)

    salida = base / "docs" / "comparacion-cactus.md"
    salida.parent.mkdir(exist_ok=True)

    with salida.open("w", encoding="utf-8") as f:
        f.write("# Comparación: cactustours.com vs. Adrenalina Cabo\n\n")
        f.write(f"Ellos: {len(a)} bloques de texto · Nosotros: {len(b)}\n\n")

        f.write("## Portada de Cactus, en orden\n\n")
        for i, t in enumerate(a[:200], 1):
            f.write(f"{i:>3}. {t}\n")

        f.write("\n\n## Nuestra portada, en orden\n\n")
        for i, t in enumerate(b[:200], 1):
            f.write(f"{i:>3}. {t}\n")

    print(f"escrito: {salida}")
    print(f"ellos={len(a)} nosotros={len(b)}")
    print("\n--- PRIMEROS 60 DE ELLOS ---")
    for i, t in enumerate(a[:60], 1):
        print(f"{i:>3}. {t}")


if __name__ == "__main__":
    main()
