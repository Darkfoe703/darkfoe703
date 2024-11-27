---
layout: post
permalink: blog/:title
highlighter: rouge
title:  "Docker: Development and Production Environments"
date:   2024-10-06 19:00:00 -0300
image: assets/images/posts/mohammad-rahmani-1VW6HLOQE5A-unsplash.jpg
image-alt: "Dockerfile - Picture by Mohammad Rahmani"
categories: docker dockerfile tips develop environments production
excerpt: "How we can create different development and production environments when working using Docker"
languaje: english
published: true
---
[Versión en español]({{ site.url }}/blog/ES-Docker-entornos-diferentes)

![Dockerfile - Picture by Mohammad Rahmani en Unsplash]({{ site.url }}/assets/images/posts/mohammad-rahmani-1VW6HLOQE5A-unsplash.jpg)
>Picture by [Mohammad Rahmani](https://unsplash.com/es/@afgprogrammer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/es/fotos/una-pantalla-de-computadora-con-un-programa-ejecutandose-en-ella-1VW6HLOQE5A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Using Docker allows you to create isolated and replicable environments for both development and production. However, each environment has different needs: in development, you may require debugging tools, while in production, you prioritize efficiency and security. This is where the need for different configurations for both the `Dockerfile` and the `docker-compose.yml` file comes into play. Let’s look at how to achieve this with a Flask application connected to a PostgreSQL database.

To begin, we’ll create two different `Dockerfile` files. The first one will be for development (`Dockerfile.dev`), where we include tools useful for the developer, such as debuggers and hot-reloading modules like `flask-reload`. An example of a `Dockerfile.dev` could look like this:
```dockerfile
## Dockerfile.dev
FROM python:3.10-slim
WORKDIR /app
# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt
# Copy all the code into the container
COPY . .
# Port for the API
EXPOSE 5000
# Start command with hot-reload
CMD ["flask", "run", "--host=0.0.0.0", "--reload"]
```

In this file, the `--reload` option is essential for development, as it allows the Flask server to automatically restart when code changes are detected, improving development speed.

For production, you need a different `Dockerfile`, one that is lighter and optimized for stability and security. In this case, it’s better to remove development tools and use a more robust web server like `gunicorn` to handle traffic instead of Flask’s development server. A `Dockerfile.prod` might look like this:
```dockerfile
# Dockerfile.prod
FROM python:3.10-slim
WORKDIR /app
# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy all the code into the container
COPY . .
# Port for the API
EXPOSE 5000
# Start command with gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```
Here, `gunicorn` is used, a WSGI HTTP server suitable for production, and hot-reloading or unnecessary tools are avoided.

Now, for the PostgreSQL database and the overall infrastructure, we can use `docker-compose` to define and bring up containers for both Flask and PostgreSQL. Just like with the `Dockerfile`, we can have different configurations for development and production. In development (`docker-compose.dev.yml`), you can expose additional ports and mount local volumes to edit code without needing to rebuild the image:

```yml
# docker-compose.dev.yml
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "5000:5000"
    volumes:
      - .:/app
    environment:
      - FLASK_ENV=development
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```
This file allows developers to change code locally and see the changes immediately. Additionally, the database ports are exposed for testing and debugging.

In production, the `docker-compose.prod.yml` file will be more restrictive. You won’t need local volumes or debugging tools, and you likely won’t want to expose unnecessary ports:
```yml
# docker-compose.prod.yml
version: '3'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.prod
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```
With these separate files, you can easily run your application in either development or production simply by specifying which configuration file to use with Docker Compose. For example, to bring up the development environment, you would run:
```bash
docker-compose -f docker-compose.dev.yml up --build
```
And for production:
```bash
docker-compose -f docker-compose.prod.yml up --build
```
By having clear and separate configurations for each environment, you can ensure that your Flask application with PostgreSQL runs optimally in both development and production, without risking stability or development speed.

o/