---
layout: clase
title: "Clase 02: Conversión de Tipos y Operadores"
excerpt: ""
lang: es
---

# Apunte: Conversión de Tipos y Operadores en Python


## 1. Conversión de Tipos (Type Casting)

En Python, los datos pueden tener distintos **tipos**.

Los más comunes son:

| Tipo | Descripción | Ejemplo |
|-----|-------------|--------|
| `int` | Número entero | 10 |
| `float` | Número con decimales | 3.14 |
| `str` | Texto | "Hola" |
| `bool` | Verdadero o falso | True / False |

A veces necesitamos **convertir un tipo de dato en otro**.  
A esto se lo llama **conversión de tipos** o **type casting**.

---

## Convertir a entero (int)

Convierte un valor a número entero.

```python
edad = int("18")

print(edad)
print(type(edad))
```

**Resultado:**
```
18
<class 'int'>
```

---

## Convertir a texto (str)

Convierte un valor a texto.

```python
numero = 123
texto = str(numero)

print(texto)
print(type(texto))
```

**Resultado:**
```
123
<class 'str'>
```

---


## 2. Operadores

Los **operadores** son símbolos que realizan operaciones con valores.

### Operadores Aritméticos

| Operador | Descripción | Ejemplo |
|---------|-------------|--------|
| `+` | Suma | `5 + 3` |
| `-` | Resta | `5 - 3` |
| `*` | Multiplicación | `5 * 3` |
| `/` | División | `5 / 3` |
| `//` | División entera | `5 // 3` |
| `%` | Módulo (resto) | `5 % 3` |
| `**` | Potencia | `5 ** 3` |

**Ejemplos:**

```python
print(5 + 3)   # 8
print(5 - 3)   # 2
print(5 * 3)   # 15
print(5 / 3)   # 1.666...
print(5 // 3)  # 1
print(5 % 3)   # 2
print(5 ** 3)  # 125
```

---

### Operadores de Comparación

| Operador | Descripción | Ejemplo |
|---------|-------------|--------|
| `==` | Igual a | `5 == 3` |
| `!=` | Distinto de | `5 != 3` |
| `>` | Mayor que | `5 > 3` |
| `<` | Menor que | `5 < 3` |
| `>=` | Mayor o igual que | `5 >= 3` |
| `<=` | Menor o igual que | `5 <= 3` |

**Ejemplos:**

```python
print(5 == 3)  # False
print(5 != 3)  # True
print(5 > 3)   # True
print(5 < 3)   # False
print(5 >= 3)  # True
print(5 <= 3)  # False
```

---

### Operadores Lógicos

| Operador | Descripción | Ejemplo |
|---------|-------------|--------|
| `and` | Y lógico | `True and False` |
| `or` | O lógico | `True or False` |
| `not` | Negación | `not True` |

**Ejemplos:**

```python
print(True and False)  # False
print(True or False)   # True
print(not True)        # False
```

---
## ACTIVIDADES

### 1 — Comparación de números

Crear un programa que:

Pida al usuario dos números.

Convierta los valores ingresados a enteros.

Muestre en pantalla:

si son iguales

si el primero es mayor

si el segundo es mayor

### 2 — Número par o impar

Crear un programa que:

Pida al usuario un número.

Convierta el valor a entero.

Determine si el número es par o impar.

Recordar:
Un número es par si el resto de la división por 2 es 0.