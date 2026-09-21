---
layout: post
permalink: blog/:title
highlighter: rouge
title: "Principios SOLID en el Desarrollo de Software - 4 ISP"
date: 2025-09-20 10:00:00 -0300
image: assets/images/posts/solid-4-isp.webp
image-alt: "Principios SOLID ISP"
categories: tips develop production practices SOLID ISP
excerpt: "Principios SOLID: Principio de Segregación de Interfaces (ISP). Parte 4. Los clientes no deberían verse obligados a depender de interfaces que no usan."
languaje: spanish
related: /blog/EN-4-principles-solid
published: true
---

[English version]({{ site.url }}/blog/EN-4-principles-solid)

![Principios SOLID ISP]({{ site.url }}/assets/images/posts/solid-4-isp.webp)

El **Principio de Segregación de Interfaces (ISP)** establece que **los clientes no deberían verse obligados a depender de interfaces que no usan**. En otras palabras, es mejor tener muchas interfaces pequeñas y específicas que una sola interfaz grande y de propósito general. Cuando una clase implementa una interfaz, solo debería estar obligada a proporcionar el comportamiento que es realmente relevante para su propósito. Este principio ayuda a mantener el código desacoplado, testeable y honesto sobre sus capacidades.

El problema surge cuando diseñamos interfaces "gordas" — interfaces que agrupan múltiples comportamientos no relacionados. Imagina un sistema donde tienes una interfaz `ITrabajador` con métodos como `trabajar()`, `comer()` y `dormir()`. Una clase `TrabajadorHumano` puede implementar los tres de forma natural. Pero, ¿qué pasa con un `TrabajadorRobot`? Puede `trabajar()`, pero no `come()` ni `duerme()`. Obligar al robot a implementar esos métodos lleva a implementaciones ficticias, excepciones o métodos vacíos — todas señales de que la interfaz está haciendo demasiado.

#### **El problema: una interfaz gorda**

```python
from abc import ABC, abstractmethod

class ITrabajador(ABC):
    @abstractmethod
    def trabajar(self):
        pass

    @abstractmethod
    def comer(self):
        pass

    @abstractmethod
    def dormir(self):
        pass

class TrabajadorHumano(ITrabajador):
    def trabajar(self):
        return "Trabajando..."

    def comer(self):
        return "Comiendo..."

    def dormir(self):
        return "Durmiendo..."

class TrabajadorRobot(ITrabajador):
    def trabajar(self):
        return "Procesando tareas..."

    def comer(self):
        raise NotImplementedError("¡Los robots no comen!")

    def dormir(self):
        raise NotImplementedError("¡Los robots no duermen!")
```

Aquí, `TrabajadorRobot` se ve **forzado a depender de métodos que no necesita**. Esto viola el ISP y crea código frágil: cada vez que agregas un nuevo método a `ITrabajador`, todos los implementadores deben actualizarse — incluso si el cambio les es irrelevante.

#### **Aplicando ISP: dividir en interfaces enfocadas**

La solución es segregar la interfaz en otras más pequeñas y específicas por rol:

```python
from abc import ABC, abstractmethod

class ITrabajable(ABC):
    @abstractmethod
    def trabajar(self):
        pass

class IComible(ABC):
    @abstractmethod
    def comer(self):
        pass

class IDormible(ABC):
    @abstractmethod
    def dormir(self):
        pass

class TrabajadorHumano(ITrabajable, IComible, IDormible):
    def trabajar(self):
        return "Trabajando..."

    def comer(self):
        return "Comiendo..."

    def dormir(self):
        return "Durmiendo..."

class TrabajadorRobot(ITrabajable):
    def trabajar(self):
        return "Procesando tareas..."
```

Ahora `TrabajadorRobot` solo implementa `ITrabajable`. No conoce — y no le importa — `IComible` ni `IDormible`. Si mañana creas un `TrabajadorRemoto` que solo necesita `trabajar()` y `dormir()`, simplemente implementa esas dos. Sin métodos ficticios, sin excepciones, sin mentiras.

#### **Ejemplo real: API con Flask**

Supongamos que estás construyendo una API donde diferentes clientes consumen diferentes capacidades. Con ISP, puedes inyectar solo lo necesario:

```python
from flask import Flask, jsonify
from typing import Protocol

class ITrabajable(Protocol):
    def trabajar(self) -> str: ...

class TrabajadorHumano:
    def trabajar(self):
        return "Humano trabajando..."

    def comer(self):
        return "Comiendo..."

class TrabajadorRobot:
    def trabajar(self):
        return "Robot procesando..."

app = Flask(__name__)

@app.route("/trabajar/<tipo_trabajador>")
def hacer_trabajo(tipo_trabajador):
    trabajadores = {
        "humano": TrabajadorHumano(),
        "robot": TrabajadorRobot(),
    }
    trabajador = trabajadores.get(tipo_trabajador)
    if not trabajador:
        return jsonify({"error": "Trabajador desconocido"}), 404
    return jsonify({"resultado": trabajador.trabajar()})

if __name__ == "__main__":
    app.run(debug=True)
```

El endpoint solo requiere `ITrabajable`. No importa si el trabajador puede comer o dormir — el contrato es mínimo y preciso.

El Principio de Segregación de Interfaces mantiene tus abstracciones honestas y tus dependencias ligeras. Evita la "contaminación de interfaces" donde las clases acumulan métodos que no usan solo para satisfacer un contrato inflado. En testing, esto brilla: puedes mockear solo lo que necesitas. En producción, significa superficies más pequeñas para bugs. El ISP es el principio que nos recuerda: **haz una cosa, expón una cosa, requiere una cosa**.

o/