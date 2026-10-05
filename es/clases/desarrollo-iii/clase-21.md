---
layout: clase
title: "Clase 21: Trabajo Práctico Nº 3 - Sistema POO Integrador"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Trabajo Práctico Nº 3: Sistema POO Integrador

<br>

## Objetivo

<br>

Aplicar **herencia, polimorfismo, encapsulamiento, persistencia en JSON y manejo de errores** en un sistema completo que resuelva un problema real.

> **Fecha de entrega**: **Viernes 16 de octubre** (2 semanas)

> **Modalidad**: Individual o parejas (máx. 2)

> **Entrega**: nombre_main.py + `README.md` + archivo JSON de ejemplo

<br>


## Temática: "Gestor de Colección de Videojuegos"

<br>

> **¿Por qué videojuegos?**

> - Entidades naturales para herencia: `Juego` (base) → `JuegoFisico`, `JuegoDigital`, `JuegoSuscripcion`

> - Atributos variados para encapsular: precio, stock, clave de activación, fecha de expiración

> - Operaciones polimórficas: `calcular_valor()`, `mostrar_detalle()`, `esta_disponible()`

**Podés cambiar la temática** si tu grupo prefiere otra (biblioteca, tienda de ropa, sistema de turnos médicos, inventario de componentes PC, o un minijuego! etc.). **La estructura POO debe ser equivalente.**

<br>

---

## Requisitos Mínimos (Obligatorios)

| # | Requisito | Detalle |
|---|-----------|---------|
| **1** | **Jerarquía de clases** | 1 clase base abstracta + **mínimo 2 subclases** con atributos y métodos propios |
| **2** | **Polimorfismo** | Lista heterogénea + **método que se comporta distinto** en cada subclase (ej: `calcular_precio_final()`, `generar_reporte()`) |
| **3** | **Encapsulamiento** | **Mínimo 2 atributos protegidos** (`_atributo`) con **getter/setter + validación** (ej: precio ≥ 0, stock ≥ 0, email válido, fecha futura) |
| **4** | **Persistencia JSON** | Guardar y cargar colección completa en `datos.json` usando módulo `json` |
| **5** | **Menú interactivo** | `while True` con opciones numeradas, entrada validada, salida explícita |
| **6** | **Manejo de errores** | `try/except` en: entrada de usuario, operaciones de archivo, validaciones de setter |
| **7** | **Comentarios explicativos** | **Docstrings en clases y métodos públicos** + comentarios en lógica no trivial |

<br>

---

## ¿Qué significa "Lista heterogénea + método que se comporta distinto"?

> **Es el core del polimorfismo.** Significa: **una sola lista guarda objetos de clases diferentes**, y al llamar **el mismo método** en cada uno, **cada objeto hace lo suyo**.

### Ejemplo concreto:

```python
# 1. Creás objetos de clases DISTINTAS (hijas de Juego)
juegos = [
    JuegoFisico("Zelda", 5000, 3, "Switch", "nuevo", True),
    JuegoDigital("Elden Ring", 6000, 1, "Steam", "ABCD-1234", True),
    JuegoFisico("Mario Kart", 4500, 5, "Switch", "usado", False),
]

# 2. Lista HETEROGÉNEA: tiene JuegoFisico Y JuegoDigital mezclados
#    Pero todos son "Juego" (heredan de la misma base)

# 3. UN SOLO BUCLE, MISMO MÉTODO, COMPORTAMIENTOS DISTINTOS:
for juego in juegos:
    print(juego.mostrar_detalle())   # ← POLIMORFISMO
    print(f"Precio final: ${juego.calcular_precio_final()}")  # ← POLIMORFISMO
```

**Salida:**
```
📦 FÍSICO | Zelda | $5500.0 | Switch | nuevo | Caja: Sí | Stock: 3
Precio final: $5500.0
💾 DIGITAL | Elden Ring | $5700.0 | Steam | Clave: ****-1234 | DRM: Sí | Stock: 1
Precio final: $5700.0
📦 FÍSICO | Mario Kart | $3150.0 | Switch | usado | Caja: No | Stock: 5
Precio final: $3150.0
```

### Lo que NO es polimorfismo (evitá esto):

```python
# if/elif verificando tipos → rompe encapsulamiento, no escala
for juego in juegos:
    if isinstance(juego, JuegoFisico):
        print("Físico:", juego.consola, juego.estado)
    elif isinstance(juego, JuegoDigital):
        print("Digital:", juego.plataforma, juego.tiene_drm)
```

### Lo que SÍ es polimorfismo (lo que queremos):

- La lista no sabe ni le importa qué tipo exacto tiene cada objeto
- Cada objeto **responde al mismo mensaje** (`mostrar_detalle()`, `calcular_precio_final()`)
- **Cada uno hace lo suyo** según su clase
- Si agregás `JuegoSuscripcion` mañana, **no tocás el bucle**: solo creás la clase con sus métodos

> **En el TP**: Tu menú opción 2 ("Listar todos") debe hacer exactamente esto: un `for` que llama `mostrar_detalle()` en una lista mixta.

<br>


> **Diseñá e implementá una REGLA DE NEGOCIO propia que afecte el comportamiento polimórfico del sistema.**

Ejemplos (elegí **una** o inventá la tuya):

| Regla de negocio | Qué implica en código |
|------------------|----------------------|
| **"Descuento por antigüedad"** | Juegos > 2 años: 10% off. Físicos: +5% si vienen con caja original. Digitales: -5% si no tienen DRM. |
| **"Sistema de préstamo"** | Juegos físicos se pueden prestar (cambia estado a "prestado", registra a quién, fecha límite). Digitales no. |
| **"Compatibilidad retro"** | Juegos de consolas antiguas valen más si funcionan en consola moderna (polimorfismo en `calcular_valor_mercado()`). |
| **"Licencias familiares"** | Juegos digitales permiten hasta 3 cuentas. Suscripciones: si se cancela, se pierden todos. |
| **"Eventos de lanzamiento"** | Si el juego salió hace < 30 días: precio fijo, sin descuentos. |
| **Tu propia regla** | Algo que tenga sentido en tu dominio y **requiera lógica distinta en cada subclase**. |

### Qué entregar para este punto:

1. **En `README.md`**: Explicación en 3-4 líneas de tu regla de negocio y **por qué requiere polimorfismo** (por qué no se resuelve con un `if` en la clase base).
2. **En el código**: Implementación real que se ejecute al usar el sistema.

> **Criterio de evaluación**: La regla debe ser **no trivial** (no "si es físico 10%, si digital 20%") y **demostrar que entendés por qué el polimorfismo es la herramienta correcta**.

<br>

---

## Funcionalidades del Menú (Mínimo)

| Opción | Qué hace | Qué valida |
|--------|----------|------------|
| **1. Agregar juego** | Pide tipo (físico/digital/suscripción) → datos → valida → agrega a lista | Tipo válido, precio > 0, stock ≥ 0, email/fecha según tipo |
| **2. Listar todos** | Recorre lista y llama `mostrar_detalle()` en cada uno | Polimorfismo: cada tipo muestra sus datos propios |
| **3. Buscar por ID/título** | Búsqueda exacta o parcial | Maneja "no encontrado" |
| **4. Aplicar regla de negocio** | Ejecuta tu regla anti-IA sobre toda la colección | Muestra antes/después |
| **5. Guardar en JSON** | Serializa toda la colección a `datos.json` | `try/except` en escritura |
| **6. Cargar desde JSON`** | Deserializa y reconstruye objetos correctos | `try/except` en lectura + parsing |
| **7. Salir** | Guarda automático opcional + `break` | — |

<br>

---
<br>

##  Consejos para No Trabarte

1. **Empezá en papel**: Diagrama de clases (15 min) → ahorra horas de refactor.
2. **Hacé andar lo básico primero**: Menú → Agregar → Listar → Guardar → Cargar. Después la regla de negocio.
3. **Usá el `datos.json` de prueba** desde el día 1 para testear carga/guardado.
4. **Probá errores a propósito**: ingresá precio negativo, archivo corrupto, tipo inválido.
5. **Comentá mientras codeás**, no al final.

<br>

