---
layout: post
permalink: blog/:title
highlighter: rouge
title: "Principios SOLID en el Desarrollo de Software - 5 DIP"
date: 2026-09-27 10:00:00 -0300
image: assets/images/posts/solid-5-dip.webp
image-alt: "Principios SOLID DIP"
categories: tips develop production practices SOLID DIP
excerpt: "Principios SOLID: Principio de Inversión de Dependencias (DIP). Parte 5. Depende de abstracciones, no de concreciones. El gran final."
languaje: spanish
related: /blog/EN-5-principles-solid
published: true
---

[English version]({{ site.url }}/blog/EN-5-principles-solid)

![Principios SOLID DIP]({{ site.url }}/assets/images/posts/solid-5-dip.webp)

El **Principio de Inversión de Dependencias (DIP)** es el quinto y último principio SOLID, y es el que une a todos los demás. Establece: **los módulos de alto nivel no deberían depender de módulos de bajo nivel; ambos deberían depender de abstracciones**. También: **las abstracciones no deberían depender de los detalles; los detalles deberían depender de las abstracciones**. En la práctica, esto significa que tu lógica de negocio no debería conocer tu base de datos, tu cliente HTTP, o tu sistema de archivos — solo debería conocer interfaces. Las implementaciones concretas se inyectan en tiempo de ejecución.

El problema aparece cuando el código de alto nivel importa e instancia directamente detalles de bajo nivel. Imagina un `ServicioUsuario` que crea una conexión `BaseDeDatosMySQL` en su constructor. Si quieres cambiar a PostgreSQL, o probar con un almacenamiento en memoria, tienes que modificar `ServicioUsuario` en sí. Eso viola el DIP — y también el OCP, ya que estás modificando código existente para cambiar comportamiento.

#### **El problema: depender de concreciones**

```python
class BaseDeDatosMySQL:
    def conectar(self):
        return "Conectado a MySQL"

    def consultar(self, sql):
        return f"Resultado MySQL para: {sql}"

class ServicioUsuario:
    def __init__(self):
        self.db = BaseDeDatosMySQL()  # ¡Dependencia hardcodeada!

    def obtener_usuario(self, user_id):
        self.db.conectar()
        return self.db.consultar(f"SELECT * FROM usuarios WHERE id = {user_id}")
```

Aquí, `ServicioUsuario` (lógica de negocio de alto nivel) **depende directamente de `BaseDeDatosMySQL` (detalle de bajo nivel)**. ¿Quieres probar sin una BD real? No puedes. ¿Quieres usar PostgreSQL en staging? Modificas la clase. Este acoplamiento hace el sistema rígido y difícil de evolucionar.

#### **Aplicando DIP: invertir la dependencia**

Introducimos una abstracción (`IDBaseDeDatos`) y la inyectamos:

```python
from abc import ABC, abstractmethod

class IDBaseDeDatos(ABC):
    @abstractmethod
    def conectar(self):
        pass

    @abstractmethod
    def consultar(self, sql):
        pass

class BaseDeDatosMySQL(IDBaseDeDatos):
    def conectar(self):
        return "Conectado a MySQL"

    def consultar(self, sql):
        return f"Resultado MySQL para: {sql}"

class BaseDeDatosPostgreSQL(IDBaseDeDatos):
    def conectar(self):
        return "Conectado a PostgreSQL"

    def consultar(self, sql):
        return f"Resultado PostgreSQL para: {sql}"

class BaseDeDatosEnMemoria(IDBaseDeDatos):
    def __init__(self):
        self.datos = {}

    def conectar(self):
        return "En memoria listo"

    def consultar(self, sql):
        return f"Resultado simulado para: {sql}"

class ServicioUsuario:
    def __init__(self, base_datos: IDBaseDeDatos):
        self.db = base_datos  # ¡Dependencia inyectada!

    def obtener_usuario(self, user_id):
        self.db.conectar()
        return self.db.consultar(f"SELECT * FROM usuarios WHERE id = {user_id}")
```

Ahora `ServicioUsuario` depende de `IDBaseDeDatos` (abstracción), no de ninguna implementación concreta. Puedes cambiar de base de datos sin tocar `ServicioUsuario` — solo pasas una implementación distinta al construirlo.

#### **Ejemplo real: App Flask con wiring según entorno**

```python
from flask import Flask, jsonify
import os

app = Flask(__name__)

# Factory: elige implementación según variable de entorno
def crear_base_datos() -> IDBaseDeDatos:
    tipo_db = os.getenv("TIPO_DB", "memoria")
    if tipo_db == "mysql":
        return BaseDeDatosMySQL()
    elif tipo_db == "postgres":
        return BaseDeDatosPostgreSQL()
    else:
        return BaseDeDatosEnMemoria()

# Cableado una sola vez al inicio
db = crear_base_datos()
servicio_usuario = ServicioUsuario(db)

@app.route("/usuarios/<int:user_id>")
def obtener_usuario(user_id):
    resultado = servicio_usuario.obtener_usuario(user_id)
    return jsonify({"usuario": resultado})

if __name__ == "__main__":
    app.run(debug=True)
```

Configuras `TIPO_DB=postgres` en producción, `TIPO_DB=memoria` en tests. Cero cambios en `ServicioUsuario`.

El Principio de Inversión de Dependencias es el pegamento que hace prácticos a los otros cuatro principios. **SRP** te da clases enfocadas. **OCP** te deja extenderlas. **LSP** asegura que las sustituciones funcionen. **ISP** mantiene interfaces mínimas. **DIP** lo conecta todo sin crear un lío enredado de dependencias concretas.

Cuando aplicas los cinco, no solo obtienes "código limpio" — obtienes un sistema donde:
- La lógica de negocio es testeable en aislamiento
- Los cambios de infraestructura (BD, API, cola) son cambios de una línea
- Las nuevas features no requieren reescribir las viejas
- La arquitectura refleja el dominio, no el framework

SOLID no es una lista de verificación que marcas una vez. Es una mentalidad que practicas cada vez que trazas una línea entre el "qué" y el "cómo". Y cuando lo haces, tu código deja de ser un pasivo y empieza a ser un activo.

o/