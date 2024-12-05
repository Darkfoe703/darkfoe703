---
layout: post
permalink: blog/:title
highlighter: rouge
title:  "Principios SOLID en el Desarrollo de Software - 1"
date:   2024-12-05 18:00:00 -0300
image: assets/images/posts/solid.webp
image-alt: "Principios SOLID"
categories: tips develop production practices SOLID
excerpt: "Qué son los principios SOLID y cómo nos hacen mejores desarrolladores. El Single responsibility principle. Parte 1"
languaje: spanish
published: true
---

[English version]({{ site.url }}/blog/EN-1-principles-solid)

![Principios SOLID]({{ site.url }}/assets/images/posts/solid.webp)

Los principios SOLID son un conjunto de directrices que buscan mejorar la calidad y la mantenibilidad del código en el desarrollo de software. Estos principios ayudan a diseñar sistemas más robustos, adaptables y fáciles de escalar. Cada letra de SOLID representa un principio: **S**ingle Responsibility Principle, **O**pen/Closed Principle, **L**iskov Substitution Principle, **I**nterface Segregation Principle y **D**ependency Inversion Principle. Aunque son útiles para cualquier paradigma, se aplican especialmente en programación orientada a objetos (OOP). En este post, exploraremos qué es SOLID, su importancia en proyectos reales y profundizaremos en el primer principio con un ejemplo práctico en Python.

### **1. Single Responsibility Principle (SRP)**

El principio de responsabilidad única establece que una clase debe tener una sola razón para cambiar. En otras palabras, una clase debe estar enfocada únicamente en realizar una tarea específica. Este principio es crucial porque reduce el acoplamiento entre clases y mejora la cohesión del código. Una clase con múltiples responsabilidades tiende a ser más compleja, difícil de mantener y propensa a errores cuando las responsabilidades están interrelacionadas.

#### **Ejemplo práctico: Gestión de pedidos en un sistema de e-commerce**

Supongamos que estamos desarrollando una aplicación para gestionar pedidos de un e-commerce. Una clase mal diseñada podría combinar la lógica de manejo de pedidos, facturación y generación de reportes:

```python
class Order:
    def __init__(self, items):
        self.items = items

    def calculate_total(self):
        # Lógica para calcular el total
        return sum(item["price"] for item in self.items)

    def generate_invoice(self):
        # Lógica para generar una factura
        return f"Invoice for {len(self.items)} items."

    def export_report(self):
        # Lógica para exportar un reporte
        return f"Report: {self.items}"
```

Esta clase tiene **tres responsabilidades distintas**, lo que viola el SRP. Si en el futuro cambia la manera de generar facturas, exportar reportes o calcular totales, los cambios podrían afectar áreas no relacionadas, aumentando el riesgo de errores.

#### **Rediseñando con SRP**

Podemos dividir esta clase en tres clases independientes, cada una con una única responsabilidad:

```python
class Order:
    def __init__(self, items):
        self.items = items

    def calculate_total(self):
        return sum(item["price"] for item in self.items)

class InvoiceGenerator:
    def generate(self, order):
        return f"Invoice for {len(order.items)} items."

class ReportExporter:
    def export(self, order):
        return f"Report: {order.items}"
```
Ahora cada clase tiene una única responsabilidad. Si necesitamos modificar la lógica de generación de facturas, no afectaremos la clase `Order` ni la de exportación de reportes. Además, este diseño es más fácil de probar y escalar.

Los principios SOLID no son reglas estrictas que hay que cumplir sí o sí, siempre hay excepciones o situaciones inesperadas, pero cuando se aplican correctamente, mejoran significativamente la calidad del código. El **SRP**, como vimos, ayuda a dividir responsabilidades, lo que reduce la complejidad. En proyectos reales, aplicar estos principios puede parecer más trabajo al inicio, pero ahorra tiempo y esfuerzo en el mantenimiento, escalabilidad y colaboración a largo plazo.

o/