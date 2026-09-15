---
layout: clase
title: "Clase 17: Introducción a Programación Orientada a Objetos"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Introducción a Programación Orientada a Objetos (POO)

<br>

## ¿Qué es la POO?
<br>
La Programación Orientada a Objetos es un paradigma que organiza los programas alrededor de objetos.

Un objeto representa una entidad que posee:

<br>

- datos o características
- comportamientos

<br>

Por ejemplo, podemos representar un alumno.

Un alumno tiene características:
```
Nombre
Edad
Curso
Notas
```

<br>

Y puede realizar acciones:
```
Estudiar
Rendir examen
Calcular promedio
Mostrar información
```

<br>

Podemos representar esto como:
```
             ALUMNO
        ┌───────────────┐
        │ Características│
        │               │
        │ nombre        │
        │ edad          │
        │ curso         │
        │ notas         │
        │               │
        │ Comportamientos│
        │               │
        │ estudiar()    │
        │ rendir()      │
        │ promedio()    │
        └───────────────┘
```

<br>

## Objeto

Un objeto es una entidad que contiene datos y comportamientos relacionados.

Por ejemplo:
```
Alumno: Ana
Edad: 17
Curso: 6°A
```

es un objeto que representa a una determinada alumna.

Otro objeto podría ser:
```
Alumno: Bruno
Edad: 18
Curso: 6°A
```

Ambos representan alumnos, pero tienen diferentes datos.

<br>

### Atributos

<br>

Los atributos representan las características o datos de un objeto.

<br>

Por ejemplo, un alumno puede tener:
```
nombre
edad
curso
notas
```

Podemos pensarlo así:

```
Alumno

nombre = "Ana"
edad = 17
curso = "6°A"
```

<br>

> Los atributos describen cómo es un objeto.

<br>

### Métodos

Los métodos representan acciones que puede realizar un objeto.

Por ejemplo:
```
Alumno

estudiar()
rendir_examen()
calcular_promedio()
```

<br>

> Los métodos describen qué puede hacer un objeto.

<br>

Una de las ideas principales de la POO es reunir los datos y los comportamientos relacionados.

```
                 ALUMNO
                    │
          ┌─────────┴─────────┐
          │                   │
       ATRIBUTOS           MÉTODOS
          │                   │
     nombre               estudiar()
     edad                 rendir()
     curso                promedio()
     notas                mostrar()
```

<br>

## Clase

<br>

Una clase es una plantilla, un molde, para crear objetos.

<br>

Por ejemplo, la clase `Alumno` es una plantilla para crear objetos de tipo `Alumno`.

<br>

De la misma manera que podemos crear muchas casas a partir de un plano, podemos crear muchos objetos a partir de una clase.

<br>

A partir de esa clase podemos crear diferentes objetos.

```
              CLASE ALUMNO
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
        Ana       Bruno     Carla
        17        18        17
        6°1º       6°1º       6°2º
```

<br>

## Actividad
<br>

1. Crear 3 clases diferentes (no necesariamente en python), pero relacionadas entre sí.
<br>

- Deberán tener al menos 4 atributos y 3 métodos.

