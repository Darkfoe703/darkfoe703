---
layout: clase
title: "Clase 23: Flask - Instalación y primer Hola Mundo"
excerpt: ""
lang: es
materia: "Desarrollo III"
---

# Flask: Instalación y primer "Hola Mundo"

<br>


Hoy vamos a usar el entorno que creamos para instalar nuestra primera herramienta de desarrollo web:
**Flask**.

La idea de la clase es simple: **instalarlo, levantar un servidor y ver una página en el navegador**.
Sin formularios, sin archivos, sin complicaciones. Primero que funcione; después, que crezca.

<br>

## 1. ¿Qué es Flask?

> **Definición simple**: Flask es un **framework web** para Python. Nos permite crear aplicaciones que responden a peticiones HTTP (como cuando escribís una dirección en el navegador) sin tener que programar toda la comunicación desde cero.

### Framework vs. librería (la diferencia importa)

| Concepto | Qué es | Ejemplo |
|----------|--------|---------|
| **Librería** | Vos llamás al código. Vos tenés el control. | `requests`, `json` |
| **Framework** | El framework llama a tu código. Él tiene el control del flujo. | **Flask**, Django |

> **Analogía**: una librería es como una caja de herramientas: la usás cuando querés.
> Un framework es como una **casa ya construida con las paredes y las puertas puestas**: vos decidís qué poner en cada habitación, pero el recorrido ya está definido.

### ¿Por qué Flask y no otra cosa?

| Característica | Flask |
|----------------|-------|
| Tamaño | **Micro**framework: chico, pocas reglas |
| Curva de aprendizaje | Suave: el "Hola Mundo" entra en 6 líneas |
| Flexibilidad | Total: vos elegís qué agregar |
| Servidor incluido | Sí, para **desarrollo** (no para producción) |
| Python requerido | 3.9 o superior (nosotros usamos **3.13.x**) |

<br>

## 2. Antes de instalar: el entorno virtual

**Regla de la clase anterior**: las librerías de un proyecto van **dentro de su entorno virtual**, nunca en el Python del sistema.

```bash
# 1. Ir a la carpeta del proyecto
cd ~/proyectos/mi_primera_web

# 2. Crear el entorno (solo la primera vez)
python3 -m venv venv

# 3. Activarlo (SIEMPRE antes de instalar o ejecutar)
source venv/bin/activate          # Debian
.\venv\Scripts\Activate.ps1       # Windows (PowerShell)
```

El prompt tiene que mostrar `(venv)`:

```
(venv) ramses@debian:~/proyectos/mi_primera_web$
```

> **Si no ves `(venv)`**, no sigas. Todo lo que instales irá al sistema y después vienen los problemas.

### Estructura de la carpeta

```
mi_primera_web/
├── venv/              ← entorno virtual (no se comparte)
├── app.py             ← nuestro archivo (lo creamos ahora)
└── requirements.txt   ← receta de dependencias (lo generamos al final)
```

<br>

## 3. Instalar Flask

Con el entorno activado:

```bash
pip install flask
```

Salida esperada (las versiones pueden variar):

```
Collecting flask
  Downloading flask-3.1.2-py3-none-any.whl
Collecting Werkzeug>=3.1.0
Collecting Jinja2>=3.1.2
...
Successfully installed Jinja2-3.1.6 MarkupSafe-3.0.2 Werkzeug-3.1.3 blinker-1.9.0 click-8.3.0 flask-3.1.2 itsdangerous-2.2.0
```

> **¿Por qué instaló 7 paquetes si pedí uno?** Porque Flask **depende** de otros paquetes (Werkzeug, Jinja2, etc.). `pip` los instala automáticamente. A eso se le llama **dependencias transitivas**.

### Verificar la instalación

```bash
python -c "import flask; print(flask.__version__)"
# 3.1.2

pip show flask
# Name: Flask
# Version: 3.1.2
# Location: /home/ramses/proyectos/mi_primera_web/venv/lib/python3.13/site-packages
```

> **Dato clave**: fijate en `Location`. Si la ruta contiene `venv`, la instalación fue **dentro del entorno**. Si dice `/usr/lib/python3/...`, algo falló (probablemente no activaste el venv).

### Guardar la receta

```bash
pip freeze > requirements.txt
```

Así, si mañana se borra el entorno, lo reconstruís con:

```bash
pip install -r requirements.txt
```

<br>

## 4. El "Hola Mundo" de Flask

Creá un archivo llamado `app.py` en la carpeta del proyecto:

```python
# app.py
from flask import Flask

# Creamos la aplicación. __name__ le indica a Flask dónde está este archivo.
app = Flask(__name__)

# Cuando alguien visite la ruta "/", se ejecuta la función de abajo.
@app.route("/")
def inicio():
    return "¡Hola Mundo desde Flask!"

# Esto hace que el servidor arranque solo si ejecutamos este archivo directamente.
if __name__ == "__main__":
    app.run(debug=True)
```

<br>

## 5. Explicación línea por línea

### `from flask import Flask`

Importa la clase `Flask` desde el paquete que instalamos con `pip`.
Es lo mismo que hicimos con `from modelos.juego import Juego`: traer una clase para usarla.

### `app = Flask(__name__)`

Crea **la aplicación**. `app` es un **objeto** de la clase `Flask` (¡POO otra vez!).
El `__name__` le dice a Flask desde qué archivo se está ejecutando, para que pueda ubicar recursos como plantillas o archivos estáticos.

> **¿Qué es `__name__`?** Es una variable que Python crea solo en cada archivo. Si el archivo se ejecuta directamente, vale `"__main__"`; si se importa desde otro, vale el nombre del módulo. Es la primera vez que la usamos, pero es una convención estándar en Python.

### `@app.route("/")`

Esta línea es la que conecta una **dirección** con una **función**:

> *"Cuando llegue una petición a `/`, ejecutá la función que está justo debajo."*

Ese `@` es un **decorador**. Todavía no lo estudiamos en profundidad: por ahora alcanza con entender que **modifica el comportamiento de la función que sigue** sin que tengamos que cambiar su código.

| Parte | Significado |
|-------|-------------|
| `@app.route` | "Registrá una ruta en esta aplicación" |
| `"/"` | La dirección: la raíz del sitio (`http://127.0.0.1:5000/`) |
| `def inicio():` | La función que responde a esa dirección |

### `return "¡Hola Mundo desde Flask!"`

Lo que la función devuelve es **lo que el navegador recibe**. En este caso, texto plano.
Más adelante veremos cómo devolver HTML completo.

### `app.run(debug=True)`

Arranca el **servidor de desarrollo**. `debug=True` activa dos cosas muy útiles:

1. **Recarga automática**: al guardar `app.py`, el servidor se reinicia solo.
2. **Mensajes de error detallados** en el navegador.

> ⚠️ **Importante**: `debug=True` es solo para **desarrollo**. En producción (cuando el sitio está publicado) debe ir en `False`, porque muestra información interna del código.

### `if __name__ == "__main__":`

Evita que el servidor arranque si el archivo se **importa** desde otro lado.
Si ejecutamos `python app.py`, `__name__` vale `"__main__"` y el servidor arranca.

<br>

## 6. Ejecutar el servidor

```bash
python app.py
```

Salida esperada:

```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
```

Abrí el navegador en **http://127.0.0.1:5000** (o **http://localhost:5000**) y vas a ver:

```
¡Hola Mundo desde Flask!
```

> **¿Qué significan esos números?**
> - `127.0.0.1` → "esta misma máquina" (*localhost*).
> - `5000` → el **puerto**, la "puerta" por donde el servidor escucha. Flask usa 5000 por defecto.

Para detener el servidor: **`Ctrl + C`** en la terminal.

<br>

## 7. ¿Qué pasa por dentro?

```
 Navegador                         Servidor Flask
 ─────────                         ──────────────
 GET /          ──────────────►    busca una ruta que coincida con "/"
                                        │
                                        ▼
                                  ejecuta inicio()
                                        │
                                        ▼
 "¡Hola Mundo..." ◄──────────────  devuelve el texto como respuesta
```

1. El navegador pide `GET /`.
2. Flask busca en su **tabla de rutas** cuál coincide con `/`.
3. Encuentra `inicio()` y la ejecuta.
4. El valor que devuelve se envía al navegador.
5. El navegador lo muestra.

Si la ruta **no existe**, Flask responde **404 Not Found**. Probalo: entrá a `http://127.0.0.1:5000/cualquiercosa`.

<br>

## 8. Agregar una segunda ruta

Un sitio con una sola página es aburrido. Sumemos otra ruta a `app.py`:

```python
@app.route("/acerca")
def acerca():
    return "Página acerca de mi primer sitio con Flask"
```

Guardá el archivo (con `debug=True` el servidor se reinicia solo) y visitá:

```
http://127.0.0.1:5000/acerca
```

> **Cada ruta = una función**. Si dos funciones usan la misma ruta, Flask se queda con la primera y avisa del conflicto.

<br>

## 9. Errores comunes

| Síntoma | Causa | Solución |
|---------|-------|----------|
| `ModuleNotFoundError: No module named 'flask'` | El entorno no está activado o Flask se instaló en otro lado | `source venv/bin/activate` y `pip install flask` de nuevo |
| `Address already in use` / puerto ocupado | Ya hay un servidor corriendo en el puerto 5000 | `Ctrl + C` en la otra terminal, o usar `app.run(debug=True, port=5001)` |
| La página no cambia al guardar | `debug=True` no está activo o el servidor no recargó | Reiniciar con `Ctrl + C` y `python app.py` |
| `404 Not Found` | La ruta no existe o está mal escrita | Revisar que el `@app.route` coincida exactamente con la URL |
| `externally-managed-environment` (Debian) | Intentaste instalar fuera del entorno | Activar el venv y reinstalar |
| El navegador no conecta | El servidor no está corriendo | Verificar la terminal: debe decir `Running on...` |
| Puerto 5000 usado por otro servicio (macOS) | AirPlay Receiver ocupa el 5000 | Usar otro puerto: `port=5001` |

<br>

## Actividades

<br>

### Actividad 1: Tu primer servidor

1. Creá la carpeta `clase23_flask` y dentro un entorno virtual.
2. Activá el entorno e instalá Flask.
3. Creá `app.py` con el "Hola Mundo" de la clase, pero cambiá el mensaje por uno propio que incluya **tu nombre**.
4. Ejecutá el servidor y verificá en el navegador.
5. Generá el `requirements.txt` con `pip freeze`.

**Entregá**: una captura del navegador mostrando tu mensaje, otra de la terminal con el servidor corriendo, y el contenido de `requirements.txt`.

> **Para pensar** (respondé en una línea): ¿por qué el mensaje cambió sin tocar el navegador, solo modificando `app.py`?

<br>

### Actividad 2: Dos rutas y un 404

Partiendo del `app.py` de la actividad 1:

1. Agregá una ruta `/sobre-mi` que devuelva un texto con tu nombre, tu curso y la materia.
2. Agregá una ruta `/materia` que devuelva el nombre del módulo y el año.
3. Verificá las tres rutas en el navegador (`/`, `/sobre-mi`, `/materia`).
4. Entrá a una dirección que **no exista**, por ejemplo `/no-existe`, y observá la respuesta.

**Entregá**: el código final de `app.py` y una captura del error 404. Respondé: **¿qué relación hay entre cada `@app.route(...)` y la función que está debajo?**

> **Pista**: no hace falta HTML todavía. Cada función puede devolver un string simple. Si querés separar visualmente, podés usar `\n` dentro del texto.

<br>

## Resumen de la clase

| Concepto | Idea para llevarte |
|----------|--------------------|
| **Flask** | Microframework web para Python |
| **Instalar** | `pip install flask` (con el venv activado) |
| **Aplicación** | `app = Flask(__name__)` |
| **Ruta** | `@app.route("/direccion")` + función que devuelve la respuesta |
| **Ejecutar** | `python app.py` → `http://127.0.0.1:5000` |
| **Detener** | `Ctrl + C` |
| **Debug** | `debug=True` recarga solo y muestra errores detallados (solo en desarrollo) |
| **404** | La ruta pedida no existe |
| **Receta** | `pip freeze > requirements.txt` |

<br>

> **Antes de la próxima entrega**: acostumbrate a este ciclo —
> **activar el entorno → ejecutar → probar en el navegador → `Ctrl + C`**.
> Es el mismo ciclo que vas a repetir en cada proyecto.

<br>

o/
