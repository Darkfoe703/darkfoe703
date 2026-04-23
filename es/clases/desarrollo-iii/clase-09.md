---
layout: clase
title: "Clase 09: Funciones"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Funciones
<br>

Es un bloque de código que realiza una tarea específica y puede ser reutilizada.
Está intimamente relacionada con el concepto de algoritmo y modularidad. Idealmente una función debe hacer una sola cosa y hacerla bien.
¿Qué debo tener en cuanta al definir una función?
Siempre debe tener un nombre (debe ser único, y bajo las mismas reglas que una variable) y un cuerpo.
Los parámetros son opcionales.

## Algoritmo
<br>

Es un conjunto de instrucciones ordenadas y finitas que permiten resolver un problema o realizar una tarea.
Simpre que recibe las mismas entradas, produce las mismas salidas.

## Modularidad
<br>

Es la capacidad de dividir un programa en módulos más pequeños y manejables.

## Ejemplo
<br>

```python
# Función
def saludar(): # nombre de la función, sin parámetros
    print("Hola") # cuerpo de la función

saludar() # llamada a la función
```
<br>

## Parámetros y argumentos
<br>
Los parámetros son variables que se definen en la función y que reciben valores cuando se llama a la función.
Los argumentos son los valores que se pasan a la función cuando se llama a la función.

```python
# Función con parámetros
def saludar(nombre): # nombre es el parámetro
    print("Hola", nombre)

saludar("Marco") # "Marco" es el argumento
```
<br>

## Return y sus valores
<br>

La sentencia return tiene dos propósitos:

1. Terminar la ejecución de la función
2. Devolver un valor

Si no se especifica un valor de retorno, la función devuelve None.

```python
# Función con return
def sumar(a, b):
    return a + b

resultado = sumar(1, 2)
print(resultado)
```
<br>

# Actividades
<br>

## 1. DRY y KISS
<br>

Investigue y explique con sus propias palabras los conceptos de DRY y KISS, y cómo se relacionan con la programación funcional.

## 2. Función de máximo
<br>

Crear una función llamada `mayor_que` la cual:

- Reciba dos números como parámetros
- Devuelva el número mayor

Luego usar la función e imprimir el resultado.

<br>

## 3. Función con lista
<br>

Crear una función llamada `contar_elementos` que:

- Reciba una lista como parámetro
- Devuelva la cantidad de elementos de la lista

Luego:

- Crear una lista
- Usar la función
- Mostrar el resultado