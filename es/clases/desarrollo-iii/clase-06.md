---
layout: clase
title: "Clase 06: Más sobre listas"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Clase 06: OPeraciones con listas

<br>

## 1. Sumar listas

Se puede sumar listas utilizando el operador `+`.

Esto genera una **nueva lista** con los elementos de ambas listas.

Ejemplo:

```python
lista1 = [1, 2, 3]
lista2 = [4, 5, 6]
lista3 = lista1 + lista2
print(lista3)  # [1, 2, 3, 4, 5, 6]
```
<br>

## 2. Extender listas

Se puede extender una lista utilizando el método `extend()`. 

Esto modifica la lista original.

Ejemplo:

```python
lista1 = [1, 2, 3]
lista2 = [4, 5, 6]

lista1.extend(lista2)

print(lista1)  # [1, 2, 3, 4, 5, 6]
```
<br>

## 3. Copiar listas

Se puede copiar una lista utilizando el método `copy()`. 

Esto genera una **nueva lista** con los elementos de la lista original.

Ejemplo:

```python
lista1 = [1, 2, 3]
lista2 = lista1.copy()
print(lista2)  # [1, 2, 3]
```
<br>

## 4. Recorrer listas con for

Se puede recorrer una lista utilizando un bucle `for`. 

Ejemplo:

```python
lista = [1, 2, 3]
for i in lista:
    print(i)
```
<br>

## 5. Ver dirección en memoria

Se puede ver la dirección en memoria de una lista utilizando la función `id()`.

Ejemplo:

```python
lista1 = [1, 2, 3]
lista2 = lista1.copy()
print(id(lista1))
print(id(lista2))
```
<br>

## 6. Selección de elementos

Por índice:

```python
lista = [1, 2, 3]
print(lista[0])  # 1
```

Por rango:

```python
lista = [1, 2, 3, 4, 5]
print(lista[1:3])  # [2, 3]
```

Especiales:

```python
lista = [1, 2, 3, 4, 5]
print(lista[-1])  # 5
print(lista[-2])  # 4
```

<br>

# Actividades
<br>

## 1. Índices y acceso a elementos

Dada la lista:
`numeros = [10, 20, 30, 40, 50]`

- Mostrar el primer elemento
- Mostrar el último elemento
- Mostrar el tercer elemento
<br>

## 2. Rangos (slicing)

Dada la lista:
`letras = ["a", "b", "c", "d", "e", "f"]`

- Mostrar los primeros 3 elementos
- Mostrar los elementos desde la posición 2 hasta la 4
- Mostrar los últimos 2 elementos
<br>

## 3. Sumas y extender listas

Dadas las listas:
`lista1 = [1, 2, 3]`
`lista2 = [4, 5, 6]`

- Crear una nueva lista que sea la suma de ambas
- Usar extend() para agregar los elementos de lista2 a lista1
- Mostrar ambas listas
<br>

## 4. Copia de listas y memoria

Dada la lista:
`original = [100, 200, 300]`

- Crear una copia de la lista
- Mostrar la dirección en memoria de ambas listas
- Agregar un elemento a la copia
- Mostrar ambas listas