---
layout: post
permalink: blog/:title
highlighter: rouge
title: "SOLID Principles in Software Development - 2 OCP"
date: 2025-01-02 19:00:00 -0300
image: assets/images/posts/solid-2.webp
image-alt: "SOLID Principles OCP"
categories: tips develop production practices SOLID OCP
excerpt: "Principios SOLID: Open-Closed Principle (OCP). Parte 2"
languaje: english
related: /blog/ES-2-principios-solid
published: true
---

[Versión en español]({{ site.url }}/blog/ES-2-principios-solid)

![SOLID Principles]({{ site.url }}/assets/images/posts/solid-2.webp)

The Open/Closed Principle (OCP) is the second principle of the SOLID principles and states that software entities (classes, modules, functions) should be **open for extension but closed for modification**. In simple terms, this means that you can add new functionality to your code without altering existing code. This approach minimizes the risk of introducing bugs into already tested functionality and allows the software to evolve in a safe and controlled manner.

The key to implementing the OCP is to design code that is extensible using techniques such as inheritance, polymorphism, and dependency injection. We achieve this by using abstractions (e.g. base classes or interfaces) rather than directly depending on concrete implementations. In this post, we will explore the OCP with a practical example using Python and an API that handles operations for different types of users.

Imagine (imagine, because you'll notice it's a horrible way to do it) an API that handles different user roles, such as "Admin" and "Guest". An initial design that does not respect the OCP might look like this:

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

In this design, every time a new role is added, such as "Editor" or "SuperAdmin", the `get_permissions` method needs to be modified. This violates the OCP principle, since the existing code is not closed for modifications. Each change increases the risk of introducing bugs and makes the system less maintainable.

Now, let's see what this would look like by applying the SOLID OCP principle. We can redesign the system using a base class and subclasses that encapsulate the logic specific to each role:

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
In this design, the `User` class acts as an abstraction, and each specific role (`Admin`, `Guest`, etc.) implements its own logic. Now, to add a new role, we simply create a new subclass, without touching the existing code.

Let's take this example to a slightly broader place, an API with Flask. Suppose we want to implement an API route that returns a user's permissions based on their role. Using the OCP-based design, the implementation would look like this:

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
With this approach, if a new role is added, such as "Editor", we just need to create a new subclass of `User` and register the role in the `roles` dictionary. There is no need to modify the rest of the system.

The Open/Closed Principle not only improves code quality, but also promotes sustainable and scalable development practices. In a production environment, where requirements are constantly changing, applying this principle ensures that we can adapt quickly without compromising the stability of the system.

o/