---
layout: clase
title: "Clase 22: Entornos Virtuales - Qué son, para qué sirven y cómo se crean"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Entornos Virtuales

<br>

## Repaso rápido: ¿Dónde estamos?

En la **Clase 21** cerramos la unidad de **POO** con el TP Nº 3 (herencia, polimorfismo, encapsulamiento, JSON).
A partir de hoy entramos en la unidad de **entornos y dependencias**.

Hoy respondemos tres preguntas:

1. **¿Qué es** un entorno virtual?
2. **¿Para qué sirve** (y qué problema resuelve)?
3. **¿Cómo se crea y se usa** en **Windows 10/11** y en **Debian 12/13**?

> En el laboratorio de la escuela trabajamos con **Python 3.13.x**. Todos los ejemplos están probados para esa versión.

<br>

## 1. El problema: "en mi máquina funciona"

Imaginate esta situación, que le pasó a casi todo el mundo alguna vez:

```python
# proyecto_a.py  → necesita requests 2.25
import requests

# proyecto_b.py  → necesita requests 2.32 (porque usa una función nueva)
import requests
```

Si instalás las librerías **globalmente** (en el Python del sistema), tenés un solo `requests` para todos los proyectos:

```bash
# Instalación global (⚠️ NO recomendada)
pip install requests==2.25
# ... tiempo después ...
pip install requests==2.32
# 😱 El proyecto A ahora se rompe: su versión fue reemplazada
```

Y en el laboratorio se suma otro problema: **todos los alumnos comparten las mismas máquinas**. Si cada uno instala cosas globalmente, en dos semanas el Python del sistema es un Frankenstein imposible de reproducir.

> **Regla de oro**: en el Python del sistema **no se instalan librerías de proyectos** (salvo el gestor de paquetes del SO, y con cuidado).

### Los tres problemas clásicos

| Problema | Qué pasa | Ejemplo |
|----------|----------|---------|
| **Conflicto de versiones** | Dos proyectos piden versiones incompatibles de la misma librería | `requests 2.25` vs `2.32` |
| **Contaminación global** | Se instalan decenas de paquetes que no sabés de dónde salieron | `pip list` con 80 paquetes |
| **Falta de reproducibilidad** | En tu máquina anda, en la del docente no | "A mí me funciona" |

<br>

## 2. ¿Qué es un entorno virtual?

> **Definición simple**: un **entorno virtual** es una **carpeta** que contiene una copia (o un enlace) del intérprete de Python y **su propio** directorio de librerías (`site-packages`), completamente **aislado** del resto del sistema.

**Analogía**: pensá en cada proyecto como una **caja de herramientas**.
- Sin entorno virtual: todas las herramientas del barrio están en un cajón común. Si alguien cambia el martillo, afecta a todos.
- Con entorno virtual: cada proyecto tiene **su propia caja**. Podés tener un martillo chico en una y uno grande en otra. No se pisan.

### Lo que crea `venv` en la carpeta

**En Windows:**

```
venv\
├── Scripts\
│   ├── python.exe
│   ├── pip.exe
│   └── Activate.ps1
├── Lib\site-packages\      ← acá van TUS librerías
└── pyvenv.cfg              ← archivo de configuración
```

**En Debian/Linux:**

```
venv/
├── bin/
│   ├── python -> /usr/bin/python3
│   ├── pip
│   └── activate
├── lib/python3.13/site-packages/   ← acá van TUS librerías
└── pyvenv.cfg
```

> **Dato clave**: `venv/` es **solo una carpeta**. Se puede borrar y recrear en segundos. Por eso **no hace falta copiarla ni respaldarla**.

<br>

## 3. ¿Para qué sirven? Cinco razones concretas

| # | Razón | Beneficio real |
|---|-------|----------------|
| **1** | **Aislar dependencias** | Cada proyecto tiene sus versiones, sin conflictos |
| **2** | **Reproducibilidad** | Con `requirements.txt` cualquiera reconstruye el entorno exacto |
| **3** | **No romper el sistema** | El Python del SO queda intacto (crítico en Linux) |
| **4** | **Probar versiones nuevas** | Podés experimentar sin miedo: si algo falla, borrás la carpeta |
| **5** | **Trabajo en equipo** | Todos usan las mismas versiones → menos "en mi máquina anda" |

> **¿Y si no uso entornos virtuales?** Podés programar igual... hasta que instales dos proyectos con dependencias incompatibles. Ahí empieza el sufrimiento. En la industria es **obligatorio** por convención.

<br>

## 4. Cómo funciona por dentro (breve)

Cuando **activás** un entorno virtual, lo que cambia es tu **`PATH`**: la carpeta `Scripts\` (Windows) o `bin/` (Linux) se pone **primero** en la búsqueda de ejecutables.

```bash
# Al activar, "python" y "pip" apuntan al del entorno, no al del sistema
which python        # Linux: /ruta/proyecto/venv/bin/python
where python        # Windows: C:\ruta\proyecto\venv\Scripts\python.exe
```

Podés comprobarlo desde Python:

```python
import sys

print(sys.executable)   # Ruta del intérprete que está corriendo
print(sys.prefix)       # Carpeta del entorno
print(sys.base_prefix)  # Carpeta del Python "base" del sistema
```

> **Truco**: si `sys.prefix != sys.base_prefix`, estás dentro de un entorno virtual. Es la forma **más confiable** de saberlo (mejor que mirar el prompt).

<br>

## 5. Entornos virtuales en Windows 10 / 11

### Paso 1: Verificar Python

Abrí **PowerShell** (o CMD) y escribí:

```powershell
python --version
# Python 3.13.5

# Si tenés varias versiones instaladas, el lanzador "py" las lista:
py -0
#  -V:3.13 *        Python 3.13 (64-bit)
#  -V:3.12          Python 3.12 (64-bit)
```

> Si `python` no se reconoce, instalá Python desde [python.org](https://www.python.org/downloads/) y **tildá "Add python.exe to PATH"**. En el laboratorio ya viene instalado.

### Paso 2: Crear el entorno

Parate en la carpeta de tu proyecto y ejecutá:

```powershell
cd C:\Users\TuUsuario\proyectos\mi_proyecto

# Con "python"
python -m venv venv

# O forzando una versión exacta (recomendado si tenés varias):
py -3.13 -m venv venv
```

> **Convención de nombre**: `venv` es el más común. También vas a ver `.venv` (oculto en Linux, usado por VS Code). Elegí uno y sé consistente.

### Paso 3: Activar el entorno

**PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

Si aparece un error de *"la ejecución de scripts está deshabilitada"*, habilitá **solo para esa sesión** (no cambia la configuración del sistema):

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

**CMD (símbolo del sistema):**

```cmd
venv\Scripts\activate.bat
```

Cuando se activa, el prompt cambia:

```
(venv) PS C:\Users\TuUsuario\proyectos\mi_proyecto>
```

### Paso 4: Verificar que estás dentro

```powershell
where python
# C:\...\mi_proyecto\venv\Scripts\python.exe   ← ✅ el del entorno

python -c "import sys; print(sys.executable)"
```

### Paso 5: Salir

```powershell
deactivate
```

El `(venv)` desaparece del prompt y volvés al Python del sistema.

<br>

## 6. Entornos virtuales en Debian 12 / 13

> **Importante sobre versiones**:
> - **Debian 12 (bookworm)** trae **Python 3.11** por defecto.
> - **Debian 13 (trixie)** trae **Python 3.13**.
> - El entorno virtual **hereda la versión del intérprete** con el que lo creaste. En el laboratorio (3.13.x) vas a ver `lib/python3.13/site-packages/`.
> - Si en tu Debian 12 necesitás 3.13, hay que instalarlo aparte (por ejemplo con `pyenv` o compilándolo). Para esta materia alcanza con usar el `python3` disponible.

### Paso 1: Verificar Python y el módulo `venv`

```bash
python3 --version
# Python 3.13.5

# ¿Existe el módulo venv?
python3 -m venv --help > /dev/null && echo "venv OK"
```

En Debian, `venv` viene en un paquete separado. Si falta:

```bash
sudo apt update
sudo apt install python3-venv
```

> En el laboratorio normalmente ya está instalado. Si no tenés permisos de `sudo`, avisale al docente.

### Paso 2: Crear el entorno

```bash
cd ~/proyectos/mi_proyecto

python3 -m venv venv

# Con una versión específica, si está instalada:
python3.13 -m venv venv

# Actualiza pip/setuptools dentro del entorno recién creado:
python3 -m venv --upgrade-deps venv
```

### Paso 3: Activar el entorno

```bash
source venv/bin/activate
```

El prompt cambia:

```
(venv) ramses@debian:~/proyectos/mi_proyecto$
```

### Paso 4: Verificar

```bash
which python
# /home/ramses/proyectos/mi_proyecto/venv/bin/python   ← ✅

python -c "import sys; print(sys.prefix)"
```

### Paso 5: Salir

```bash
deactivate
```

### ⚠️ El error de Debian 12/13: `externally-managed-environment`

Si intentás instalar algo **sin activar** el entorno, Debian te frena:

```bash
pip install requests
# error: externally-managed-environment
# × This environment is externally managed
```

**Esto no es un bug: es una protección** (PEP 668). Debian te dice: *"no instales paquetes de Python con pip en el sistema, usá un entorno virtual o el gestor de paquetes `apt`"*.

La solución correcta **no** es `--break-system-packages` (eso rompe el sistema). La solución es:

```bash
source venv/bin/activate
pip install requests     # ✅ ahora sí, dentro del entorno
```

<br>

## 7. `pip` dentro del entorno: el flujo de trabajo

```bash
# 1. Activar SIEMPRE antes de instalar
source venv/bin/activate          # Linux
.\venv\Scripts\Activate.ps1       # Windows

# 2. Instalar librerías
pip install requests
pip install requests==2.32.3      # versión exacta (mejor para reproducibilidad)
pip install rich tabulate         # varias a la vez

# 3. Ver qué hay instalado
pip list
pip show requests

# 4. Congelar dependencias → archivo de receta
pip freeze > requirements.txt

# 5. Reconstruir el entorno en otra máquina
pip install -r requirements.txt
```

### Ejemplo de `requirements.txt`

```
certifi==2025.8.3
charset-normalizer==3.4.3
idna==3.10
requests==2.32.5
urllib3==2.5.0
```

> **¿Por qué fijar versiones?** Porque `requests` sin versión instala la última, y en seis meses "la última" puede haber cambiado y romper tu TP. `pip freeze` guarda **exactamente** lo que tenías.

### ¿Qué se comparte y qué NO?

Si le pasás el proyecto a un compañero o al docente, **no copies la carpeta `venv/`**.

| Sí se comparte | No se comparte |
|----------------|----------------|
| Tus archivos `.py` | La carpeta `venv/` |
| `requirements.txt` | Archivos temporales (`__pycache__/`) |

> **Motivo**: `venv/` pesa cientos de MB, contiene archivos binarios de **tu** sistema operativo (no sirven en otra máquina) y se regenera con un comando. El `requirements.txt` es la "receta"; la carpeta es el "plato ya cocinado".

<br>

## 8. Tabla comparativa: Windows vs Debian

| Acción | Windows 10/11 (PowerShell) | Debian 12/13 (bash) |
|--------|----------------------------|---------------------|
| Ver versión | `python --version` / `py -0` | `python3 --version` |
| Crear entorno | `py -3.13 -m venv venv` | `python3 -m venv venv` |
| Activar | `.\venv\Scripts\Activate.ps1` | `source venv/bin/activate` |
| Activar (CMD) | `venv\Scripts\activate.bat` | — |
| Desactivar | `deactivate` | `deactivate` |
| Ver intérprete | `where python` | `which python` |
| Instalar | `pip install paquete` | `pip install paquete` |
| Congelar | `pip freeze > requirements.txt` | `pip freeze > requirements.txt` |
| Reconstruir | `pip install -r requirements.txt` | `pip install -r requirements.txt` |
| Borrar entorno | `Remove-Item -Recurse -Force venv` | `rm -rf venv` |

<br>

## 9. Errores comunes (y cómo salir del pozo)

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| `python no se reconoce...` (Windows) | Python no está en el `PATH` | Reinstalar tildando "Add to PATH", o usar `py` |
| No aparece `(venv)` en el prompt | No activaste el entorno | Ejecutar el `activate` correspondiente |
| `Activate.ps1 no se puede cargar` | Política de ejecución de PowerShell | `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` |
| `externally-managed-environment` (Debian) | pip bloqueado por PEP 668 | Activar el venv y reinstalar ahí |
| `ModuleNotFoundError` después de instalar | Instalaste **fuera** del entorno | Verificar con `where/which python` y reinstalar dentro |
| `pip` instala en el Python global | Entorno mal activado | Desactivar, verificar ruta y volver a activar |
| VS Code no encuentra las librerías | Intérprete equivocado seleccionado | `Ctrl+Shift+P` → *Python: Select Interpreter* → elegir `venv` |

<br>

## 10. Flujo completo de trabajo (memorizalo)

```bash
# ---------- LINUX / DEBIAN ----------
cd ~/proyectos/mi_proyecto
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
deactivate
```

```powershell
# ---------- WINDOWS ----------
cd C:\Users\TuUsuario\proyectos\mi_proyecto
py -3.13 -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python main.py
deactivate
```

> **Regla mental**: **una carpeta de proyecto = un entorno virtual**. Si cambiás de proyecto, `deactivate` y activás el otro.

<br>

## Actividades

<br>

### Actividad 1: Mi primer entorno en Windows

En una máquina con Windows 10/11:

1. Creá una carpeta `clase22_windows` y dentro un archivo `hola.py` que imprima tu nombre y `sys.version`.
2. Creá y activá un entorno virtual con `py -3.13 -m venv venv`.
3. Ejecutá `where python` y `python hola.py`.
4. Desactivá el entorno, ejecutá `where python` de nuevo y compará las rutas.

**Entregá**: captura del prompt mostrando `(venv)` + las dos salidas de `where python`, y una línea explicando **qué cambió** entre estar dentro y fuera del entorno.

<br>

### Actividad 2: Entorno + dependencias en Debian

En Debian 12/13:

1. Creá `clase22_debian` y un entorno con `python3 -m venv venv`.
2. Activalo e instalá `requests`.
3. Generá `requirements.txt` con `pip freeze`.
4. **Borrá la carpeta `venv/`** (`rm -rf venv`), recreala, activala e instalá desde el archivo: `pip install -r requirements.txt`.
5. Verificá con `python -c "import requests; print(requests.__version__)"`.

**Entregá**: el contenido de `requirements.txt` y una captura de la verificación final. Respondé: **¿por qué pudiste reconstruir el entorno sin volver a escribir `pip install requests`?**

<br>

### Actividad 3: Detector de entornos

> **Investigación previa (obligatoria)**: hasta ahora **no usamos el módulo `sys`** en clase, así que esta actividad empieza con una pequeña investigación. Antes de escribir código, averigüen:
>
> 1. ¿Qué es `sys`? ¿Es una librería externa que hay que instalar o viene incluida con Python?
> 2. ¿Qué información guardan `sys.version`, `sys.executable`, `sys.prefix` y `sys.base_prefix`?
> 3. ¿Por qué `sys.prefix` cambia cuando activás el entorno y `sys.base_prefix` no?
>
> **Dónde buscar**: la documentación oficial ([docs.python.org/3/library/sys.html](https://docs.python.org/3/library/sys.html)), o desde la consola interactiva con `import sys` y luego `help(sys)` / `dir(sys)`.
>
> **En la entrega**: incluyan un párrafo (3-4 líneas) con lo que investigaron y la fuente que consultaron.

Escribí un script `verificar_entorno.py` que, usando solo `sys`, muestre:

- La versión de Python (`sys.version`).
- La ruta del intérprete (`sys.executable`).
- Si está dentro de un entorno virtual (**comparando `sys.prefix` con `sys.base_prefix`**).
- Si está activo, el nombre/carpeta del entorno.

Ejemplo de salida esperada (los valores cambian según tu máquina):

```
Python: 3.13.5 (main, ...)
Intérprete: /home/ramses/clase22_debian/venv/bin/python
¿Entorno virtual?: SÍ
Carpeta del entorno: venv
```

**Entregá**: el script, el párrafo de investigación y **dos capturas**: una ejecutándolo con el entorno **activado** y otra **desactivado**. Explicá en 2-3 líneas por qué `sys.prefix` cambia y `sys.base_prefix` no.

> **Pista**: no uses `pip`, `os.environ` ni librerías externas. Solo `import sys`. La comparación es `sys.prefix != sys.base_prefix`.

<br>

## Resumen de la clase

| Concepto | Idea para llevarte |
|----------|--------------------|
| **Entorno virtual** | Carpeta aislada con su propio Python y sus propias librerías |
| **Para qué sirve** | Evitar conflictos, no romper el sistema, reproducir entornos |
| **Crear** | `python -m venv venv` (Windows: `py -3.13 -m venv venv`) |
| **Activar** | `.\venv\Scripts\Activate.ps1` / `source venv/bin/activate` |
| **Verificar** | `where python` / `which python`; `sys.prefix != sys.base_prefix` |
| **Compartir** | `pip freeze > requirements.txt` (se comparte el archivo, no la carpeta `venv/`) |
| **Debian** | `python3-venv` aparte + PEP 668: nunca `pip install` global |

<br>

o/
