---
layout: post
permalink: blog/:title
highlighter: rouge
title: "SOLID Principles in Software Development - 5 DIP"
date: 2025-09-28 10:00:00 -0300
image: assets/images/posts/solid-5-dip.webp
image-alt: "SOLID Principles DIP"
categories: tips develop production practices SOLID DIP
excerpt: "SOLID Principles: Dependency Inversion Principle (DIP). Part 5. Depend on abstractions, not concretions. The grand finale."
languaje: english
related: /blog/ES-5-principios-solid
published: true
---

[Versión en español]({{ site.url }}/blog/ES-5-principios-solid)

![SOLID Principles DIP]({{ site.url }}/assets/images/posts/solid-5-dip.webp)

The **Dependency Inversion Principle (DIP)** is the fifth and final SOLID principle, and it ties everything together. It states: **high-level modules should not depend on low-level modules; both should depend on abstractions**. Also: **abstractions should not depend on details; details should depend on abstractions**. In practice, this means your business logic shouldn't know about your database, your HTTP client, or your file system — it should only know about interfaces. The concrete implementations get injected at runtime.

The problem appears when high-level code directly imports and instantiates low-level details. Imagine a `UserService` that creates a `MySQLDatabase` connection in its constructor. If you want to switch to PostgreSQL, or test with an in-memory store, you have to modify `UserService` itself. That's a violation of DIP — and also of OCP, since you're modifying existing code to change behavior.

#### **The problem: depending on concretions**

```python
class MySQLDatabase:
    def connect(self):
        return "Connected to MySQL"

    def query(self, sql):
        return f"MySQL result for: {sql}"

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Hardcoded dependency!

    def get_user(self, user_id):
        self.db.connect()
        return self.db.query(f"SELECT * FROM users WHERE id = {user_id}")
```

Here, `UserService` (high-level business logic) **depends directly on `MySQLDatabase` (low-level detail)**. Want to test without a real DB? Can't. Want to use PostgreSQL in staging? Modify the class. This coupling makes the system rigid and hard to evolve.

#### **Applying DIP: invert the dependency**

We introduce an abstraction (`IDatabase`) and inject it:

```python
from abc import ABC, abstractmethod

class IDatabase(ABC):
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def query(self, sql):
        pass

class MySQLDatabase(IDatabase):
    def connect(self):
        return "Connected to MySQL"

    def query(self, sql):
        return f"MySQL result for: {sql}"

class PostgreSQLDatabase(IDatabase):
    def connect(self):
        return "Connected to PostgreSQL"

    def query(self, sql):
        return f"PostgreSQL result for: {sql}"

class InMemoryDatabase(IDatabase):
    def __init__(self):
        self.data = {}

    def connect(self):
        return "In-memory ready"

    def query(self, sql):
        return f"Mock result for: {sql}"

class UserService:
    def __init__(self, database: IDatabase):
        self.db = database  # Dependency injected!

    def get_user(self, user_id):
        self.db.connect()
        return self.db.query(f"SELECT * FROM users WHERE id = {user_id}")
```

Now `UserService` depends on `IDatabase` (abstraction), not on any concrete implementation. You can swap databases without touching `UserService` — just pass a different implementation at construction time.

#### **Real-world example: Flask app with environment-based wiring**

```python
from flask import Flask, jsonify
import os

app = Flask(__name__)

# Factory: choose implementation based on env
def create_database() -> IDatabase:
    db_type = os.getenv("DB_TYPE", "memory")
    if db_type == "mysql":
        return MySQLDatabase()
    elif db_type == "postgres":
        return PostgreSQLDatabase()
    else:
        return InMemoryDatabase()

# Wire up once at startup
db = create_database()
user_service = UserService(db)

@app.route("/users/<int:user_id>")
def get_user(user_id):
    result = user_service.get_user(user_id)
    return jsonify({"user": result})

if __name__ == "__main__":
    app.run(debug=True)
```

Set `DB_TYPE=postgres` in production, `DB_TYPE=memory` in tests. Zero code changes in `UserService`.

The Dependency Inversion Principle is the glue that makes the other four principles practical. **SRP** gives you focused classes. **OCP** lets you extend them. **LSP** ensures substitutions work. **ISP** keeps interfaces minimal. **DIP** wires it all together without creating a tangled mess of concrete dependencies.

When you apply all five, you don't just get "clean code" — you get a system where:
- Business logic is testable in isolation
- Infrastructure swaps (DB, API, queue) are one-line changes
- New features don't require rewriting old ones
- The architecture reflects the domain, not the framework

SOLID isn't a checklist you tick off once. It's a mindset you practice every time you draw a line between "what" and "how". And when you do, your code stops being a liability and starts being an asset.

o/