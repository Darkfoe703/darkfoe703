---
layout: post
permalink: blog/:title
highlighter: rouge
title: "SOLID Principles in Software Development - 1"
date: 2024-12-05 18:00:00 -0300
image: assets/images/posts/solid.webp
image-alt: "SOLID Principles"
categories: tips develop production practices SOLID
excerpt: "What are the SOLID principles and how do they make us better developers? The Single responsibility principle. Part 1"
languaje: english
published: true
---

[Versión en español]({{ site.url }}/blog/ES-1-principios-solid)

![SOLID Principles]({{ site.url }}/assets/images/posts/solid.webp)

SOLID principles are a set of guidelines that aim to improve the quality and maintainability of code in software development. These principles help to design more robust, adaptable, and scalable systems. Each letter of SOLID represents a principle: **S**ingle Responsibility Principle, **O**pen/Closed Principle, **L**iskov Substitution Principle, **I**nterface Segregation Principle, and **D**ependency Inversion Principle. While they are useful for any paradigm, they are especially applicable in object-oriented programming (OOP). In this post, we will explore what SOLID is, its importance in real projects, and delve deeper into the first principle with a practical example in Python.

### **1. Single Responsibility Principle (SRP)**

The Single Responsibility Principle states that a class should have only one reason to change. In other words, a class should be focused solely on performing a specific task. This principle is crucial because it reduces coupling between classes and improves code cohesion. A class with multiple responsibilities tends to be more complex, difficult to maintain, and error-prone when responsibilities are interrelated.

#### **Practical example: Order management in an e-commerce system**

Let's say we are developing an application to manage orders for an e-commerce site. A poorly designed class could combine order handling, billing, and reporting logic:

```python
class Order:
    def __init__(self, items):
        self.items = items

    def calculate_total(self):
        # Logic to calculate the total
        return sum(item["price"] for item in self.items)

    def generate_invoice(self):
        # Logic to generate an invoice
        return f"Invoice for {len(self.items)} items."

    def export_report(self):
        # Logic for exporting a report
        return f"Report: {self.items}"
```

This class has **three separate responsibilities**, which violates SRP. If you change the way you generate invoices, export reports, or calculate totals in the future, the changes could affect unrelated areas, increasing the risk of errors.

#### **Redesigning with SRP**

We can split this class into three separate classes, each with a single responsibility:

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

Now each class has a single responsibility. If we need to modify the invoice generation logic, we won't affect the `Order` class or the report export class. In addition, this design is easier to test and scale.

SOLID principles are not strict rules that must be followed no matter what - there are always exceptions or unexpected situations - but when applied correctly, they significantly improve code quality. **SRP**, as we saw, helps divide responsibilities, which reduces complexity. In real projects, applying these principles may seem like more work at the beginning, but it saves time and effort in maintenance, scalability, and collaboration in the long term.

o/