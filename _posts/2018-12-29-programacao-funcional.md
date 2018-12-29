---
layout: post
title:  "Conceitos básicos de programação funcional para você usar hoje"
date:   2018-12-29 12:10:12 -0300
categories: [blog]
tags: [programação, funcional]
---

Os conceitos básicos de programação funcional são simples e me tornaram um programador melhor: código com menos bugs, testes unitários triviais, código mais claro e maior produtividade. Há um tempo eu fiz uma _talk_ interna na Agilize sobre isto, mas ainda vejo muita gente nas comunidades que não usa. Espero que esse texto melhore sua forma de programar também.


# O que é programação funcional?
**Programação funcional** é um **paradigma de programação** que trata a computação como uma avaliação de **funções matemáticas** e que **evita estados ou dados mutáveis**.

Ou seja, você programará **conferindo características de funções matemáticas** às funções do seu código.

# Benefícios da programação funcional

* **Mais código com menos bug,** pois reduz os efeitos colaterais;
* **Facilita testes unitátios,** pois o comportamento depende só das entradas;
* **Código mais fácil de manter,** pois *inputs* e *outputs* são explícitos;
* **Mais código em menos tempo,** pois facilita reuso e composição.

# Como adotar programação funcional?

Você pode adotar agora mesmo, na sua próxima função. Não é necessário migrar seu código todo para o paradigma funcional. E nem mesmo usar só com linguagens puramente funcionais. Se a linguagem que você usa tem funções, você pode usar programação funcional e combinar com outros paradigmas, como OO.

Mas antes de ver os exemplos, vamos alinhar nossa definição de função.

# Função segundo a matemática
Na matemática, função é uma relação de um conjunto **_A_** com um conjunto **_B_**. Dado **_x_** um elemento de **_A_** e **_f(x) = y_** um elemento de **_B_**, a relação **_f_** é função se atender à duas características especiais:
1. **_y_** depende única e exclusivamente de **_x_**;
1. **_f_** associa **_x_** a um único valor de **_y_**.

Se a partir de um mesmo **_x_** eu chego a dois elementos distintos de **_B_**, esta relação não é uma função.
<figure>
  <img src="/assets/img/2018-12-15-programacao-funcional/diagrama-funcao-nao-funcao.svg" alt="drawing" width="100%"/>
  <figcaption>Fig.1 Duas relações <strong><em>f</em></strong>: (i) é função, mas (ii) não é função, pois <strong><em>f</em></strong> associa <strong><em>x</em></strong> a mais de um elemento de <strong><em>B</em></strong>.</figcaption>
</figure>
 
 
# Função segundo a computação
Na computação, uma função é um bloco de código que executa uma tarefa e retorna um resultado&mdash;implicita ou explicitamente. Você pode reusar este mesmo bloco várias vezes no seu código.

# Função pura segundo a computação

Ainda na computação, uma **função pura** é uma função que tem as seguintes características:
1. Sem _inputs_ ou _outputs_ ocultos&mdash;**transparência referencial**;
1. Mesmo parâmetro, mesmo resultado sempre&mdash;**idempotência**.

Note então que uma função pura na computação é basicamente uma função segundo a matemática matemática!

# Transparência referencial
Sem _inputs_ ou _outputs_ ocultos.

Vamos ver os problemas existentes na classe `Calendar` a seguir. Eles são pequenos, mas o suficiente para causar estragos e se aplica à várias linguagens:
{% highlight php %}
<?php
class Calendar {
    public $defaultInterval = "P1D";
    
    // ...

    function addOneDay($date) {
        return $date->add(new DateInterval($this->defaultInterval));
    }
}
{% endhighlight %}

Quais são os problemas dessa classe?

### _Inputs_ ocultos

O método `addOneDay` usa internamente `defaultInterval` para definir o intervalo. Mas o valor de `defaultInterval` pode ser modificado externamente sem você perceber e o método retornará um valor insperado:
{% highlight php %}
<?php
$calendar = new Calendar();
$calendar->defaultInterval = 'P2D'; // redefiniram, e você não viu

$now = new DateTime;
// $now --> 2018-12-15

$nowAddedInOneDay = $calendar->addOneDay($now);
// $nowAddedInOneDay --> 2018-12-17 (esperado: 2018-12-16)
{% endhighlight %}

**Algumas formas de resolver:** trazer a `defaultInterval` (que é uma ISO 8601 duration specification) como _string_  para dentro de `addOneDay` ou transforma-la em uma constante. Assim, você garante que somente `$date` modificará o resultado do método:
{% highlight php %}
<?php
class Calendar {
    // ...
    
    function addOneDay($date) {
        return $date->add(new DateInterval("P1D"));
    }
}
{% endhighlight %}


### _Outputs_ ocultos
No PHP, assim como em várias outras linguagens, objetos são passados por referência como argumentos de funções. Já vi muito programador mal informado introduzir *bug* assim: 
{% highlight php %}
<?php
$calendar = new Calendar();

$now = new DateTime;
// $now --> 2018-12-15

$nowAddedInOneDay = $calendar->addOneDay($now);
// $nowAddedInOneDay --> 2018-12-16
// $now --> 2018-12-16 (foi passado por referência e também foi atualizado!)
{% endhighlight %}

**Uma forma de resolver:** faça um `clone` do objeto `$date` dentro da função. Assim, você garante que o objeto externo não será modificado e remove um _output_ oculto.
{% highlight php %}
<?php
class Calendar {
    // ...
    
    function addOneDay($date) {
        $date = clone $date;
        return $date->add(new DateInterval("P1D"));
        // ou simplesmente:
        // return (clone $date)->add(new DateInterval("P1D"));
    }
}
{% endhighlight %}

Agora, o resultado de `addOneDay` depende exclusivamente de `$date`. E não modifica nenhuma outra coisa inadivertidademente.

Existem várias formas de resolver esses tipos de problemas. O importante é você garantir que não existam _inputs_ nem _outputs_ ocultos indesejados.

# Idempotência
Mesmo parâmetro, mesmo resultado sempre.

Se sua função tem transparência referencial, ela é idempotente (conclusão minha, sem prova matemática). 

Ou seja, se a função só depende dos argumentos para gerar o resultado e você passa os mesmos argumentos, o resultado tem que ser o mesmo. Se não for, existe algum *input* implítico. E, por tanto, a função não tem transparência referencial.

Exemplo bobo de uma função JavaScript que não é idempotente:

{% highlight javascript %}
Math.random();
// 0.04912023550589373

Math.random();
// 0.9020578857167636

Math.random();
// 0.6453029357741913
{% endhighlight %}



Exemplo menos bobo: em JavaScript, já li que a função `slice()` é idempotente, mas a `splice()` não é idempotente. **Eu discordo: ambas são idempontentes.**

{% highlight javascript %}
var arr = [1, 2, 3, 4, 5];

arr.slice(1,4);
// (3) [2, 3, 4]

arr.slice(1,4);
// (3) [2, 3, 4]

arr.slice(1,4);
// (3) [2, 3, 4]
{% endhighlight %}

Cada vez que eu executo `slice()`, ela retorna uma *shallow-copy* de parte de um array em um novo objeto array. Não importa quantas vezes eu chame `slice()` no mesmo array. O retorno é sempre igual. 

Já a `splice()`:

{% highlight javascript %}
var arr = [1, 2, 3, 4];

arr.splice(0,2);
// (2) [1, 2]

arr.splice(0,2);
// (2) [3, 4]

arr.splice(0,2);
// []
{% endhighlight %}

Cada vez que eu chamo `splice()`, ela retorna um resultado diferente.
 
 Mas isso acontece porque ela altera o conteúdo do array enquanto remove os elementos e os retorna. Na segunda chamada à função, **o array já é outro**. O array também é argumento da função, **só que é implícito**. Por isso o resultado mudou. 

De fato `splice()` é idempotente. Só que ela não é pura porque não tem transparência referencial.

# Conclusão
Minha sugestão? Use funções puras sempre que puder ou fizer sentido.

Suas funções e métodos são previsíveis, com inputs explícitos e sem efeitos colaterais. Isso lhe dará grande cofiança nos testes e legibilidade no código. Note que você pode usar esses conceitos junto com conceitos de Orientação a Objetos.

Mas esta é só a ponta do _icerberg_.

Espero que os conceitos deste texto lhe ajudem a usar funções puras em funções como `filter()`, `map()`, `find()`, `reduce()`, presentes em várias linguagens. E lhe ajudem também a explorar outras coisas, como monads, imutabilidade, recursão, polimorfismo paramétrico, currying, closures, functors, memoização, avaliação tardia etc.

Para fechar, selecionei umas frases do [The Zen of Python](https://www.python.org/dev/peps/pep-0020/):
* *Explicit is better than implicit.*
* *Flat is better than nested.*
* *If the implementation is hard to explain, it's a bad idea.*
* *If the implementation is easy to explain, it may be a good idea.*

Você já pode melhorar **agora** a sua forma de programar.