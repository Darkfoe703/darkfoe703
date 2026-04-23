---
layout: clase
title: "Clase 07: Tuplas"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Tuplas
<br>

## 1. ¿Qué es una tupla?
<br>

Es una colección de elementos **ordenadas** e **inmutables**. Puedo definirlas usando paréntesis `()` o sin ellos.

```python
# Tupla
tupla = (1, 2, 3, "Marco", True)

print(tupla)
print(type(tupla))
```
<br>

## 2. Acceso a elementos
<br>
Se puede acceder a los elementos de una tupla utilizando índices.

```python
# Tupla
tupla = (1, 2, 3, "Marco", True)

print(tupla[0])  # 1
print(tupla[1])  # 2
print(tupla[2])  # 3
print(tupla[3])  # Marco
print(tupla[4])  # True
```
<br>

Se puede acceder a un rango de elementos de una tupla utilizando slicing.

```python
# Tupla
tupla = (1, 2, 3, "Marco", True)

print(tupla[0:2])  # (1, 2)
print(tupla[2:4])  # (3, "Marco")
print(tupla[4:5])  # (True,)
```
<br>

## 3. Inmutabilidad
<br>
Las tuplas son inmutables, lo que significa que no se pueden modificar.

```python
# Tupla
tupla = (1, 2, 3, "Marco", True)

tupla[0] = 10
# TypeError: 'tuple' object does not support item assignment
```
<br>

## 4. Métodos de las tuplas
<br>
Las tuplas tienen los siguientes métodos:

```python
# Tupla
tupla = (1, 2, 3, "Marco", True)

print(tupla.count(1))  # 1
# count() cuenta las veces que aparece un elemento

print(tupla.index("Marco"))  # 3
# index() devuelve el índice del elemento
```
<br>

## 5. Desempaquetado de tuplas
<br>
Se puede desempaquetar una tupla en variables.

```python
# Tupla
tupla = (1, 2, 3, "Marco", True)

variable1, variable2, variable3, variable4, variable5 = tupla

print(variable1)
print(variable2)
print(variable3)
print(variable4)
print(variable5)
```
<br>

Desempaquetado con asterisco:

```python
# Tupla
tupla = (1, 2, 3, "Marco", True)

primero, *medio, ultimo = tupla

print(primero)
print(medio)
print(ultimo)
```

<br>

## 6. Otras operaciones con tuplas
<br>

```python
# Tupla
tupla = (1, 2, 3)

print(len(tupla))  # 3
print(sum(tupla))  # 6
print(min(tupla))  # 1
print(max(tupla))  # 3
```
<br>

# Actividades
<br>

## 1. Recorrido de una tupla
<br>

- Cree una tupla con 5 marcas de autos
- Recorra la tupla y muestrre cada marca
- Muestre la cantidad de elementos de la tupla

<br>

## 2. Acceso y metodos
<br>

Dada la tupla:
`numeros = (10, 20, 30, 20, 40)`

- Mostrar el primer elemento
- Mostrar el último elemento
- Mostrar la cantidad de elementos
- Mostrar la cantidad de veces que aparece el número 20
- Mostrar el índice del número 30

<br>

## 3. Desempaquetado de tuplas
<br>

- Cree una tupla con 5 elementos
- Desempaquete la tupla en variables
- Muestre cada variable

<br>

## 4. ¿Lista o tupla?
<br>

En la escuela se pide guardar los datos personales de los estudiantes y sus notas.

- ¿Qué estructura de datos usarías para guardar los datos personales de los estudiantes?
- ¿Qué estructura de datos usarías para guardar las notas de los estudiantes?
- ¿Por qué usarías esas estructuras de datos?
- Mostrar con ejemplos
