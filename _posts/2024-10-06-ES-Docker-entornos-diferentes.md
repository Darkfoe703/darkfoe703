---
layout: post
permalink: blog/:title
highlighter: rouge
title:  "Docker: entornos de desarrollo y producción"
date:   2024-10-06 19:00:00 -0300
image: assets/images/posts/mohammad-rahmani-1VW6HLOQE5A-unsplash.jpg
image-alt: "Dockerfile - Foto de Mohammad Rahmani"
categories: docker dockerfile tips develop environments production
excerpt: "Cómo podemos crear diferentes entornos de desarrollo y producción al trabajar usando Docker"
languaje: spanish
published: true
---
[English version]({{ site.url }}/blog/EN-Docker-environments-different)

![Dockerfile - Foto de Mohammad Rahmani en Unsplash]({{ site.url }}/assets/images/posts/mohammad-rahmani-1VW6HLOQE5A-unsplash.jpg)
>Foto de [Mohammad Rahmani](https://unsplash.com/es/@afgprogrammer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) en [Unsplash](https://unsplash.com/es/fotos/una-pantalla-de-computadora-con-un-programa-ejecutandose-en-ella-1VW6HLOQE5A?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

El uso de Docker permite crear entornos aislados y replicables tanto para desarrollo como para producción. Sin embargo, cada entorno tiene necesidades diferentes: en desarrollo puedes necesitar herramientas de depuración, mientras que en producción priorizas la eficiencia y la seguridad. Aquí es donde entra la necesidad de tener diferentes configuraciones tanto para el `Dockerfile` como para el archivo `docker-compose.yml`. Vamos a ver cómo se hace esto en el caso de una aplicación Flask con una base de datos PostgreSQL.

Para comenzar, vamos a crear dos `Dockerfile` diferentes. El primero será para desarrollo (`Dockerfile.dev`), donde incluimos herramientas útiles para el desarrollador, como `debuggers` y módulos de hot-reloading como `flask-reload`. Un ejemplo de un `Dockerfile.dev` podría verse así:
```dockerfile
#Dockerfile.dev
FROM python:3.10-slim

WORKDIR /app
# Instala las dependencias
COPY requirements.txt .
RUN pip install -r requirements.txt
# Copia todo el código al contenedor
COPY . .
# Puerto para la API
EXPOSE 5000
# Comando de inicio con recarga en caliente
CMD ["flask", "run", "--host=0.0.0.0", "--reload"]
```

En este archivo, la opción `--reload` es esencial para el desarrollo, ya que permite que el servidor Flask se reinicie automáticamente cuando se detectan cambios en el código, mejorando la velocidad de desarrollo.

Para producción, se necesita un `Dockerfile` diferente, que sea más liviano y optimizado para la estabilidad y seguridad. En este caso, es mejor eliminar las herramientas de desarrollo y utilizar un servidor web más robusto como `gunicorn` para manejar el tráfico en lugar del servidor de desarrollo de Flask. Un `Dockerfile.prod` podría verse de la siguiente manera:
```dockerfile
# Dockerfile.prod
FROM python:3.10-slim
WORKDIR /app
# Instala las dependencias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copia todo el código al contenedor
COPY . .
# Puerto para la API
EXPOSE 5000
# Comando de inicio con gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```
Aquí se utiliza `gunicorn`, un servidor HTTP WSGI adecuado para producción, y se evita cualquier recarga en caliente o herramientas innecesarias.

Ahora, para la base de datos PostgreSQL y la infraestructura en general, podemos usar `docker-compose` para definir y levantar contenedores de Flask y PostgreSQL. Al igual que con el `Dockerfile`, podemos tener diferentes configuraciones para desarrollo y producción. En desarrollo (`docker-compose.dev.yml`), puedes exponer puertos adicionales y montar volúmenes locales para editar el código sin necesidad de reconstruir la imagen:

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
Este archivo permite a los desarrolladores cambiar el código localmente y ver los cambios reflejados inmediatamente. Además, se exponen los puertos de la base de datos para pruebas y depuración.

En producción, el archivo `docker-compose.prod.yml` será más restrictivo. No necesitas volúmenes locales ni herramientas de depuración, y probablemente tampoco quieras exponer puertos innecesarios:
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
Con estos archivos separados, puedes ejecutar fácilmente tu aplicación en desarrollo o producción simplemente indicando cuál archivo de configuración usar con Docker Compose. Por ejemplo, para levantar el entorno de desarrollo, ejecutas:
```bash
docker-compose -f docker-compose.dev.yml up --build
```
Y para producción:
```bash
docker-compose -f docker-compose.prod.yml up --build
```
Al tener configuraciones claras y separadas para cada entorno, puedes asegurar que tu aplicación Flask con PostgreSQL funcione de manera óptima en desarrollo y producción, sin arriesgar estabilidad o velocidad de trabajo.

o/