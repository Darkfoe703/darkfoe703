---
layout: clase
title: "Clase 05: Listas"
excerpt: ""
lang: es
---

# Clase 05: Listas

<br>

## 1. ¿Qué es una lista?

Una **lista** es una colección **ordenada** y **mutable** (pueden modificarse). Permite valores duplicados y mezcla de tipos de datos.

Ejemplo:

```python
numeros = [1, 2, 3, 4, 5]
```
También pueden guardar distintos tipos de datos:

```python
mixta = [1, "hola", 3.14, True]
```

<br>

## 2. ¿Cómo se crea una lista?

Se crea utilizando corchetes `[]` y separando los elementos por comas.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
```

<br>

## 3. ¿Cómo se accede a los elementos de una lista?

Se accede utilizando corchetes `[]` y el índice del elemento.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
print(lista[0])  # 1
print(lista[1])  # 2
print(lista[2])  # 3
print(lista[3])  # 4
print(lista[4])  # 5
```

<br>

## 4. ¿Cómo se modifica un elemento de una lista?

Se accede al elemento y se le asigna un nuevo valor.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
lista[0] = 10
print(lista)  # [10, 2, 3, 4, 5]
```

<br>

## 5. ¿Cómo se agrega un elemento a una lista?

Se utiliza el método `append()`.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
lista.append(6)
print(lista)  # [1, 2, 3, 4, 5, 6]
```

<br>

## 6. ¿Cómo se elimina un elemento de una lista?

Se utiliza el método `remove()`. Elimina la primera ocurrencia del valor especificado.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
lista.remove(3)
print(lista)  # [1, 2, 4, 5]
```

## 7. ¿Cómo se elimina un elemento de una lista por su índice?

Se utiliza el método `pop()`.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
lista.pop(3)
print(lista)  # [1, 2, 4, 5]
```

<br>

## 8. ¿Cómo se obtiene la longitud de una lista?

Se utiliza la función `len()`.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
print(len(lista))  # 5
```

<br>

## 9. ¿Cómo se ordena una lista?

Se utiliza el método `sort()`.

Ejemplo:

```python
lista = [5, 2, 8, 1, 9]
lista.sort()
print(lista)  # [1, 2, 5, 8, 9]
```

<br>

## 10. ¿Cómo se invierte una lista?

Se utiliza el método `reverse()`.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
lista.reverse()
print(lista)  # [5, 4, 3, 2, 1]
```

<br>

## 11. ¿Cómo se copia una lista?

Se utiliza el método `copy()`.

Ejemplo:

```python
lista = [1, 2, 3, 4, 5]
copia = lista.copy()
print(copia)  # [1, 2, 3, 4, 5]
```

<br>

## Tabla resumen de operaciones básicas

| Operación | Descripción | Ejemplo |
| --- | --- | --- |
| `len(lista)` | Obtiene la longitud de la lista | `len([1, 2, 3])` da `3` |
| `lista.append(x)` | Agrega un elemento al final | `[1, 2].append(3)` da `[1, 2, 3]` |
| `lista.remove(x)` | Elimina la primera ocurrencia de `x` | `[1, 2, 3, 2].remove(2)` da `[1, 3, 2]` |
| `lista.pop(i)` | Elimina el elemento en el índice `i` | `[1, 2, 3].pop(1)` da `[1, 3]` |
| `lista.sort()` | Ordena la lista | `[3, 1, 2].sort()` da `[1, 2, 3]` |
| `lista.reverse()` | Invierte la lista | `[1, 2, 3].reverse()` da `[3, 2, 1]` |
| `lista.copy()` | Copia la lista | `[1, 2, 3].copy()` da `[1, 2, 3]` |

<br>

# Actividades

<br>

## 1. Crear y modificar una lista

Crear una lista con los siguientes elementos:

```
["rojo", "verde", "azul"]
```
- Mostrar el primer elemento
- Cambiar "verde" por "amarillo"
- Mostrar la lista completa

<br>

## 2. Agregar y eliminar elementos

Dada la lista:

```
[10, 20, 30]
```
Realizar las siguientes operaciones:

- Agregar el número 40 al final
- Eliminar el número 20
- Eliminar el último elemento
- Mostrar la lista final

<br>

## 3. Consultas

Dada la lista:

```
["Juan", "Ana", "Pedro", "Lucia"]
```
Realizar:

- Mostrar la cantidad de elementos
- Verificar si "Ana" está en la lista
- Verificar si "Carlos" está en la lista
- Mostrar el último elemento
