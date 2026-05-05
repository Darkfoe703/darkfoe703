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
- Se evita modificar variables innecesariamente
- Se prioriza el uso de funciones que reciben datos y devuelven resultados
<br>

Ejemplo:
```python
def leer_numeros():
    return int(input("Ingrese un número: ")), int(input("Ingrese otro número: "))


def sumar(a, b):
    return a + b


def mostrar(resultado):
    print("La suma es:", resultado)


# Programa principal
n1, n2 = leer_numeros()
resultado = sumar(n1, n2)
mostrar(resultado)


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

# Actividades
<br>

## 1. Pasar de un paradigma a otro

Analizar el siguiente programa y reescribirlo bajo el paradigma funcional:
<br>

```python
def leer_alumno():
    nombre = input("Nombre del alumno: ")
    nota1 = float(input("Nota 1: "))
    nota2 = float(input("Nota 2: "))
    nota3 = float(input("Nota 3: "))

    return {
        "nombre": nombre,
        "notas": [nota1, nota2, nota3]
    }


def calcular_promedio(notas):
    return sum(notas) / len(notas)


def evaluar(promedio):
    if promedio >= 6:
        return "Aprobado"
    else:
        return "Desaprobado"


def procesar_alumno(alumno):
    promedio = calcular_promedio(alumno["notas"])
    estado = evaluar(promedio)

    alumno["promedio"] = promedio
    alumno["estado"] = estado


def mostrar_alumno(alumno):
    print("Nombre:", alumno["nombre"])
    print("Notas:", alumno["notas"])
    print("Promedio:", alumno["promedio"])
    print("Estado:", alumno["estado"])
    print("----------------------")


# Programa principal
alumnos = []

cantidad = int(input("¿Cuántos alumnos desea cargar? "))

for i in range(cantidad):
    alumno = leer_alumno()
    procesar_alumno(alumno)
    alumnos.append(alumno)

print("\n--- RESULTADOS ---")

for alumno in alumnos:
    mostrar_alumno(alumno)
```


