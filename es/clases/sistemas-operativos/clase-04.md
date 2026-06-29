---
layout: clase
title: "Clase 04: Administracion de Procesos"
excerpt: ""
lang: es
materia: "Sistemas Operativos"
---

# Administración de Procesos

<br>

## ¿Qué es un proceso?

<br>

Un proceso es un programa en ejecución. Es decir, no es el programa en sí, sino la instancia (una "copia" volcada en la memoria RAM) de un programa que se está ejecutando.

<br>

## Características


Los procesos tienen un estado de vida: los procesos pueden estar en distintos estados, como por ejemplo: "en espera", "en ejecución", "terminado", etc.
También tienen un conjunto de propiedades que los identifican, como por ejemplo: su ID (PID), su estado actual, su prioridad, etc.

![Imagen htop](https://slimbook.es/images/imagetuto/htop-bottom.png){: width="50%" height="auto"}

## Ciclo de vida

<br>

El ciclo de vida de un proceso es el conjunto de estados por los que pasa un proceso desde que se crea hasta que se termina. Puede variar según el sistema operativo, pero generalmente incluye los siguientes estados:

| Estado         | Descripción                             |
| -------------- | --------------------------------------- |
| Nuevo-Inicializado         | El proceso se está creando.             |
| Listo          | El proceso está listo para ejecutarse.  |
| En ejecución   | El proceso se está ejecutando.          |
| Espera         | El proceso está esperando a que ocurra un evento. |
| Terminado      | El proceso ha terminado.                |
| No Responde    | El proceso no responde a las interrupciones del usuario. |
| Zombie         | El proceso ha terminado pero su entrada en la tabla de procesos no ha sido eliminada. |

## ¿Quien crea los procesos?

<br>

Los procesos son creados por el sistema operativo, especialmente por el proceso **init** o su equivalente, como **systemd** en Linux, o por otros procesos.  Cuando un proceso crea otro proceso, se dice que el primer proceso es el "proceso padre" y el segundo proceso es el "proceso hijo".

La parte del sistema operativo encargada de crear, destruir y gestionar los procesos es el Gestor de Procesos (o Process Manager), el cual es uno de los componentes fundamentales del **Kernel** (o Núcleo) del sistema operativo.

## ¿Cómo los crea el Kernel en la práctica?

<br>

Aunque el Gestor de Procesos es el responsable conceptual, para crear un proceso un programa debe hacer una Llamada al Sistema (System Call). Aquí es donde Linux y Windows toman caminos muy distintos:

<br>

### En Linux (Mecanismo Duplicación/Reemplazo)

<br>

Linux utiliza un método heredado de Unix muy eficiente basado en dos llamadas principales:

<br>

```bash
fork(): El Kernel no crea un proceso desde cero. Lo que hace es clonar exactamente el proceso que hizo la petición (el proceso "padre"). El nuevo proceso (el "hijo") hereda una copia idéntica de la memoria, variables y archivos abiertos.

execve() (o sus variantes): Inmediatamente después del fork, el proceso hijo suele ejecutar esta llamada para reemplazar todo su contenido clonado por el nuevo programa que realmente se quiere ejecutar (por ejemplo, cargar el código de Discord o de la terminal).
```
<br>

### En Windows (Mecanismo de Creación Directa)

Windows no clona procesos. Su Kernel utiliza una API directa y mucho más compleja:

```bash
CreateProcess(): Esta llamada al sistema le pide al Kernel que construya un proceso completamente nuevo desde cero. El Kernel crea un espacio de memoria vacío, genera las estructuras de control correspondientes, carga el archivo ejecutable (.exe) directamente del disco a la RAM y crea el primer hilo (thread) de ejecución para arrancar el programa.
```

![Imagen tasklist](https://configserverfirewall.s3.us-west-2.amazonaws.com/images/windows/cmd/tasklist/tasklist-command.webp){: width="50%" height="auto"}

- ¿Quien les asigna el PID?

El sistema operativo con su Gestor de Procesos les asigna un número único llamado PID (Process ID).

- ¿Quien les asigna la prioridad?

El sistema operativo con su Gestor de Procesos les asigna una prioridad, que es un número que indica la importancia del proceso.

- ¿Quien le asigna los recursos necesarios para su ejecución?

El sistema operativo con su Gestor de Procesos les asigna los recursos necesarios para su ejecución, como por ejemplo: memoria RAM, CPU, etc.