---
layout: post
permalink: blog/:title
highlighter: rouge
title: "Principios SOLID en el Desarrollo de Software - 3 Liskov"
date:  2025-05-12 09:00:00 -0300
image: assets/images/posts/solid-3-liskov.webp
image-alt: "SOLID Liskov"
categories: tips develop production practices SOLID Liskov
excerpt: "Principios SOLID: Sustitución de Liskov. Parte 3. Este principio puede parecer teórico al principio, pero es clave para que tu código no sea una trampa mortal de herencia mal usada"
languaje: spanish
related: /blog/EN-3-principles-solid
published: true
---

[English version]({{ site.url }}/blog/EN-3-principles-solid)

![LISKOV]({{ site.url }}/assets/images/posts/solid-3-liskov.webp)

Cuando hablamos del **principio de sustitución de Liskov**, lo que decimos en criollo es que si una clase hija hereda de una clase madre, debería poder **reemplazarla sin que el sistema se rompa**. Es decir, cualquier instancia de una subclase debería comportarse como su clase padre sin alterar la lógica del programa. Esto parece obvio, pero en la práctica muchos sistemas se terminan quebrando porque las subclases empiezan a hacer cosas raras o inesperadas.

Imaginemos que estamos construyendo una API REST para una plataforma que tiene distintos tipos de usuarios: `Usuario`, `Admin`, `Editor`, etc. Creamos una clase base `Usuario` que tiene un método `ver_dashboard()`, y después extendemos esa clase para admins o editores. Hasta ahí, todo bien. Pero si de golpe una subclase como `UsuarioInvitado` lanza una excepción cuando alguien llama a `ver_dashboard()`, ahí estamos violando el principio de Liskov.

Mirá este ejemplo en Python para entenderlo mejor:

```python
class Usuario:
    def ver_dashboard(self):
        return "Mostrando el dashboard"

class UsuarioInvitado(Usuario):
    def ver_dashboard(self):
        raise PermissionError("El invitado no puede ver el dashboard")
```
Acá `UsuarioInvitado` **hereda** de `Usuario`, pero rompe el comportamiento esperado: cuando se llama a `ver_dashboard()` en un `Usuario`, uno espera que siempre funcione, no que explote con un `PermissionError`. Eso es una clara violación de LSP. Una mejor solución sería **no heredar de Usuario** si el comportamiento esperado no aplica.

Podemos solucionarlo usando composición o separando responsabilidades con interfaces más claras:

```python
class Usuario:
    def puede_ver_dashboard(self):
        return True

    def ver_dashboard(self):
        if self.puede_ver_dashboard():
            return "Mostrando el dashboard"
        raise PermissionError("No tenés permiso para ver esto")

class UsuarioInvitado(Usuario):
    def puede_ver_dashboard(self):
        return False

```
Así, todos los objetos responden al mismo método, pero se comportan de forma coherente sin romper lo que la clase base promete. Además, esto hace que tu API REST sea más predecible: cualquier endpoint que use `Usuario.ver_dashboard()` sabe que o se ve el dashboard o se obtiene un mensaje claro de permiso, sin sorpresas ni errores rotos por subclases rebeldes.

El principio de Liskov nos obliga a pensar mejor las jerarquías de clases, a ser más honestos con nuestras abstracciones y, sobre todo, a evitar meter con calzador comportamientos que en realidad no aplican. Es una de esas reglas que, cuando la empezás a aplicar, te ayuda a escribir código más limpio, entendible y fácil de mantener. Y si hacés APIs para terceros, ¡más vale que tus clases se comporten como prometen!

o/
