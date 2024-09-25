---
layout: post
permalink: :title
highlighter: rouge
title:  "Git: Cómo manejar errores de código en el desarrollo"
date:   2024-09-23 20:00:00 -0300
image: assets/images/posts/roman-synkevych-wX2L8L-fGeA-unsplash.jpg
categories: git tips develop
excerpt: "Seguramente hemos metido la pata en desarrollo ¿Puede git ayudarnos en ese caso?"
languaje: spanish
published: true
---
Versión en [inglés]({{ site.url }}/EN-git-errors-development)

![Git - Foto de Roman Synkevych en Unsplash]({{ site.url }}/assets/images/posts/roman-synkevych-wX2L8L-fGeA-unsplash.jpg)
> Foto de <a 
> href="https://unsplash.com/es/@synkevych?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Roman Synkevych</a> en <a 
> href="https://unsplash.com/es/fotos/pinguino-de-juguete-blanco-y-negro-wX2L8L-fGeA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

Cuando trabajamos en un entorno de desarrollo y producción, los errores son inevitables. Afortunadamente, Git es una herramienta esencial que nos permite manejar estos problemas de manera eficiente. Saber cómo revertir, corregir y desplegar de manera adecuada es vital para minimizar el tiempo de inactividad y asegurar la estabilidad del entorno de producción.

Un escenario común es cuando cometemos un error en el código mientras estamos trabajando en una rama de desarrollo. Supongamos que tenemos dos ramas principales en tu flujo de trabajo: `main` (o como la llamabamos antes: `master`) para producción, y `develop` para el desarrollo continuo. Si realizamos un commit en `develop` con un error, lo primero que podemos hacer es usar el comando `git revert` para deshacer los cambios de ese commit específico sin perder el historial de trabajo. Un ejemplo práctico sería:

```bash
git revert <commit_hash>
```

Esto creará un nuevo commit que revierte los cambios introducidos en el commit fallido. Es útil cuando queremos preservar el historial completo de cambios sin reescribir el historial, algo importante en entornos de producción.

Si descubres el error antes de realizar un `push`, puedes optar por `git reset`. Existen dos variantes comunes de este comando: `--soft` y `--hard`. La primera opción es útil si deseas eliminar el commit pero conservar los cambios en tu área de trabajo, mientras que `--hard` eliminará tanto el commit como los cambios en el código. Esto es especialmente útil cuando aún no has compartido tus cambios con otros. Un ejemplo sería:
  
```bash
git reset --soft HEAD~1  # elimina el último commit pero mantiene los archivos modificados
git reset --hard HEAD~1  # elimina el último commit y los archivos modificados
```
En un entorno de producción, puedes encontrarte en la situación de haber desplegado código con errores. Para solucionarlo rápidamente, puedes usar `git checkout` o `git pull` para volver a una versión anterior estable. Por ejemplo, si deseas regresar a un commit específico, puedes hacer lo siguiente:

```bash
git checkout <commit_hash>
```

Si deseas simplemente devolver la rama principal a un estado anterior y seguir trabajando desde ahí, puedes usar `git reset` con la opción `--hard` en la rama de producción, pero con mucho cuidado de no sobrescribir trabajo importante que ya esté en producción.

Otro punto importante es el uso de ramas de emergencia o "hotfix" en producción. Si necesitas solucionar un problema crítico sin interrumpir el desarrollo en curso, puedes crear una nueva rama `hotfix` basada en `main` o `master`, corregir el error, y luego fusionarla de vuelta a `main` y `develop`:

```bash
git checkout -b hotfix/error-critical main
# Realizas las correcciones
git commit -am "Corrige error crítico en producción"
git checkout main
git merge hotfix/error-critical
git push origin main
```

Finalmente, recuerda que trabajar con Git en producción requiere disciplina y un plan de recuperación bien definido. Al utilizar una estrategia adecuada de ramas (como Git Flow), la automatización con CI/CD, y un historial de commits claro, estarás mejor preparado para manejar cualquier error de código sin causar un impacto negativo en los usuarios finales. Mantener buenas prácticas con Git asegura un ciclo de desarrollo más fluido y una producción más estable.

o/