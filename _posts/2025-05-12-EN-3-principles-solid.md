---
layout: post
permalink: blog/:title
highlighter: rouge
title: "SOLID Principles in Software Development - 3 Liskov"
date:  2025-05-12 09:00:00 -0300
image: assets/images/posts/solid-3-liskov.webp
image-alt: "SOLID Liskov"
categories: tips develop production practices SOLID Liskov
excerpt: "SOLID Principles: Liskov Substitution. Part 3. This principle may seem theoretical at first, but it's key to ensuring your code doesn't become a death trap of misused inheritance."
languaje: english
related: /blog/ES-3-principios-solid
published: true
---

[Versión en español]({{ site.url }}/blog/ES-3-principios-solid)

![LISKOV]({{ site.url }}/assets/images/posts/solid-3-liskov.webp)

When we talk about the **Liskov Substitution Principle**, we're basically saying that if a child class inherits from a parent class, it should be able to **replace the parent without breaking anything**. That is, any instance of a subclass should behave like its base class without altering the logic of the program. It sounds obvious, but in practice, many systems break because subclasses start doing weird or unexpected things.

Let’s say we’re building a REST API for a platform with different user types: `User`, `Admin`, `Editor`, etc. We create a base class `User` with a method `view_dashboard()`, and then extend that class for admins or editors. So far, so good. But if suddenly a subclass like `GuestUser` throws an exception when someone calls `view_dashboard()`, then we’re violating the Liskov principle.

Here’s an example in Python to make it clearer:

```python
class User:
    def view_dashboard(self):
        return "Showing dashboard"

class GuestUser(User):
    def view_dashboard(self):
        raise PermissionError("Guest users can't view the dashboard")
```
Here, `GuestUser` **inherits** from `User`, but breaks the expected behavior: when calling `view_dashboard()` on a `User`, you expect it to always work—not to blow up with a `PermissionError`. That’s a clear violation of LSP. A better solution would be **not to inherit from User** if the expected behavior doesn't apply.

We can fix this using composition or separating responsibilities with clearer interfaces:

```python
class User:
    def can_view_dashboard(self):
        return True

    def view_dashboard(self):
        if self.can_view_dashboard():
            return "Showing dashboard"
        raise PermissionError("You don't have permission to view this")

class GuestUser(User):
    def can_view_dashboard(self):
        return False
```
This way, all objects respond to the same method, but behave consistently without breaking what the base class promises. Plus, this makes your REST API more predictable: any endpoint using `User.view_dashboard()` knows it will either show the dashboard or return a clear permission error—no surprises or broken subclasses.

The Liskov Substitution Principle helps us think more carefully about class hierarchies, be more honest with our abstractions, and above all, avoid cramming in behavior that doesn't belong. It’s one of those rules that, once you start applying it, helps you write cleaner, more understandable, and easier-to-maintain code. And if you’re building APIs for third parties, your classes better behave like they claim to!

o/

