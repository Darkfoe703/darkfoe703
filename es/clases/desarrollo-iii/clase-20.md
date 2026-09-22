---
layout: clase
title: "Clase 20: POO - Polimorfismo y Encapsulamiento"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Polimorfismo y Encapsulamiento

<br>

## Repaso rápido: ¿Dónde estamos?

En la **Clase 18** vimos: clases, objetos, atributos, métodos, `__init__` y `self`.
En la **Clase 19** vimos: herencia, `super()`, sobrescritura, herencia múltiple.

Hoy cerramos el módulo POO con dos conceptos fundamentales:
1. **Polimorfismo** — "Mismo mensaje, diferente comportamiento"
2. **Encapsulamiento** — Proteger los datos internos de la clase

<br>

## 1. Polimorfismo: Una interfaz, muchas formas

**Polimorfismo** viene del griego: *poly* (muchos) + *morphos* (formas).

> **En palabras simples**: Diferentes objetos responden al **mismo mensaje** (método) de **maneras diferentes**, y tu código no necesita saber *qué tipo* de objeto es, solo que *entiende ese mensaje*.

### El ejemplo clásico: `len()`

```python
print(len("hola"))        # 4 — string cuenta caracteres
print(len([1, 2, 3]))     # 3 — lista cuenta elementos
print(len({"a": 1, "b": 2}))  # 2 — diccionario cuenta claves
```

`len()` funciona con **cualquier cosa que tenga longitud**. No le importa el tipo, solo que "sepa medirse".

### Polimorfismo en TU código: Duck Typing

En Python seguimos el **Duck Typing** ("Tipado pato"):

> *"Si camina como pato y grazna como pato, es un pato."*

**No verificamos el tipo**, verificamos la **capacidad**.

```python
class Perro:
    def hablar(self):
        return "🐕 Guau!"

class Gato:
    def hablar(self):
        return "🐱 Miau!"

class Vaca:
    def hablar(self):
        return "🐄 Muuu!"

# Función polimórfica: no le importa el tipo, solo que tenga .hablar()
def hacer_hablar(animal):
    print(animal.hablar())

# Probamos:
animales = [Perro(), Gato(), Vaca(), Perro(), Gato()]

for animal in animales:
    hacer_hablar(animal)
```

**Salida:**
```
🐕 Guau!
🐱 Miau!
🐄 Muuu!
🐕 Guau!
🐱 Miau!
```

> **¿Por qué esto es poderoso?** Si mañana agregas `class Pato`, **no tocas `hacer_hablar`**. Solo necesitas que `Pato` tenga `.hablar()`. Tu código **está cerrado a modificaciones, abierto a extensiones** (¡Principio Abierto/Cerrado!).

### Polimorfismo con herencia

También funciona cuando las clases comparten un padre:

```python
class Usuario:
    def __init__(self, nombre):
        self.nombre = nombre
    
    def describir(self):
        return f"Usuario: {self.nombre}"

class Estudiante(Usuario):
    def __init__(self, nombre, legajo):
        super().__init__(nombre)
        self.legajo = legajo
    
    def describir(self):  # Sobrescribe
        return f"🎓 Estudiante {self.nombre} (Legajo: {self.legajo})"

class Profesor(Usuario):
    def __init__(self, nombre, empleado_id):
        super().__init__(nombre)
        self.empleado_id = empleado_id
    
    def describir(self):  # Sobrescribe
        return f"👨‍🏫 Profesor {self.nombre} (ID: {self.empleado_id})"

# Lista heterogénea - todos son Usuario, pero se comportan diferente
personas = [
    Estudiante("Ana", "L-001"),
    Profesor("Carlos", "EMP-001"),
    Estudiante("Bruno", "L-002"),
    Usuario("Visitante"),
]

for persona in personas:
    print(persona.describir())  # Cada uno responde a SU manera
```

**Salida:**
```
🎓 Estudiante Ana (Legajo: L-001)
👨‍🏫 Profesor Carlos (ID: EMP-001)
🎓 Estudiante Bruno (Legajo: L-002)
Usuario: Visitante
```

<br>

## 2. Encapsulamiento: Protege tus datos

**Encapsulamiento** = ocultar la implementación interna y exponer solo lo necesario.

> **Analogía**: El volante del auto. Tú giras el volante (interfaz pública), no manipulas la dirección hidráulica directamente (implementación privada).

### ¿De qué (o quién) estamos protegiendo los datos?

> **Protegemos los datos de la propia clase contra uso incorrecto DESDE AFUERA** (código externo que usa la clase).
> 
> El problema no es que la clase se rompa a sí misma, sino que **cualquier código externo** pueda hacer `cuenta.saldo = -5000` y dejar el objeto en estado inválido. El encapsulamiento pone un **guardián** en la puerta: nadie modifica los datos sin pasar validación.

### Convenciones en Python

| Convención | Significado | Ejemplo |
|------------|-------------|---------|
| `publico` | Libre acceso | `self.nombre` |
| `_protegido` | "Uso interno, no toques desde afuera" | `self._saldo` |
| `__privado` | Name mangling (Python lo renombra) | `self.__clave` |

> **Importante**: En Python **no hay privacidad real**. Las convenciones son acuerdos entre programadores. `_protegido` es un aviso: "esto es interno".

### El problema: acceso directo inseguro

```python
class CuentaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo  # ¡Público! Cualquier código externo puede hacer: cuenta.saldo = -9999

cuenta = CuentaBancaria("Ana", 1000)
cuenta.saldo = -5000  # 😱 ¡Saldo negativo sin control! El objeto queda en estado inválido.
print(cuenta.saldo)   # -5000
```

**¿Quién hizo el daño?** Código externo que usó la clase sin saber (o importarle) las reglas del negocio.

### La solución: Métodos getter y setter (el guardián en la puerta)

En lugar de dejar que toquen el atributo directamente, **exponemos métodos** que controlan el acceso:

```python
class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self._saldo = saldo_inicial  # _protegido: convención "no toques desde afuera"
    
    # ===== GETTER: método para LEER el valor =====
    def obtener_saldo(self):
        """Cualquiera puede LEER el saldo usando este método."""
        return self._saldo
    
    # ===== SETTER: método para ESCRIBIR el valor (con validación) =====
    def establecer_saldo(self, valor):
        """Cualquiera que intente CAMBIAR el saldo pasa por acá PRIMERO."""
        if valor < 0:
            raise ValueError("El saldo no puede ser negativo")
        self._saldo = valor
    
    # ===== MÉTODOS DE NEGOCIO (también validan) =====
    def depositar(self, monto):
        if monto <= 0:
            raise ValueError("El depósito debe ser positivo")
        self._saldo += monto
        print(f"✅ Depósito de ${monto}. Saldo: ${self._saldo}")
    
    def retirar(self, monto):
        if monto <= 0:
            raise ValueError("El retiro debe ser positivo")
        if monto > self._saldo:
            raise ValueError("Fondos insuficientes")
        self._saldo -= monto
        print(f"✅ Retiro de ${monto}. Saldo: ${self._saldo}")

# Probemos:
cuenta = CuentaBancaria("Ana", 1000)

print(cuenta.obtener_saldo())      # 1000 — Lee via getter
cuenta.establecer_saldo(500)       # ✅ Cambia a 500
cuenta.depositar(200)              # ✅ Depósito de $200. Saldo: $700
cuenta.retirar(100)                # ✅ Retiro de $100. Saldo: $600

# Protección automática contra código externo descuidado:
try:
    cuenta.establecer_saldo(-100)  # 🚫 ValueError: El saldo no puede ser negativo
except ValueError as e:
    print(f"Error: {e}")

try:
    cuenta.retirar(5000)           # 🚫 ValueError: Fondos insuficientes
except ValueError as e:
    print(f"Error: {e}")
```

**Salida:**
```
1000
✅ Depósito de $200. Saldo: $700
✅ Retiro de $100. Saldo: $600
Error: El saldo no puede ser negativo
Error: Fondos insuficientes
```

> **¿Por qué métodos y no acceso directo?**
> Con métodos (`obtener_saldo()`, `establecer_saldo(valor)`) tú decides **qué es válido**. El código externo no cambia su forma de trabajar, pero tú ganas control total sobre los datos.

### Encapsulamiento suave con `_protegido` (convención)

A veces no necesitas validación estricta, solo avisar "esto es interno, no toques desde afuera":

```python
class Motor:
    def __init__(self):
        self._temperatura = 20  # Protegido: uso interno de la clase
        self._encendido = False
    
    def encender(self):        # Público: interfaz oficial
        self._encendido = True
        self._calentar()       # Interno: la clase se habla a sí misma
    
    def _calentar(self):       # Protegido: avisa "uso interno"
        self._temperatura += 30
        print(f"🔥 Motor calentando... {self._temperatura}°C")

motor = Motor()
motor.encender()        # ✅ OK: uso correcto de la interfaz pública
# motor._calentar()    # ⚠️ Funciona, pero rompes la convención: "uso interno"
```

<br>

## 3. Un ejemplo que une todo: `Persona` con encapsulamiento y polimorfismo

```python
class Persona:
    def __init__(self, nombre, edad, email):
        self.nombre = nombre
        self._edad = edad          # Protegido
        self._email = email        # Protegido
    
    # ===== GETTERS y SETTERS: encapsulamiento con validación =====
    def obtener_edad(self):
        return self._edad
    
    def establecer_edad(self, valor):
        if not 0 <= valor <= 120:
            raise ValueError("Edad inválida (0-120)")
        self._edad = valor
    
    def obtener_email(self):
        return self._email
    
    def establecer_email(self, valor):
        if "@" not in valor or "." not in valor.split("@")[1]:
            raise ValueError("Email inválido")
        self._email = valor
    
    # ===== POLIMORFISMO: método para sobrescribir =====
    def describir(self):
        return f"{self.nombre}, {self.obtener_edad()} años, {self.obtener_email()}"


class Estudiante(Persona):
    def __init__(self, nombre, edad, email, legajo):
        super().__init__(nombre, edad, email)
        self.legajo = legajo
    
    def describir(self):  # Polimorfismo: misma firma, comportamiento distinto
        return f"🎓 {super().describir()} | Legajo: {self.legajo}"


class Profesor(Persona):
    def __init__(self, nombre, edad, email, empleado_id):
        super().__init__(nombre, edad, email)
        self.empleado_id = empleado_id
    
    def describir(self):  # Polimorfismo
        return f"👨‍🏫 {super().describir()} | Empleado: {self.empleado_id}"


# ===== DEMO =====
# 1. Creación normal
est = Estudiante("Ana", 20, "ana@email.com", "L-001")
prof = Profesor("Carlos", 45, "carlos@email.com", "EMP-001")

# 2. Polimorfismo: lista heterogénea
personas = [est, prof]
for p in personas:
    print(p.describir())  # Cada uno su formato

# 3. Encapsulamiento: control via getters/setters
est.establecer_edad(21)           # ✅ OK: pasa validación
# est.establecer_edad(200)        # 🚫 ValueError: Edad inválida
# est.establecer_email("malo")    # 🚫 ValueError: Email inválido
print(f"Edad actualizada: {est.obtener_edad()}")
```

<br>

## Resumen visual

```
┌─────────────────────────────────────────────────────────┐
│                    CLASE PERSONA                        │
├─────────────────────────────────────────────────────────┤
│  __init__(self, nombre, edad, email)                   │
│                                                         │
│  obtener_edad() / establecer_edad(valor)  → validado   │
│  obtener_email() / establecer_email(valor) → validado  │
│                                                         │
│  def describir(self) → "Nombre, edad, email"           │
└─────────────────────────────────────────────────────────┘
                          ▲
              ┌───────────┴───────────┐
              ▼                       ▼
    ┌─────────────────┐     ┌─────────────────┐
    │   ESTUDIANTE    │     │   PROFESOR      │
    ├─────────────────┤     ├─────────────────┤
    │ legajo          │     │ empleado_id     │
    │ describir()     │     │ describir()     │
    │ (override)      │     │ (override)      │
    └─────────────────┘     └─────────────────┘
              │                       │
              └───────────┬───────────┘
                          ▼
         ┌─────────────────────────────┐
         │  POLIMORFISMO EN ACCIÓN     │
         │  for p in personas:         │
         │      print(p.describir())   │
         └─────────────────────────────┘
```

<br>

## Actividades

<br>

1. **Agregar getter/setter con validación a tu clase de la Clase 19**

   Toma `AlumnoBecado` o `AlumnoIntercambio` y protege al menos un atributo sensible (ej: `promedio`, `tipo_beca`, `pais_origen`) creando métodos `obtener_X()` y `establecer_X(valor)` que validen.

2. **Polimorfismo en acción: función genérica**

   Escribe una función `mostrar_todos(usuarios)` que reciba una lista mixta de `Estudiante`, `Profesor` y `Admin` (clase 19) y llame a `mostrar_info()` en cada uno. Verifica que cada uno muestra su info específica.

3. **Pregunta de reflexión (responder en 3-4 líneas)**

   > En la actividad 2 de la clase 19, creaste una lista con objetos de diferentes clases y llamaste a `mostrar_info()` en cada uno. ¿Qué concepto vimos hoy que explica por qué cada objeto mostró su información de forma distinta? Explica con tus palabras.

<br>

o/