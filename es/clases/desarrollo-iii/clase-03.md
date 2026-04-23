---
layout: clase
title: "Clase 03: Control de Flujo"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Apunte de Clase 03

## ¿Qué es el control de flujo?

El **control de flujo** permite decidir **qué instrucciones se ejecutan** y **cuántas veces se ejecutan** dentro de un programa.

Gracias al control de flujo, los programas pueden:
- Tomar decisiones
- Repetir acciones
- Responder a distintas situaciones

<br>

---


# 1. Estructuras condicionales: if

Permiten ejecutar código **solo si se cumple una condición**.

## Sintaxis básica
<br>
```python
if condicion:
    instrucciones
```
La condición debe ser una expresión que devuelva True o False.

```python
# Ejemplo
edad = 18

if edad >= 18:
    print("Es mayor de edad")
```

## if con else

Permite ejecutar un bloque alternativo si la condición no se cumple.

```python
nota = 5

if nota >= 6:
    print("Aprobado")
else:
    print("Desaprobado")
```

## if con elif

Permite evaluar múltiples condiciones.

```python
nota = 8

if nota >= 9:
    print("Excelente")
elif nota >= 7:
    print("Muy bien")
elif nota >= 6:
    print("Bien")
else:
    print("Desaprobado")
```

# 2. Bucles (Repeticiones)

Los bucles permiten ejecutar código varias veces.

## Bucle for

Se usa cuando sabemos cuántas veces queremos repetir algo.

Sintaxis
```python
for variable in range(inicio, fin):
    instrucciones
Ejemplo
for i in range(5):
    print(i)
```

Salida:
```
0
1
2
3
4
```

## Bucle while

Se usa cuando queremos repetir algo mientras se cumpla una condición.

Sintaxis
```python
while condicion:
    instrucciones
```

Ejemplo
```python
contador = 0

while contador < 5:
    print(contador)
    contador = contador + 1
```
<br>
# Actividades
<br>
## 1. Contador simple con for

Crear un programa que:

- Pida un número al usuario.
- Muestre todos los números desde 1 hasta ese número.
- Indique si cada número es par o impar.

## 2. Validación con while

Crear un programa que:

- Pida una nota al usuario.
- Si la nota es menor que 0 o mayor que 10, volver a pedirla.
- Cuando la nota sea válida:
- Mostrar si está aprobado (6 o más) o desaprobado

## 3. Promedio de notas con for + if

Crear un programa que:

- Pida la cantidad de notas a ingresar.
- Use un for para pedir esas notas.
- Calcule el promedio.
- Indique:
- Si aprueba (≥ 6)
- Si desaprueba (< 6)