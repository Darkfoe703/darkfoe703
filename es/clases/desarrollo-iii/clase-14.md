---
layout: clase
title: "Clase 14: Manejo de archivos"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Manejo de archivos en Python
<br>

Por ahora nuestros programas tienen un alcance e interacción limitados a la consola. Pero ¿qué pasa si queremos que guarden la información para poder utilizarla en otro momento?.

Para eso, necesitamos utilizar archivos.

## Memoria y almacenamiento
<br>

Cuando trabajamos con Python, estamos ejecutando un programa en la memoria RAM.


Cuando guardamos un archivo, estamos utilizando un dispositivo de almacenamiento, que puede ser un disco duro, un SSD, una memoria USB, etc. Con las variables almacenamos datos de forma temporal, mientras que con los archivos podemos almacenar datos de forma permanente.


## Crear un archivo
<br>

Comando `with`: Nos permite trabajar con archivos de manera segura, ya que se encarga de cerrar el archivo automáticamente. Si no se usa with, se debe cerrar el archivo manualmente con el comando `close()`.


```python
# abre el archivo en modo escritura
archivo = open("archivo.txt", "w")
# escribe en el archivo
archivo.write("Hola")
# cierra el archivo
archivo.close()
```

Comando `open`: Nos permite abrir un archivo en un modo determinado.

Comando `write`: Nos permite escribir en el archivo.

```python
# abre el archivo en modo escritura
with open("archivo.txt", "w") as archivo:
    # escribe en el archivo
    archivo.write("Hola")
```

### Modos de apertura

- `"w"`: modo escritura. Si el archivo existe, lo sobrescribe. Si no existe, lo crea.
- `"a"`: modo añadir. Si el archivo existe, añade el contenido al final. Si no existe, lo crea.
- `"r"`: modo lectura. Si el archivo existe, lo abre. Si no existe, lanza un error.
- `"x"`: modo creación exclusiva. Si el archivo existe, lanza un error. 
- `"t"`: modo texto. (Por defecto)
- `"b"`: modo binario.


## Leer un archivo
<br>

Comando `read(n)`: Lee el contenido del archivo, o los primeros n caracteres si se especifica n.

```python
# abre el archivo en modo lectura
with open("archivo.txt", "r") as archivo:
    # lee el contenido del archivo
    contenido = archivo.read()
    print(contenido)
```

Comando `readline(n)`: Lee una línea del archivo. Si se especifica n, lee la cantidad de caracteres indicados, hasta encontrar un salto de línea.

```python
# abre el archivo en modo lectura
with open("archivo.txt", "r") as archivo:
    # lee la primera línea del archivo
    linea = archivo.readline()
    print(linea)
```

Comando `readlines()`: Lee el contenido del archivo línea por línea y lo convierte en una lista. Cada elemento de la lista es una línea del archivo.

```python
# abre el archivo en modo lectura
with open("archivo.txt", "r") as archivo:
    # lee el contenido del archivo
    contenido = archivo.readlines()
    print(contenido)
```

## Actividades
<br>

### 1. Crear un programa que:

- Solicite al usuario:
    - Nombre
    - Edad
    - Curso
- Guarde esa información en un archivo llamado `alumno.txt`.
- Una vez guardada, abra nuevamente el archivo y muestre su contenido por pantalla.
<br>

### 2. Crear un programa que permita registrar cinco alumnos.
<br>

Para cada alumno solicitar:

- Nombre
- Nota

Guardar la información en un archivo llamado `notas.txt` utilizando el siguiente formato:

```
Ana - 8
Bruno - 6
Carla - 9
```

Una vez finalizada la carga:

- Leer el archivo línea por línea utilizando `readlines()`.
- Mostrar todas las líneas por pantalla.
- Indicar cuántos registros contiene el archivo.


