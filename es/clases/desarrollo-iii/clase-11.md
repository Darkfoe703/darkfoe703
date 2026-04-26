---
layout: clase
title: "Clase 11: Paradigmas de programación"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Paradigmas de programación
<br>

## ¿Qué es un paradigma de programación?
<br>

Un paradigma de programación es un estilo o forma de programar. No es un lenguaje, sino una forma de pensar y estructurar el código.
<br>

## Paradigma imperativo
<br>

Enfoque procedural, donde el programador "da instrucciones" al computador para realizar una tarea. Se define un estado inicial y una secuencia de pasos para transformarlo.
<br>

Ejemplo:
```python
nro1 = int(input("Ingrese un numero: "))
nro2 = int(input("Ingrese otro numero: "))
suma = nro1 + nro2
print("La suma es: ", suma)

# Este programa sigue una secuencia de pasos para realizar una tarea
# 1. Obtener el primer numero
# 2. Obtener el segundo numero
# 3. Sumar los numeros
# 4. Imprimir el resultado
```
<br>

## Paradigma funcional
<br>

Se centra en el uso de funciones como bloques de construcción principales. Las funciones se consideran "objetos" de primera clase, lo que significa que pueden ser pasadas como argumentos a otras funciones, devueltas por funciones y asignadas a variables.
<br>

Ejemplo:
```python
def sumar(nro1, nro2):
    return nro1 + nro2

def leer_numeros():
    nro1 = int(input("Ingrese un numero: "))
    nro2 = int(input("Ingrese otro numero: "))
    return nro1, nro2


nro1, nro2 = leer_numeros()


resultado = sumar(nro1, nro2)


print("La suma es:", resultado)


# Este programa agrupa las instrucciones en funciones
# 1. Obtener los nros usando una funcion 
# 2. Sumar los numeros usando otra funcion
# 3. Imprimir el resultado
```
<br>

## Paradigma orientado a objetos
<br>

En la orientación a objetos, se trabaja con bloques de código llamados objetos, los cuales tienen atributos y métodos.
Tienen la particularidad de poder ser reutilizados en otros programas. Por lo tanto, se puede decir que el código es más limpio y ordenado. Yo no creo esos objetos directamente, sino que creo `clases` que son como "moldes" para crear objetos.
<br>

Ejemplo:
```python
class Suma:
    def __init__(self, nro1, nro2):
        self.nro1 = nro1
        self.nro2 = nro2
    
    def sumar(self):
        return self.nro1 + self.nro2

nro1 = int(input("Ingrese un numero: "))
nro2 = int(input("Ingrese otro numero: "))
print("La suma es: ", Suma(nro1, nro2).sumar())

``` 
<br>


