---
layout: clase
title: "Clase 13: Manejo de excepciones"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Manejo de excepciones
<br>
Cuando programamos, muchas veces nos encontramos con situaciones inesperadas que pueden hacer que nuestro programa falle. Por ejemplo, si intentamos dividir un número por cero, el programa fallará.

¿Cómo podemos manejar estas situaciones para que nuestro programa no falle? (o al menos lo haga de forma controlada)
<br>

## ¿Qué es una excepción?
<br>

Una excepción es un evento que interrumpe el flujo normal de un programa.
<br>

## Ejemplos
<br>

| Excepción | Descripción |
| --------- | ----------- |
| `ZeroDivisionError` | División por cero |
| `NameError` | Variable no definida |
| `TypeError` | Tipo de dato incorrecto |
| `IndexError` | Índice fuera de rango |
| `KeyError` | Clave no encontrada |
| `ValueError` | Valor no válido |
| `FileNotFoundError` | Archivo no encontrado |
| `IOError` | Error de entrada/salida |
| `KeyboardInterrupt` | Interrupción por teclado |

## ¿Cómo manejar excepciones?
<br>

Para manejar excepciones, utilizamos el bloque `try-except`.
<br>

## Sintaxis
<br>

```python
try:
    # Código que puede generar una excepción
except Excepcion:
    # Código que se ejecuta si ocurre la excepción
```

## Ejemplos
<br>

```python
try:
    numero = int(input("Ingrese un numero: "))
    resultado = 10 / numero
    print("El resultado es: ", resultado)
except ZeroDivisionError:
    print("No se puede dividir por cero")
except ValueError:
    print("Debe ingresar un número")
```
<br>

## Capturar todas las excepciones
<br>

```python
try:
    numero = int(input("Ingrese un numero: "))
    resultado = 10 / numero
    print("El resultado es: ", resultado)
except Exception as e:
    print("Ocurrió un error: ", e)
```

## Bloque else
<br>

```python
try:
    numero = int(input("Ingrese un numero: "))
    resultado = 10 / numero
    print("El resultado es: ", resultado)
except Exception as e:
    print("Ocurrió un error: ", e)
else:
    print("No ocurrió ningún error")
```

## Bloque finally
<br>

```python
try:
    numero = int(input("Ingrese un numero: "))
    resultado = 10 / numero
    print("El resultado es: ", resultado)
except Exception as e:
    print("Ocurrió un error: ", e)
finally:
    print("Fin del programa")
```
<br>

# Actividades
<br>

## 1. División por cero
<br>

Crear un programa que:
<br>

- Pida al usuario que ingrese dos números
- Divida el primer número por el segundo
- Muestre el resultado en pantalla
- Maneje la excepción `ZeroDivisionError`

<br>

## 2. Suma de números
<br>

Crear un programa que:

- Pida al usuario que ingrese dos números
- Sume los números
- Muestre el resultado en pantalla
- Maneje la excepción `ValueError`

<br>

