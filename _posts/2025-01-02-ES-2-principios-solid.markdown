---
layout: post
permalink: blog/:title
highlighter: rouge
title:  "Principios SOLID en el Desarrollo de Software - 2 OCP"
date:   2025-01-02 19:00:00 -0300
image: assets/images/posts/solid-2.webp
image-alt: "Principios SOLID OCP"
categories: tips develop production practices SOLID OCP
excerpt: "Principios SOLID: Open-Closed Principle (OCP). Parte 2"
languaje: spanish
related: /blog/EN-2-principles-solid
published: true
---

[English version]({{ site.url }}/blog/EN-2-principles-solid)

![Principios SOLID]({{ site.url }}/assets/images/posts/solid-2.webp)

El **Open/Closed Principle (OCP)** es el segundo principio de los principios SOLID y establece que las entidades de software (clases, módulos, funciones) deben estar **abiertas para la extensión pero cerradas para la modificación**. En términos simples, esto significa que podés agregar nuevas funcionalidades a nuestro código sin alterar el código existente. Este enfoque minimiza el riesgo de introducir errores en funcionalidades ya probadas y nos permite que el software evolucione de manera segura y controlada.

La clave para implementar el OCP es diseñar código que sea extensible utilizando técnicas como la herencia, el polimorfismo y la inyección de dependencias. Esto lo logramos mediante el uso de abstracciones (por ejemplo, clases base o interfaces) en lugar de depender directamente de implementaciones concretas. En este post, exploraremos el OCP con un ejemplo práctico usando Python y una API que gestiona operaciones para diferentes tipos de usuarios.

Imaginemos (imaginemos, porque se darán cuenta es una manera espantosa de hacerlo) una API que maneja diferentes roles de usuario, como "Admin" y "Guest". Un diseño inicial que no respeta el OCP podría verse así:

```python
class User:
    def __init__(self, username):
        self.username = username

    def get_permissions(self):
        if self.username == "admin":
            return ["read", "write", "delete"]
        elif self.username == "guest":
            return ["read"]
        else:
            return []
```

En este diseño, cada vez que se agrega un nuevo rol, como "Editor" o "SuperAdmin", se necesita modificar el método `get_permissions`. Esto viola el principio OCP, ya que el código existente no está cerrado para modificaciones. Cada cambio aumenta el riesgo de introducir errores y hace que el sistema sea menos mantenible.

Ahora, veamos cómo sería aplicando el principio SOLID OCP. Podemos rediseñar el sistema utilizando una clase base y subclases que encapsulen la lógica específica de cada rol:

```python
class User:
    def __init__(self, username):
        self.username = username

    def get_permissions(self):
        raise NotImplementedError("Subclasses must implement this method")

class Admin(User):
    def get_permissions(self):
        return ["read", "write", "delete"]

class Guest(User):
    def get_permissions(self):
        return ["read"]
```
En este diseño, la clase `User` actúa como una abstracción, y cada rol específico (`Admin`, `Guest`, etc.) implementa su propia lógica. Ahora, para agregar un nuevo rol, simplemente creamos una nueva subclase, sin tocar el código existente.

Llevemos este ejemplo a un lugar un poco más amplio, una API con Flask. Supongamos que queremos implementar una ruta de la API que devuelva los permisos de un usuario basado en su rol. Usando el diseño basado en el OCP, la implementación sería así:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/permissions/<username>")
def get_user_permissions(username):
    roles = {
        "admin": Admin(username),
        "guest": Guest(username),
    }

    user = roles.get(username.lower(), User(username))
    try:
        permissions = user.get_permissions()
    except NotImplementedError:
        return jsonify({"error": "Invalid role"}), 400

    return jsonify({"username": username, "permissions": permissions})

if __name__ == "__main__":
    app.run(debug=True)
```
Con este enfoque, si se agrega un nuevo rol, como "Editor", solo necesitamos crear una nueva subclase de `User` y registrar el rol en el diccionario `roles`. No es necesario modificar el resto del sistema.

El Open/Closed Principle no solo mejora la calidad del código, sino que también promueve prácticas de desarrollo sostenibles y escalables. En un entorno de producción, donde los requisitos cambian constantemente, aplicar este principio garantiza que podamos adaptarnos rápidamente sin comprometer la estabilidad del sistema.

o/