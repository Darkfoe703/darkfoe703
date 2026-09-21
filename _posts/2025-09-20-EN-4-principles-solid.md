---
layout: post
permalink: blog/:title
highlighter: rouge
title: "SOLID Principles in Software Development - 4 ISP"
date: 2025-09-20 10:00:00 -0300
image: assets/images/posts/solid-4-isp.webp
image-alt: "SOLID Principles ISP"
categories: tips develop production practices SOLID ISP
excerpt: "SOLID Principles: Interface Segregation Principle (ISP). Part 4. Clients should not be forced to depend on interfaces they don't use."
languaje: english
related: /blog/ES-4-principios-solid
published: true
---

[Versión en español]({{ site.url }}/blog/ES-4-principios-solid)

![SOLID Principles ISP]({{ site.url }}/assets/images/posts/solid-4-isp.webp)

The **Interface Segregation Principle (ISP)** states that **clients should not be forced to depend on interfaces they don't use**. In other words, it's better to have many small, specific interfaces than one large, general-purpose interface. When a class implements an interface, it should only be required to provide behavior that's actually relevant to its purpose. This principle helps keep your code decoupled, testable, and honest about its capabilities.

The problem arises when we design "fat" interfaces — interfaces that bundle together multiple unrelated behaviors. Imagine a system where you have an `IWorker` interface with methods like `work()`, `eat()`, and `sleep()`. A `HumanWorker` class can implement all three naturally. But what about a `RobotWorker`? It can `work()`, but it doesn't `eat()` or `sleep()`. Forcing the robot to implement those methods leads to dummy implementations, exceptions, or empty methods — all signs that the interface is doing too much.

#### **The problem: a fat interface**

```python
from abc import ABC, abstractmethod

class IWorker(ABC):
    @abstractmethod
    def work(self):
        pass

    @abstractmethod
    def eat(self):
        pass

    @abstractmethod
    def sleep(self):
        pass

class HumanWorker(IWorker):
    def work(self):
        return "Working..."

    def eat(self):
        return "Eating lunch..."

    def sleep(self):
        return "Sleeping..."

class RobotWorker(IWorker):
    def work(self):
        return "Processing tasks..."

    def eat(self):
        raise NotImplementedError("Robots don't eat!")

    def sleep(self):
        raise NotImplementedError("Robots don't sleep!")
```

Here, `RobotWorker` is **forced to depend on methods it doesn't need**. This violates ISP and creates fragile code: every time you add a new method to `IWorker`, all implementers must be updated — even if the change is irrelevant to them.

#### **Applying ISP: split into focused interfaces**

The solution is to segregate the interface into smaller, role-specific ones:

```python
from abc import ABC, abstractmethod

class IWorkable(ABC):
    @abstractmethod
    def work(self):
        pass

class IEatable(ABC):
    @abstractmethod
    def eat(self):
        pass

class ISleepable(ABC):
    @abstractmethod
    def sleep(self):
        pass

class HumanWorker(IWorkable, IEatable, ISleepable):
    def work(self):
        return "Working..."

    def eat(self):
        return "Eating lunch..."

    def sleep(self):
        return "Sleeping..."

class RobotWorker(IWorkable):
    def work(self):
        return "Processing tasks..."
```

Now `RobotWorker` only implements `IWorkable`. It doesn't know — and doesn't care — about `IEatable` or `ISleepable`. If tomorrow you create a `RemoteWorker` that only needs `work()` and `sleep()`, it just implements those two. No dummy methods, no exceptions, no lies.

#### **Real-world example: API with Flask**

Let's say you're building an API where different clients consume different capabilities. With ISP, you can inject only what's needed:

```python
from flask import Flask, jsonify
from typing import Protocol

class IWorkable(Protocol):
    def work(self) -> str: ...

class HumanWorker:
    def work(self):
        return "Human working..."

    def eat(self):
        return "Eating..."

class RobotWorker:
    def work(self):
        return "Robot processing..."

app = Flask(__name__)

@app.route("/work/<worker_type>")
def do_work(worker_type):
    workers = {
        "human": HumanWorker(),
        "robot": RobotWorker(),
    }
    worker = workers.get(worker_type)
    if not worker:
        return jsonify({"error": "Unknown worker"}), 404
    return jsonify({"result": worker.work()})

if __name__ == "__main__":
    app.run(debug=True)
```

The endpoint only requires `IWorkable`. It doesn't matter if the worker can eat or sleep — the contract is minimal and precise.

The Interface Segregation Principle keeps your abstractions honest and your dependencies lean. It prevents the "interface pollution" where classes accumulate methods they don't use just to satisfy a bloated contract. In testing, this shines: you can mock only what you need. In production, it means smaller surface areas for bugs. ISP is the principle that reminds us: **do one thing, expose one thing, require one thing**.

o/