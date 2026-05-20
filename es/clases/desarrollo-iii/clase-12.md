---
layout: clase
title: "Clase 12: Módulos, librerías y frameworks"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# ¿Qué son los módulos y las librerías?
<br>

Cuando programamos, muchas veces necesitamos utilizar funcionalidades que no están disponibles en el lenguaje base. Por ejemplo, si queremos trabajar con fechas, necesitamos una librería que nos permita hacerlo.

En los lenguajes de programación modernos, es muy común utilizar código ya escrito para extender las funcionalidades del lenguaje. Esto se hace mediante módulos y librerías.

## Diferencias
<br>

- Los módulos son archivos que contienen código de Python.
- Las librerías son conjuntos de módulos.
- Los frameworks son conjuntos de módulos y librerías.

## Ejemplos
<br>

| Nombre         | Tipo      | Funcionalidad                           |
| -------------- | --------- | --------------------------------------- |
| `math`         | módulo    | Operaciones matemáticas                 |
| `random`       | módulo    | Generación de números aleatorios        |
| `os`           | módulo    | Interacción con el sistema operativo    |
| `sys`          | módulo    | Interacción con el intérprete de Python |
| `datetime`     | módulo    | Trabajo con fechas y horas              |
| `requests`     | librería  | Realización de peticiones HTTP          |
| `pandas`       | librería  | Manipulación de datos                   |
| `numpy`        | librería  | Cálculo numérico                        |
| `matplotlib`   | librería  | Visualización de datos                  |
| `scikit-learn` | librería  | Machine Learning                        |
| `pygame`       | librería  | Desarrollo de videojuegos               |
| `django`       | framework | Desarrollo web                          |
| `flask`        | framework | Desarrollo web                          |

<br>

# ¿Cómo se instalan las librerías?
<br>

Para instalar una librería, utilizamos el gestor de paquetes de Python, llamado `pip`.

Sintaxis:
```bash
pip install nombre_libreria
```
<br>

# ¿Cómo se utilizan los módulos y las librerías?
<br>

## Ejemplos
<br>

## Módulo `random`
<br>

```python
import random

# randint
print(random.randint(1, 10))  # Número aleatorio entre 1 y 10

# choice
print(random.choice(["a", "b", "c"]))  # Elección aleatoria

# shuffle
lista = [1, 2, 3, 4, 5]
random.shuffle(lista)
print(lista)

# sample
print(random.sample([1, 2, 3, 4, 5], 3))  # 3 números aleatorios

# random
print(random.random())  # Número aleatorio entre 0 y 1

```
<br>

Si solo queremos usar una funcion, podemos hacerlo de la siguiente manera:

```python
from random import randint

print(randint(1, 10))  # Número aleatorio entre 1 y 10
```
<br>

# Actividades
<br>

## 1. Eleccion al azar
<br>

Crear un programa que:

- Tenga una lista de estudiantes
- Seleccione uno al azar
- Muestre el resultado en pantalla
<br>

## 2. Dado
<br>

Crear un programa que:

- Simule el lanzamiento de un dado
- Muestre el resultado en pantalla
<br>

## 3. Investigue del módulo `math`
<br>

- ¿Qué funciones tiene?
- ¿Qué parámetros recibe?
- ¿Qué devuelve?
- ¿Para qué sirven?
