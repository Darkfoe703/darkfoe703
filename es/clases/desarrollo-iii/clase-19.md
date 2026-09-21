---
layout: clase
title: "Clase 19: POO - Herencia"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Herencia: Reutilizar y Extender Código

<br>

## ¿Qué es la herencia?

La **herencia** es un mecanismo que permite crear una nueva clase a partir de una ya existente. La clase nueva (llamada **hija** o **subclase**) obtiene automáticamente todos los atributos y métodos de la clase original (llamada **padre** o **superclase**).

> Piensa en la herencia como en la biología: un hijo hereda características de sus padres (color de ojos, altura), pero también tiene sus propias características únicas.

<br>

## ¿Para qué sirve?

1. **Evita duplicar código**: Si varias clases comparten comportamientos, los escribes una sola vez en la clase padre.
2. **Facilita el mantenimiento**: Un cambio en la clase padre se refleja en todas las hijas.
3. **Permite especializar**: Cada hija puede agregar o modificar lo que necesite.

<br>

## Sintaxis en Python

```python
class Padre:
    def __init__(self, atributo_comun):
        self.atributo_comun = atributo_comun
    
    def metodo_comun(self):
        print("Esto lo heredan todos")

class Hija(Padre):  # ← Los paréntesis indican herencia
    def __init__(self, atributo_comun, atributo_propio):
        super().__init__(atributo_comun)  # ← Llamamos al __init__ del padre
        self.atributo_propio = atributo_propio
    
    def metodo_propio(self):
        print("Esto solo lo tiene la hija")
```

<br>

## Entendiendo `super()` — La clave de la herencia

`super()` significa **"llama al método de la clase padre"**. Es la forma de decir: *"Antes de hacer mi cosa, deja que el padre haga la suya"*.

### Ejemplo paso a paso:

```python
class Vehiculo:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
        print(f"🚗 Vehículo creado: {marca} {modelo}")

class Auto(Vehiculo):
    def __init__(self, marca, modelo, cantidad_puertas):
        # 1. Primero, el padre se inicializa
        super().__init__(marca, modelo)
        # 2. Después, la hija agrega lo suyo
        self.cantidad_puertas = cantidad_puertas
        print(f"🚙 Auto creado con {cantidad_puertas} puertas")

# Probemos:
mi_auto = Auto("Toyota", "Corolla", 4)
```

**Salida:**
```
🚗 Vehículo creado: Toyota Corolla
🚙 Auto creado con 4 puertas
```

> **¿Por qué usar `super()` y no `Vehiculo.__init__(self, ...)`?**
> - `super()` es más limpio y funciona correctamente con herencia múltiple.
> - Si cambias el nombre de la clase padre, no tienes que buscar y reemplazar en todas las hijas.

<br>

## Ejemplo completo: Sistema de usuarios escolares

```python
# ===== CLASE PADRE =====
class Usuario:
    def __init__(self, nombre, email, documento):
        self.nombre = nombre
        self.email = email
        self.documento = documento
    
    def mostrar_info(self):
        print(f"👤 {self.nombre}")
        print(f"   Email: {self.email}")
        print(f   Documento: {self.documento}")
    
    def saludar(self):
        print(f"Hola, soy {self.nombre}")


# ===== CLASES HIJAS =====
class Estudiante(Usuario):
    def __init__(self, nombre, email, documento, legajo, curso):
        super().__init__(nombre, email, documento)  # Inicializa lo común
        self.legajo = legajo
        self.curso = curso
        self.materias = []  # Lista vacía para inscribir materias
    
    def inscribir_materia(self, materia):
        self.materias.append(materia)
        print(f"✅ {self.nombre} inscrito en {materia}")
    
    def mostrar_info(self):  # SOBRESCRITURA (override)
        super().mostrar_info()  # Primero muestra lo del padre
        print(f"   Legajo: {self.legajo}")
        print(f"   Curso: {self.curso}")
        print(f"   Materias: {', '.join(self.materias) if self.materias else 'Ninguna'}")


class Profesor(Usuario):
    def __init__(self, nombre, email, documento, empleado_id, especialidad):
        super().__init__(nombre, email, documento)
        self.empleado_id = empleado_id
        self.especialidad = especialidad
        self.materias_dictadas = []
    
    def asignar_materia(self, materia):
        self.materias_dictadas.append(materia)
        print(f"📚 {self.nombre} dictará {materia}")
    
    def mostrar_info(self):  # SOBRESCRITURA
        super().mostrar_info()
        print(f"   Empleado ID: {self.empleado_id}")
        print(f"   Especialidad: {self.especialidad}")
        print(f"   Materias: {', '.join(self.materias_dictadas) if self.materias_dictadas else 'Ninguna'}")


class Admin(Usuario):
    def __init__(self, nombre, email, documento, nivel_acceso):
        super().__init__(nombre, email, documento)
        self.nivel_acceso = nivel_acceso  # 'basico', 'medio', 'total'
    
    def puede_borrar_usuarios(self):
        return self.nivel_acceso == 'total'
    
    def mostrar_info(self):
        super().mostrar_info()
        print(f"   Nivel de acceso: {self.nivel_acceso}")
```

<br>

## Probando el sistema

```python
# Creamos objetos de cada tipo
estudiante = Estudiante("Ana García", "ana@email.com", "12345678", "L-2024-001", "6° Año")
profesor = Profesor("Carlos López", "carlos@email.com", "87654321", "EMP-001", "Matemáticas")
admin = Admin("María Admin", "maria@email.com", "11223344", "total")

print("=== ESTUDIANTE ===")
estudiante.mostrar_info()
estudiante.inscribir_materia("Matemáticas")
estudiante.inscribir_materia("Historia")

print("\n=== PROFESOR ===")
profesor.mostrar_info()
profesor.asignar_materia("Matemáticas")
profesor.asignar_materia("Física")

print("\n=== ADMIN ===")
admin.mostrar_info()
print(f"¿Puede borrar usuarios? {admin.puede_borrar_usuarios()}")
```

**Salida:**
```
=== ESTUDIANTE ===
👤 Ana García
   Email: ana@email.com
   Documento: 12345678
   Legajo: L-2024-001
   Curso: 6° Año
   Materias: Ninguna
✅ Ana García inscrito en Matemáticas
✅ Ana García inscrito en Historia

=== PROFESOR ===
👤 Carlos López
   Email: carlos@email.com
   Documento: 87654321
   Empleado ID: EMP-001
   Especialidad: Matemáticas
   Materias: Ninguna
📚 Carlos López dictará Matemáticas
📚 Carlos López dictará Física

=== ADMIN ===
👤 María Admin
   Email: maria@email.com
   Documento: 11223344
   Nivel de acceso: total
¿Puede borrar usuarios? True
```

<br>

## Sobrescritura de métodos (Override)

Cuando una clase hija define un método **con el mismo nombre** que la clase padre, **reemplaza** el comportamiento del padre. Esto se llama **sobrescritura**.

### Reglas de oro:
1. **Siempre usa `super().metodo()`** si quieres mantener lo que hace el padre Y agregar más.
2. **No uses `super()`** si quieres reemplazar completamente el comportamiento.

```python
class Animal:
    def hablar(self):
        print("El animal hace un sonido")

class Perro(Animal):
    def hablar(self):  # Sobrescritura COMPLETA (sin super)
        print("🐕 Guau guau")

class Gato(Animal):
    def hablar(self):  # Sobrescritura EXTENDIDA (con super)
        super().hablar()  # Primero lo del padre
        print("🐱 Miau")

perro = Perro()
gato = Gato()

perro.hablar()  # Solo: "🐕 Guau guau"
gato.hablar()   # Primero: "El animal hace un sonido", luego: "🐱 Miau"
```

<br>

## Herencia múltiple (breve mención)

Python permite heredar de **varias clases a la vez**. Se usa poco, pero es útil para **mixins** (clases que agregan una funcionalidad específica).

```python
class Volador:
    def volar(self):
        print("🕊️ Volando...")

class Nadador:
    def nadar(self):
        print("🏊 Nadando...")

class Pato(Volador, Nadador):  # Hereda de AMBOS
    def graznar(self):
        print("🦆 Cuac cuac")

pato = Pato()
pato.volar()   # De Volador
pato.nadar()   # De Nadador
pato.graznar() # Propio
```

> **Consejo**: Prefiere **composición** (tener objetos dentro de otros) antes que herencia múltiple. Es más claro y evita problemas complejos.

<br>

## Cuándo usar herencia vs composición

| Situación | Qué usar |
|-----------|----------|
| "Un Auto **ES UN** Vehículo" | ✅ Herencia |
| "Un Auto **TIENE UN** Motor" | ✅ Composición |
| "Un Estudiante **ES UN** Usuario" | ✅ Herencia |
| "Un Estudiante **TIENE UNA** Mochila" | ✅ Composición |

> **Regla práctica**: Si la relación es "ES UN" (es una especialización), usa herencia. Si es "TIENE UN" (es una parte), usa composición.

<br>

## Resumen de la clase

| Concepto | Qué hace |
|----------|----------|
| `class Hija(Padre)` | La hija hereda todo del padre |
| `super().__init__(...)` | Llama al constructor del padre |
| `super().metodo()` | Llama a un método del padre |
| **Sobrescritura** | La hija redefine un método del padre |
| **Herencia múltiple** | Una clase hereda de varias (usar con cuidado) |

<br>

## Actividades

<br>

1. **Extender la clase `Alumno` de la clase 18**

   Crea dos subclases: `AlumnoBecado` y `AlumnoIntercambio`.

   **Requisitos para ambas:**
   - Usar `super().__init__()` para inicializar atributos heredados
   - Agregar al menos **2 atributos propios** cada una
   - Sobrescribir `mostrar_info()` usando `super().mostrar_info()` y agregando lo propio
   - Agregar al menos **1 método propio** cada una

   **Ideas de atributos:**
   - `AlumnoBecado`: `tipo_beca` (completa/parcial), `requisitos_mantenimiento`
   - `AlumnoIntercambio`: `pais_origen`, `duracion_meses`, `idioma_nativo`

2. **Probar polimorfismo básico**

   Crea una lista con 3 objetos: un `Alumno`, un `AlumnoBecado` y un `AlumnoIntercambio`. Recorre la lista y llama a `mostrar_info()` en cada uno. Observa cómo cada uno muestra su información específica.

3. **Pregunta reflexiva (escribir en comentarios)**

   > ¿Qué pasaría si `AlumnoBecado` heredara de `AlumnoIntercambio` en lugar de `Alumno`? ¿Tiene sentido? ¿Por qué sí o por qué no?

4. **Desafío opcional: Mixin `Serializable`**

   Crea una clase `Serializable` con un método `to_dict()` que devuelva un diccionario con los atributos del objeto. Haz que `Alumno` herede de `Serializable` (herencia múltiple) y prueba llamar a `alumno.to_dict()`.

<br>

o/