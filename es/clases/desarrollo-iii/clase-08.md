---
layout: clase
title: "Clase 08: Sets y Diccionarios"
excerpt: ""
lang: es
---

# Sets
<br>

Es una colección de elementos **desordenados** y **mutables** de carácter **ÚNICO**, es decir, no permite elementos repetidos.

```python
# Set

set1 = {1, 2, 3, 4, 5, 6, "marco"}
print(set1) # {1, 2, 3, 4, 5, 6, 'marco'}
print(set1) # {'marco', 1, 2, 4, 3, 5, 6}
```
<br>

## Puedo convertir una lista a un set. Si hay valores duplicados se eliminarán

```python
# Lista
lista = [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
print(lista) # [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]

# Convertir lista a set
set1 = set(lista)
print(set1) # {1, 2, 3, 4, 5, 6}
```
<br>

## Agregar elementos:

```python
# Set

set1 = {1, 2, 3, 4, 5, 6, "marco"}
set1.add("Ana")
print(set1) # {1, 2, 3, 4, 5, 6, 'marco', 'Ana'}
```
<br>

## Eliminar elementos: remove() y discard()

```python
# Set

set1 = {1, 2, 3, 4, 5, 6, "marco", "Ana"}
set1.remove("Ana")
# Si el elemento no existe, se produce un error
print(set1) # {1, 2, 3, 4, 5, 6, 'marco'}

set1.discard("Ana")
# Si el elemento no existe, no se produce un error
print(set1) # {1, 2, 3, 4, 5, 6, 'marco'}
```
<br>

## Operaciones con sets

```python
# Set

set1 = {1, 2, 3, 4, 5, 6}
set2 = {"marco", "Ana", 2}

# Union entre 2 sets (se eliminan valores repetidos)
# Se puede escribir: set1 | set2
print(set1.union(set2)) # {1, 2, 3, 4, 5, 6, 'marco', 'Ana'}

# Intersección entre 2 sets 
# solo persisten los valores que comparten ambos sets
# Se puede escribir: set1 & set2
set3 = set1.intersection(set2)
print(set3) # {2}

# Diferencia entre 2 set
# devuelve los valores dentro del primer set que no se repitan en el segundo.
# Se puede escribir: set1 - set2
set4 = set1.difference(set2)
print(set4) # {1, 2, 3, 4, 5, 6, 'marco', 'Ana'}

# Diferencia simétrica entre 2 set
# devuelve los valores que no se repitan en ambos sets
# Se puede escribir: set1 ^ set2
print(set1.symmetric_difference(set2)) # {1, 3, 4, 5, 6, 'marco', 'Ana'}
```
<br>

# Diccionarios

<br>

Es una colección de elementos ordenados por pares **(clave-valor)**. No tiene un orden fijo.
Las claves son **únicas** e **inmutables**.
Los valores pueden ser de cualquier tipo de dato.

```python
# Diccionario
diccionario = {"nombre": "Marco", "edad": 25, "ciudad": "Puerto Madryn"}
print(diccionario) # {"nombre": "Marco", "edad": 25, "ciudad": "Puerto Madryn"}

automovil = {
    "marca": "Toyota",
    "modelo": "Corolla",
    "año": 2022,
    "color": "Blanco",
    "precio": 25000,
    "es_nuevo": True
}

print(automovil)
```
<br>

## Acceso a elementos
<br>

```python
# Diccionario
diccionario = {"nombre": "Marco", "edad": 25, "ciudad": "Puerto Madryn"}

print(diccionario["nombre"])
print(diccionario["edad"])
print(diccionario["ciudad"])
```
<br>

## Agregar elementos
<br>

```python
# Diccionario
diccionario = {"nombre": "Marco", "edad": 25, "ciudad": "Puerto Madryn"}

diccionario["apellido"] = "Romero"
print(diccionario)
```
<br>

## Eliminar elementos
<br>

```python
# Diccionario
diccionario = {"nombre": "Marco", "edad": 25, "ciudad": "Puerto Madryn"}

# pop() elimina un elemento por clave
diccionario.pop("edad")
print(diccionario)

# del() elimina un elemento por clave
diccionario.del("ciudad")
print(diccionario)
```
<br>

## Actualizar elementos
<br>

```python
# Diccionario
diccionario = {"nombre": "Marco", "edad": 25, "ciudad": "Puerto Madryn"}

diccionario["edad"] = 26
print(diccionario)
```
<br>

## Metodos
<br>

```python
# Diccionario
diccionario = {"nombre": "Marco", "edad": 25, "ciudad": "Puerto Madryn"}

# keys() devuelve las claves del diccionario
print(diccionario.keys())

# values() devuelve los valores del diccionario
print(diccionario.values())

# items() devuelve las claves y valores del diccionario
print(diccionario.items())

# get() devuelve el valor de una clave si existe,
# si no devuelve None, no un error
print(diccionario.get("nombre"))

# update() actualiza un elemento por clave
diccionario.update({"edad": 26})
print(diccionario)
```
<br>

# Actividades
<br>

## 1. Eliminar duplicados
<br>

Dada la lista:

`numeros = [1, 2, 2, 3, 4, 4, 5]`

- Convertirla en un set
- Mostrar el resultado
- Indicar cuántos elementos únicos hay

<br>

## 2. Operaciones con sets

<br>

Dada las listas `grupo_a = [1, 2, 3, 4]` y `grupo_b = [3, 4, 5, 6]`

- Convertir ambas a sets
- Mostrar:
    - Unión
    - Intersección
    - Diferencia (A - B)

<br>

## 3. Diccionarios: acceso y modificación
<br>

Dado el diccionario:
```python
alumno = {
    "nombre": "Juan",
    "edad": 16,
    "nota": 7
}
```

- Mostrar el nombre
- Cambiar la nota a 8
- Agregar una nueva clave: `"curso": "5°"`
- Mostrar el diccionario completo

<br>

##  4. Diccionarios y listas
<br>

Crear un diccionario que represente un alumno con:

- nombre
- una lista de 3 notas

Luego:
- Mostrar el nombre
- Mostrar la lista de notas
- Calcular el promedio de las notas
- Mostrar el promedio