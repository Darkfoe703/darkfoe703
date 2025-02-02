---
layout: post
permalink: blog/:title
highlighter: rouge
title: "¿Qué es una API SOAP?"
date:  2025-02-02 17:00:00 -0300
image: assets/images/posts/api-soap-cloud.jpg
image-alt: "API SOAP"
categories: what-is tips develop API SOAP
excerpt: "¿Cuáles son sus características y usos?"
languaje: spanish
related: /blog/EN-what-is-API-SOAP
published: true
---

[English version]({{ site.url }}/blog/EN-what-is-API-SOAP)

![SOAP]({{ site.url }}/assets/images/posts/api-soap-cloud.jpg)

Imaginate que estás en un bar de Buenos Aires y le pedís al mozo un café con medialunas. Vos no vas a la cocina a prepararlo, ¿no? Le das tu pedido al mozo, él lo lleva a la cocina y te trae lo que querés. Bueno, una **API SOAP** es como ese mozo: un intermediario que lleva y trae información entre dos sistemas. SOAP, que significa *Simple Object Access Protocol*, es un protocolo que permite que diferentes programas se comuniquen, incluso si están escritos en distintos lenguajes o corren en diferentes sistemas operativos. Las APIs SOAP utilizan XML, ya que este protocolo fue diseñado específicamente para estructurar mensajes en XML. Esto lo diferencia de REST, que permite el uso de diferentes formatos como JSON, XML o incluso texto plano.

Por ejemplo con Python, podemos consumir o conectarnos a una API SOAP. En este caso usaremos un servicio de calculadora muy básico. Supongamos que querés sumar dos números enteros usando una API SOAP. Primero, necesitás una librería como zeep para hacer las llamadas SOAP. El código sería algo así:

```python
from zeep import Client

# Crear un cliente SOAP con el nuevo WSDL
cliente = Client('http://www.dneonline.com/calculator.asmx?WSDL')

# Consumir el servicio: sumar dos números
respuesta = client.service.Add(intA=10, intB=20)
print("Resultado de la suma:", respuesta)
```

En este caso, el servicio SOAP te devuelve como resultado la suma de los dos valores que le suministramos. Fijate que no tuviste que preocuparte por cómo está programado el servicio en el otro extremo, solo usaste el "mozo" (la API) para hacer el pedido y recibir la respuesta.

Ahora, ¿para qué se usa esto en la vida real? Bueno, las APIs SOAP son muy comunes en sistemas empresariales, como los bancos o las empresas de logística. Por ejemplo, cuando hacés una transferencia bancaria, es probable que tu banco use una API SOAP para comunicarse con otros bancos y asegurarse de que la plata llegue a destino. También se usan en sistemas de facturación electrónica, donde diferentes programas necesitan intercambiar datos de manera segura y confiable.

Otro ejemplo común es en los sistemas de reservas de pasajes aéreos. Cuando buscás un vuelo en una página web, es probable que esa página esté usando una API SOAP para consultar la disponibilidad de asientos en diferentes aerolíneas. Acá te dejo un ejemplo simplificado de cómo podría ser esa consulta:

```python
from zeep import Client

# URL del servicio SOAP de una aerolínea ficticia
url = "http://www.aerolinea.com/reservas?WSDL"

# Crear un cliente SOAP
cliente = Client(url)

# Consultar disponibilidad de vuelos
respuesta = cliente.service.ConsultarVuelos(Origen="Buenos Aires", Destino="Madrid", Fecha="2025-12-01")

print(respuesta)
```

En este caso, la API SOAP te devolvería una lista de vuelos disponibles, con sus horarios y precios. Todo esto sin que vos tengas que saber cómo funciona el sistema de la aerolínea.

Ahora, ¿por qué usar SOAP y no otras tecnologías más modernas, como REST? Bueno, SOAP tiene sus ventajas. Por ejemplo, es muy seguro y confiable, ya que incluye mecanismos para manejar errores y garantizar que los mensajes lleguen completos y en el orden correcto. Además, SOAP es independiente del lenguaje de programación, o sea que podés usarlo para conectar sistemas escritos en Java, Python, C#, o lo que sea. Eso lo hace ideal para entornos empresariales donde hay que integrar sistemas viejos con nuevos.

Pero, claro, no todo es color de rosa. SOAP puede ser un poco más complicado de implementar que REST, sobre todo si estás empezando. Los mensajes SOAP suelen ser más largos y complejos, lo que puede hacer que las respuestas sean más lentas. Además, tenés que lidiar con XML, que no es tan fácil de leer como JSON. Pero bueno, cada herramienta tiene su momento y su lugar.

En resumen, una API SOAP lleva y trae información entre sistemas, y se usa mucho en aplicaciones empresariales donde la seguridad y la confiabilidad son clave. Aunque no es la tecnología más moderna, sigue siendo una opción sólida para conectar sistemas complejos. Así que, la próxima vez que hagas una transferencia bancaria o reserves un vuelo, acordate de que detrás de todo eso hay un montón de APIs SOAP trabajando para que todo funcione sin problemas.

Cómo desarrollar una API de tipo SOAP y cuáles son las comprobaciones de errores que puede implementar lo veremos luego.

o/

