---
layout: clase
title: "Clase 20: POO - Polimorfismo, Encapsulamiento y Métodos Especiales"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Polimorfismo, Encapsulamiento y Métodos Especiales

<br>

## Repaso rápido: ¿Dónde estamos?

En la **Clase 18** vimos: clases, objetos, atributos, métodos, `__init__` y `self`.
En la **Clase 19** vimos: herencia, `super()`, sobrescritura, herencia múltiple.

Hoy cerramos el módulo POO con tres conceptos que hacen a Python poderoso y profesional:
1. **Polimorfismo** — "Mismo mensaje, diferente comportamiento"
2. **Encapsulamiento** — Proteger los datos internos
3. **Métodos especiales** — `@property`, `@classmethod`, `@staticmethod`

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

### Convenciones en Python

| Convención | Significado | Ejemplo |
|------------|-------------|---------|
| `publico` | Libre acceso | `self.nombre` |
| `_protegido` | "Uso interno, no toques desde afuera" | `self._saldo` |
| `__privado` | Name mangling (Python lo renombra) | `self.__clave` |

> **Importante**: En Python **no hay privacidad real**. Las convenciones son acuerdos entre programadores. `__privado` solo dificulta el acceso accidental.

### El problema: acceso directo inseguro

```python
class CuentaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo  # ¡Público! Cualquiera puede hacer: cuenta.saldo = -9999

cuenta = CuentaBancaria("Ana", 1000)
cuenta.saldo = -5000  # 😱 ¡Saldo negativo sin control!
print(cuenta.saldo)   # -5000
```

### La solución: `@property`

`@property` permite **controlar el acceso** a un atributo como si fuera lectura simple, pero ejecutando código detrás.

```python
class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self.__saldo = saldo_inicial  # Privado (name mangling)
    
    # ===== GETTER (lectura) =====
    @property
    def saldo(self):
        return self.__saldo
    
    # ===== SETTER (escritura controlada) =====
    @saldo.setter
    def saldo(self, valor):
        if valor < 0:
            raise ValueError("El saldo no puede ser negativo")
        self.__saldo = valor
    
    # ===== MÉTODOS DE NEGOCIO =====
    def depositar(self, monto):
        if monto <= 0:
            raise ValueError("El depósito debe ser positivo")
        self.__saldo += monto
        print(f"✅ Depósito de ${monto}. Saldo: ${self.__saldo}")
    
    def retirar(self, monto):
        if monto <= 0:
            raise ValueError("El retiro debe ser positivo")
        if monto > self.__saldo:
            raise ValueError("Fondos insuficientes")
        self.__saldo -= monto
        print(f"✅ Retiro de ${monto}. Saldo: ${self.__saldo}")

# Probemos:
cuenta = CuentaBancaria("Ana", 1000)

print(cuenta.saldo)      # 1000 — Lee via @property (getter)
cuenta.depositar(500)    # ✅ Depósito de $500. Saldo: $1500
cuenta.retirar(200)      # ✅ Retiro de $200. Saldo: $1300

# Protección automática:
try:
    cuenta.saldo = -100  # 🚫 ValueError: El saldo no puede ser negativo
except ValueError as e:
    print(f"Error: {e}")

try:
    cuenta.retirar(5000)  # 🚫 ValueError: Fondos insuficientes
except ValueError as e:
    print(f"Error: {e}")
```

**Salida:**
```
1000
✅ Depósito de $500. Saldo: $1500
✅ Retiro de $200. Saldo: $1300
Error: El saldo no puede ser negativo
Error: Fondos insuficientes
```

> **¿Por qué no usar solo métodos `get_saldo()` y `set_saldo()`?**
> Con `@property` la sintaxis es natural: `cuenta.saldo` (lectura) y `cuenta.saldo = 100` (escritura). El código que usa la clase no cambia, pero tú ganas control.

### Encapsulamiento con `_protegido` (convención suave)

A veces no necesitas `@property`, solo avisar "esto es interno":

```python
class Motor:
    def __init__(self):
        self._temperatura = 20  # Protegido: uso interno
        self._encendido = False
    
    def encender(self):
        self._encendido = True
        self._calentar()
    
    def _calentar(self):  # Método protegido
        self._temperatura += 30
        print(f"🔥 Motor calentando... {self._temperatura}°C")

motor = Motor()
motor.encender()        # OK: método público
# motor._calentar()    # ⚠️ Funciona, pero avisa: "uso interno"
```

<br>

## 3. Métodos especiales: `@classmethod` y `@staticmethod`

### `@classmethod` — Métodos de clase

Reciben la **clase** (`cls`) como primer argumento, no la instancia (`self`). Sirven para **constructores alternativos** (factory methods).

```python
class Estudiante:
    def __init__(self, nombre, legajo, curso):
        self.nombre = nombre
        self.legajo = legajo
        self.curso = curso
    
    # Constructor alternativo: crea desde string "Ana|L-001|6°A"
    @classmethod
    def desde_string(cls, data_string):
        nombre, legajo, curso = data_string.split("|")
        return cls(nombre, legajo, curso)  # cls = Estudiante
    
    # Constructor alternativo: crea desde diccionario (ej: JSON)
    @classmethod
    def desde_dict(cls, data):
        return cls(data["nombre"], data["legajo"], data["curso"])

# Uso normal:
e1 = Estudiante("Ana", "L-001", "6°A")

# Desde string (ej: archivo CSV):
e2 = Estudiante.desde_string("Bruno|L-002|5°B")

# Desde dict (ej: API JSON):
data_json = {"nombre": "Carla", "legajo": "L-003", "curso": "6°A"}
e3 = Estudiante.desde_dict(data_json)

print(e1.nombre, e1.legajo)  # Ana L-001
print(e2.nombre, e2.legajo)  # Bruno L-002
print(e3.nombre, e3.legajo)  # Carla L-003
```

> **Ventaja**: La lógica de parsing queda **dentro de la clase**, no esparcida por el código.

### `@staticmethod` — Métodos estáticos

No reciben `self` ni `cls`. Son **funciones que pertenecen al namespace de la clase** por organización lógica.

```python
class Matematicas:
    @staticmethod
    def sumar(a, b):
        return a + b
    
    @staticmethod
    def es_par(n):
        return n % 2 == 0

class UtilidadesTexto:
    @staticmethod
    def capitalizar(texto):
        return texto.strip().title()
    
    @staticmethod
    def contar_palabras(texto):
        return len(texto.split())

# Uso SIN instanciar:
print(Matematicas.sumar(5, 3))           # 8
print(Matematicas.es_par(10))            # True
print(UtilidadesTexto.capitalizar(" hola mundo "))  # "Hola Mundo"
```

**Cuándo usar cada uno:**

| Tipo | Recibe | Úsalo cuando... |
|------|--------|-----------------|
| Instancia (`def metodo(self)`) | `self` | Necesita datos del objeto |
| Clase (`@classmethod`) | `cls` | Crea instancias de forma alternativa |
| Estático (`@staticmethod`) | Nada | Es utilidad relacionada, no necesita datos |

<br>

## 4. Un ejemplo que une todo: `Persona` mejorada

```python
class Persona:
    def __init__(self, nombre, edad, email):
        self.nombre = nombre
        self._edad = edad          # Protegido
        self.__email = email       # Privado
    
    # ===== PROPERTIES =====
    @property
    def edad(self):
        return self._edad
    
    @edad.setter
    def edad(self, valor):
        if not 0 <= valor <= 120:
            raise ValueError("Edad inválida")
        self._edad = valor
    
    @property
    def email(self):
        return self.__email
    
    @email.setter
    def email(self, valor):
        if "@" not in valor:
            raise ValueError("Email inválido")
        self.__email = valor
    
    # ===== CLASSMETHOD =====
    @classmethod
    def desde_csv(cls, linea_csv):
        nombre, edad, email = linea_csv.strip().split(",")
        return cls(nombre, int(edad), email)
    
    # ===== STATICMETHOD =====
    @staticmethod
    def validar_email(email):
        return "@" in email and "." in email.split("@")[1]
    
    # ===== POLIMORFISMO: método para sobrescribir =====
    def describir(self):
        return f"{self.nombre}, {self.edad} años, {self.email}"


class Estudiante(Persona):
    def __init__(self, nombre, edad, email, legajo):
        super().__init__(nombre, edad, email)
        self.legajo = legajo
    
    def describir(self):  # Polimorfismo
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

# 2. Classmethod: desde CSV
est2 = Estudiante.desde_csv("Bruno,19,bruno@email.com")
prof2 = Profesor.desde_csv("Diana,38,diana@email.com,EMP-002")

# 3. Staticmethod: validación sin instanciar
print(Persona.validar_email("test@mail.com"))   # True
print(Persona.validar_email("invalido"))        # False

# 4. Polimorfismo: lista heterogénea
personas = [est, prof, est2, prof2]
for p in personas:
    print(p.describir())  # Cada uno su formato

# 5. Encapsulamiento: control via properties
est.edad = 21           # OK
# est.edad = 200        # 🚫 ValueError
print(f"Edad actualizada: {est.edad}")
```

<br>

## Resumen visual

```
┌─────────────────────────────────────────────────────────┐
│                    CLASE PERSONA                        │
├─────────────────────────────────────────────────────────┤
│  __init__(self, nombre, edad, email)                   │
│                                                         │
│  @property          → edad (getter/setter controlado)  │
│  @property          → email (getter/setter controlado) │
│                                                         │
│  @classmethod       → desde_csv(linea)                 │
│                                                         │
│  @staticmethod      → validar_email(email)             │
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

1. **Agregar `@property` a tu clase de la Clase 19**

   Toma `AlumnoBecado` o `AlumnoIntercambio` y protege al menos un atributo sensible (ej: `promedio`, `tipo_beca`, `pais_origen`) con `@property` y setter que valide.

2. **Crear un `@classmethod` constructor alternativo**

   Agrega a `Usuario` (clase 19) un método `desde_dict(cls, data)` que cree una instancia desde un diccionario. Prueba con:
   ```python
   data = {"nombre": "Eva", "email": "eva@mail.com", "documento": "99887766"}
   usuario = Usuario.desde_dict(data)
   ```

3. **Polimorfismo en acción: función genérica**

   Escribe una función `mostrar_todos(usuarios)` que reciba una lista mixta de `Estudiante`, `Profesor` y `Admin` (clase 19) y llame a `mostrar_info()` en cada uno. Verifica que cada uno muestra su info específica.

4. **Pregunta corta (responder en 2-3 líneas)**

   > ¿Cuál es la diferencia práctica entre `@classmethod` y `@staticmethod`? Dame un caso de uso real para cada uno.

<br>

o/