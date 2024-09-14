---
layout: post
title:  "Welcome to Jekyll!"
date:   2021-08-27 12:19:04 -0300
image: assets/images/posts/b.png
categories: jekyll update
highlighter: rouge
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

Jekyll requires blog post files to be named according to the following format:

`YEAR-MONTH-DAY-title.MARKUP`

Where `YEAR` is a four-digit number, `MONTH` and `DAY` are both two-digit numbers, and `MARKUP` is the file extension representing the format used in the file. After that, include the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/

Dis commodo potenti aliquam nisl pretium. Sed convallis feugiat fringilla lacinia metus habitant. Dictum varius purus aenean id per class cursus hac amet eget mattis massa. Sociis cubilia est dapibus litora commodo nascetur senectus. Rutrum natoque nostra dolor eu ac lacinia dui. Laoreet iaculis ut quisque sit pretium dolor! Senectus dictumst odio consequat tortor. Hac lacus; class est. Curae; vestibulum phasellus vulputate nisl libero risus quisque rhoncus ipsum et dolor? Elementum sed elementum quis nam. Duis risus sollicitudin etiam lobortis ultrices luctus. Vestibulum commodo cubilia volutpat malesuada cubilia dolor mus posuere nunc? Odio velit senectus!

```docker
# syntax=docker/dockerfile:1
FROM ubuntu:22.04

# install app dependencies
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install flask==3.0.*

# install app
COPY hello.py /

# final configuration
ENV FLASK_APP=hello
EXPOSE 8000
CMD ["flask", "run", "--host", "0.0.0.0", "--port", "8000"]
```

Lobortis vehicula curae; ut potenti mattis laoreet himenaeos nunc aliquam ante praesent himenaeos. Non litora conubia sagittis augue bibendum pulvinar, sem condimentum vestibulum. Pulvinar augue, aptent sapien. Netus lectus imperdiet dictumst nisi interdum tempor justo eu imperdiet. Donec proin dis molestie ornare phasellus vulputate ridiculus et tristique donec nostra. Ullamcorper vel tempus ut nullam blandit aenean gravida molestie. Eget blandit torquent libero senectus ante, vivamus fames pretium. Justo mus viverra magna parturient etiam purus, felis vivamus nec. Vehicula magnis malesuada magnis ipsum. Lorem nisl natoque fusce sed neque faucibus cum sit elementum! Imperdiet netus pellentesque sollicitudin ante ante. Ac, platea urna massa eget? Senectus primis egestas orci natoque cubilia habitant nisi adipiscing felis ad vehicula. Inceptos pretium, natoque malesuada fames tempor ligula nibh fusce tincidunt. Cursus tellus pretium mi lobortis. Donec ornare habitasse.

```py
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"
```

Nec integer viverra duis sed. Accumsan consectetur varius mus malesuada eros amet leo? Litora; quisque elementum quisque ornare blandit morbi tincidunt! Leo ultricies sodales iaculis litora phasellus dolor aliquet orci cum. Viverra leo mollis lacus vivamus libero amet justo morbi mollis ligula mollis? Nullam nullam cursus convallis commodo duis facilisi volutpat libero. Tincidunt non purus nisi dictum? Ad cursus rutrum senectus lorem? Taciti dictum cursus nec. At litora urna molestie habitant ac hendrerit eget magnis? Platea volutpat maecenas ullamcorper porta, praesent quisque feugiat tincidunt. Felis amet luctus ultricies ipsum quisque auctor diam class ridiculus. Dignissim gravida massa felis parturient urna id? Hac morbi sapien non gravida! Sodales nec porttitor ac urna vivamus sollicitudin eget non hac fusce. Ornare convallis nisl luctus vulputate sapien quisque non interdum euismod? Porta vehicula platea pellentesque purus suscipit platea netus consequat. Mollis dis feugiat volutpat. Elementum sapien hendrerit sociis.

```c
#include <stdio.h>
int main()
{
    short nro, aux;

    printf("Ingrese un número: ");
    scanf("%d", &nro);
    aux = 1;
    while (aux != nro)
    {
        printf("%d \n", aux);
        aux = aux + 1;
    }
    printf("%d \n", aux);
    return 0;
}
```

Nulla; facilisis consectetur a facilisis. Nascetur sapien ligula platea justo eget donec odio vulputate felis euismod lectus. Eget ligula eros elit. Mattis, orci porttitor integer lacinia congue? Tempus auctor risus mauris; magna lacus nisi lobortis ornare turpis felis euismod ultricies. Magna lacinia consequat odio etiam, litora sapien litora magnis. Cursus mattis amet phasellus scelerisque ligula turpis! Nisi interdum eget magnis porta arcu montes adipiscing id mi nisi praesent facilisis. Aliquam himenaeos feugiat suscipit nostra tincidunt bibendum tellus sociis, fusce dolor. Himenaeos consequat habitasse nam commodo praesent neque litora commodo netus eleifend ridiculus. Parturient lacus fringilla velit. Nostra erat euismod commodo tortor laoreet vulputate at penatibus? Iaculis taciti dis parturient accumsan senectus est nam nostra egestas. Accumsan penatibus facilisi libero.

```yml
version: '3.8'

services:
  db:
    image: postgres:14
    container_name: container_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: vaallover15
      POSTGRES_DB: task_api_db

    # ports:
    #   - "5432:5432"
    # volumes:
    #   - postgres_data:/var/lib/postgresql/data
  web:
    build: .
    container_name: container_api
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql+psycopg2://postgres:vaallover15@db:5432/task_api_db
      - DATABASE_HOST=db
    depends_on:
      - db
```

Sociis semper odio lorem parturient aliquet risus class penatibus rhoncus vitae. Eleifend dis morbi id lorem ullamcorper commodo condimentum volutpat duis lacinia. Habitant sagittis ac imperdiet penatibus nibh nibh tincidunt lectus sociosqu etiam. Egestas aliquam malesuada morbi urna ad. Posuere sodales aliquam nec facilisi vel laoreet netus, nec rutrum venenatis. Elit fermentum arcu dignissim ut lectus curae; fringilla vestibulum ligula justo lacus. Tellus posuere massa massa blandit rhoncus etiam dolor tristique augue senectus. Congue lectus ipsum scelerisque torquent volutpat. Curae;, dictumst molestie scelerisque. Amet vehicula fermentum interdum. Ultricies nostra ultrices magna. Viverra magnis enim class risus morbi, nulla ullamcorper pulvinar sed phasellus sit! Mi tristique cursus sapien taciti hac. Eros ac condimentum eleifend himenaeos fames vel et dapibus vehicula gravida mollis. Vehicula ipsum faucibus nulla sociosqu pellentesque.

Semper dignissim sodales quis sit litora ornare, phasellus aptent. Eros feugiat dapibus dignissim penatibus molestie, venenatis duis sodales. Rhoncus inceptos laoreet nibh ultrices consequat adipiscing urna integer, at netus himenaeos. Tincidunt ipsum felis luctus tincidunt dictum sapien. Faucibus dui consequat diam per ultricies parturient pretium iaculis turpis ligula interdum. Etiam mattis id nec et cum ad quam pretium primis. Ridiculus dictumst metus molestie velit porttitor pulvinar curae;, malesuada ultrices. Egestas ornare magnis tellus lacinia, fusce volutpat cum viverra nullam magna. Habitant consequat eu sapien suscipit. Orci hendrerit sodales volutpat eget cursus porta, magna dictumst elementum.

