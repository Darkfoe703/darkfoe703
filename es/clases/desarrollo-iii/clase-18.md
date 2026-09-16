---
layout: clase
title: "Clase 18: POO - Clases y Objetos"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# ¿Cómo modelo una clase en Python?
<br>

Usamos la palabra reservada `class`.

<br>

```python
class Alumno:
    pass
```

<br>

Esto define una clase llamada `Alumno`.
> Notese que para definir las clases tengo las mismas reglas que para las variables, pero por convención se escriben en mayuscula y estilo `CamelCase`.
<br>

## Agregando los atributos
<br>

Los atributos son las propiedades que tiene un objeto.
<br>

```python
class Alumno:
    def __init__(self, nombre, edad, curso, promedio):
        self.nombre = nombre
        self.edad = edad
        self.curso = curso
        self.promedio = promedio
```
<br>

Esto define una clase llamada `Alumno` con cuatro atributos: `nombre`, `edad`, `curso` y `promedio`.
<br>

## Instanciando un objeto
<br>

Para crear un objeto a partir de una clase, usamos la siguiente sintaxis:
<br>

```python
alumno1 = Alumno("Juan", 20, "6º2º", 8.5)
```
<br>

Si yo quiero acceder a los atributos de un objeto, hago lo siguiente:
<br>

```python
print(alumno1.nombre)
print(alumno1.edad)
print(alumno1.curso)
print(alumno1.promedio)
```
<br>

## Agregando métodos
<br>

Los métodos son las funciones que tiene un objeto.
<br>

```python
class Alumno:
    def __init__(self, nombre, edad, curso, promedio):
        self.nombre = nombre
        self.edad = edad
        self.curso = curso
        self.promedio = promedio

    def mostrar_info(self):
        print(f"Nombre: {self.nombre}")
        print(f"Edad: {self.edad}")
        print(f"Curso: {self.curso}")
        print(f"Promedio: {self.promedio}")
    
    def aprobar(self):
        if self.promedio >= 6:
            print(f"{self.nombre} aprobó")
        else:
            print(f"{self.nombre} no aprobó")
```
<br>

### ¿Cómo llamo a los métodos?
<br>

```python
alumno1.mostrar_info()
alumno1.aprobar()
```
<br>

> ¿En qué se diferencia este metodo de una función?
<br>

La diferencia es que los métodos tienen acceso a los atributos del objeto.

### ¿Qué es `__init__`?
<br>

El método `__init__` es un método especial que se ejecuta cuando se crea un objeto a partir de una clase.
<br>

Es el constructor de la clase.
<br>

### ¿Qué es `self`?
<br>

`self` es una referencia al objeto que se está creando.
<br>

## Actividades
<br>

1. Elegí una de las clases que diseñaste en la actividad anterior y creala en python.
<br>

La clase deberá tener:
<br>

- al menos 4 atributos
- al menos 3 métodos
<br>

2. A partir de la clase creada, generar al menos 3 objetos diferentes.
<br>

3. Implementá los 3 métodos que definiste para tu clase.
<br>

- Al menos uno de ellos deberá utilizar información almacenada en los atributos del objeto.
