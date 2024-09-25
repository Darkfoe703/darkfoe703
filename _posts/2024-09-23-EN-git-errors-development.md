---
layout: post
permalink: blog/:title
highlighter: rouge
title:  "Git: How to handle code errors in development"
date:   2024-09-23 20:00:00 -0300
image: assets/images/posts/roman-synkevych-wX2L8L-fGeA-unsplash.jpg
image-alt: "Git - Picture by Roman Synkevych"
categories: git tips develop
excerpt: "We must have made a mistake in development. Can git help us in that case?"
languaje: english
published: true
---
[Spanish version here]({{ site.url }}/blog/ES-git-errores-desarrollo)

![Git - Picture by Roman Synkevych on Unsplash]({{ site.url }}/assets/images/posts/roman-synkevych-wX2L8L-fGeA-unsplash.jpg)
> Picture by [Roman Synkevych](https://unsplash.com/es/@synkevych?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/es/fotos/pinguino-de-juguete-blanco-y-negro-wX2L8L-fGeA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

When working in a development and production environment, mistakes are inevitable. Fortunately, Git is an essential tool that allows you to manage these issues efficiently. Knowing how to revert, correct, and deploy properly is crucial to minimizing downtime and ensuring the stability of the production environment.

A common scenario is when you make a mistake in the code while working on a development branch. Suppose you have two main branches in your workflow: `main` (or `master`) for production and `develop` for ongoing development. If you commit an error on `develop`, the first thing you can do is use the `git revert` command to undo the changes from that specific commit without losing your work history. A practical example would be:

```bash
git revert <commit_hash>
```

This will create a new commit that reverts the changes introduced by the erroneous commit. It’s useful when you want to preserve the full change history without rewriting it, which is important in production environments.

If you catch the mistake before pushing, you can opt for `git reset`. There are two common variants of this command: `--soft` and `--hard`. The first option is useful if you want to remove the commit but keep the changes in your working directory, while `--hard` will remove both the commit and the code changes. This is especially helpful when you haven’t shared your changes with others yet. For example:
  
```bash
git reset --soft HEAD~1  # removes the last commit but keeps the modified files
git reset --hard HEAD~1  # removes the last commit and the modified files
```

In a production environment, you might find yourself having deployed faulty code. To fix it quickly, you can use `git checkout` or `git pull` to revert to a previous stable version. For instance, if you want to return to a specific commit, you can run:

```bash
git checkout <commit_hash>
```

If you simply want to reset the main branch to a previous state and continue working from there, you can use `git reset --hard` on the production branch, but be very careful not to overwrite important work already in production.

Another crucial aspect is using emergency or "hotfix" branches in production. If you need to fix a critical issue without interrupting ongoing development, you can create a new `hotfix` branch based on `main` or `master`, correct the error, and then merge it back into `main` and `develop`:

```bash
git checkout -b hotfix/critical-error main
# Make the necessary fixes
git commit -am "Fix critical error in production"
git checkout main
git merge hotfix/critical-error
git push origin main
```

Lastly, remember that working with Git in production requires discipline and a well-defined recovery plan. By using an appropriate branching strategy (such as Git Flow), automation with CI/CD, and a clear commit history, you’ll be better prepared to handle any code errors without causing a negative impact on end users. Maintaining good practices with Git ensures a smoother development cycle and a more stable production environment.

o/