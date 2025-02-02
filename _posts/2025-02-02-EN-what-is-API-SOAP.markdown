---
layout: post
permalink: blog/:title
highlighter: rouge
title: "What is a SOAP API?"
date: 2025-01-02 19:00:00 -0300
image: assets/images/posts/api-soap-cloud.jpg
image-alt: "SOAP API"
categories: what-is tips develop API SOAP
excerpt: "What are its characteristics and uses?"
languaje: english
related: /blog/ES-que-es-API-SOAP
published: true
---

[Versión en español]({{ site.url }}/blog/ES-que-es-API-SOAP)

![SOAP]({{ site.url }}/assets/images/posts/api-soap-cloud.jpg)

Imagine you're in a bar in Buenos Aires and you ask the waiter for a coffee with croissants. You don't go to the kitchen to prepare it, right? You give your order to the waiter, he takes it to the kitchen and brings you what you want. Well, a **SOAP API** is like that waiter: an intermediary that carries information back and forth between two systems. SOAP, which stands for *Simple Object Access Protocol*, is a protocol that allows different programs to communicate, even if they are written in different languages ​​or run on different operating systems. SOAP APIs use XML, since this protocol was specifically designed to structure messages in XML. This differentiates it from REST, which allows the use of different formats such as JSON, XML or even plain text.

For example with Python, we can consume or connect to a SOAP API. In this case we will use a very basic calculator service. Let's suppose you want to add two integers using a SOAP API. First, you need a library like zeep to make the SOAP calls. The code would look something like this:

```python
from zeep import Client

# Create a SOAP client with the new WSDL
client = Client('http://www.dneonline.com/calculator.asmx?WSDL')

# Consume the service: add two numbers
response = client.service.Add(intA=10, intB=20)
print("Sum result:", response)
```

In this case, the SOAP service returns the sum of the two values ​​we supplied as a result. Note that you didn't have to worry about how the service is programmed on the other end, you just used the "waiter" (the API) to place the order and receive the response.

Now, what is this used for in real life? Well, SOAP APIs are very common in enterprise systems, such as banks or logistics companies. For example, when you make a bank transfer, your bank is likely using a SOAP API to communicate with other banks and make sure the money gets to its destination. They are also used in electronic billing systems, where different programs need to exchange data securely and reliably.

Another common example is in airline reservation systems. When you search for a flight on a website, that website is likely using a SOAP API to check seat availability on different airlines. Here is a simplified example of what that query might look like:

```python
from zeep import Client

# SOAP service URL for a fictitious airline
url = "http://www.aerolinea.com/reservas?WSDL"

# Create a SOAP client
client = Client(url)

# Check flight availability
response = client.service.CheckFlights(Origin="Buenos Aires", Destination="Madrid", Date="2025-12-01")

print(response)
```

In this case, the SOAP API would return a list of available flights, with their schedules and prices. All this without you having to know how the airline's system works.

Now, why use SOAP and not other more modern technologies, such as REST? Well, SOAP has its advantages. For example, it is very safe and reliable, since it includes mechanisms to handle errors and ensure that messages arrive complete and in the correct order. Plus, SOAP is language-agnostic, so you can use it to connect systems written in Java, Python, C#, or whatever. That makes it ideal for enterprise environments where you need to integrate old systems with new ones.

But of course, it's not all rosy. SOAP can be a bit more complicated to implement than REST, especially if you're just starting out. SOAP messages are often longer and more complex, which can make responses slower. Plus, you have to deal with XML, which isn't as easy to read as JSON. But hey, every tool has its time and place.

In short, a SOAP API carries information back and forth between systems, and is widely used in enterprise applications where security and reliability are key. While it's not the most modern technology, it's still a solid choice for connecting complex systems. So, next time you make a bank transfer or book a flight, remember that behind it all there are a ton of SOAP APIs working to make everything run smoothly.

How to develop a SOAP API and what error checks you can implement will be discussed later.

o/