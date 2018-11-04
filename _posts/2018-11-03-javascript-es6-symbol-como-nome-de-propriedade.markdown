---
layout: post
title:  "JavaScript ES6 Symbol como nome de propriedade"
date:   2018-01-07 10:24:51 -0300
categories: jekyll update
---

> Don’t program by coincidence
>
> &mdash; <cite>The Pragmatic Programmer, Andrew Hunt e‎ David Thomas</cite>

Durante uma aula do [Willian Justen](https://twitter.com/Willian_justen) sobre ES6, ele colocou um [Symbol](https://developer.mozilla.org/pt-BR/docs/Glossary/Symbol) (veja também [ES6 In Depth: Symbols](https://hacks.mozilla.org/2015/06/es6-in-depth-symbols/)) entre colchetes para usá-lo como key de um objeto definido por meio da sintaxe object literals. Por que exatamente foi necessário? O código era mais ou menos assim: 

{% highlight javascript %}
let foo = Symbol('name')
let obj = { 
    [foo]: 'value'
}
{% endhighlight %}

O que `[foo]` significa? Resolvi entender precisamente como esses conceitos básicos funcionam—em vez de aceitá-los como faço às vezes :)

## Object literals e as keys de um objeto
[Object literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals) é uma sintaxe usada para definir objetos em JavaScript. É basicamente uma lista de `key:value` envolvida por chaves `{ }`. A key também pode ser entendida como o nome de uma propriedade de um objeto.

{% highlight javascript %}
let myObj = { 
    name: 'Thiago Colares',
    city: 'Salvador'
}
{% endhighlight %}

Mas é importante entender que na sintaxe acima a chave [precisa ser uma string válida](http://ecma-international.org/ecma-262/5.1/#sec-11.1.5). Se não for, o JavaScript tentará transformar a chave em string [(fazendo typecast usando .toString)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors) e só. Resultado:

{% highlight javascript %}
let bar = Symbol('name')
let obj = {
    bar: true, // a key será a string 'bar', não o Symbol bar!
    123: true, // a key será a string '123'
    'oxe': true, // a key será a string 'oxe'
}
{% endhighlight %}

## Keys de objetos não são feitas só de string
O ECMAScript 2015 introduziu a funcionalidade [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names). Assim, toda key definida entre colchetes `[ ]` terá seu valor computado. Pode ser uma expressão, objeto, Symbol etc. Olhe:

{% highlight javascript %}
let person = {name: 'Thiago Colares', city: 'Salvador'}
let bar = Symbol('name')
let nick = "colares"
let obj = {
    bar: true, // a key será ‘bar’
    [bar]: true, // a key será o Symbol bar
    123: true, // a key será '123'
    'oxe': true, // a key será 'oxe'
    [10 + 40]: true, // a key será '50'
    [`I'm ${nick}`]: true, // a key será "I'm colares"
    [person]: true, // a key será o objeto person
    [bomb]: true, // Uncaught ReferenceError: bomb is not defined
}
{% endhighlight %}

Note que se você usar uma palavra não definida dentro do `[ ]`, um erro será retornado: `Uncaught ReferenceError: bomb is not defined`.

## Conclusões
* `[ ]` foi usado para interpretar a palavra bar como o Symbol definido anteriormente — em vez de transforma-la na string ‘bar’;
* É possível usar Symbol como key de um objeto — spoiler: ele não é enumerável e, portanto, tem comportamentos diferentes das string keys;
* Recomendo ler sobre Symbols, um novo tipo de dado primitivo introduzido no ES6. É imutável, único e é muito útil.

No fim das contas, esse código:
{% highlight javascript %}
let bomb = 'tnt'
let boom = {
    [tnt]: true
}
{% endhighlight %}

É só um syntax sugar, ou melhor, [açúcar sintático](https://pt.wikipedia.org/wiki/A%C3%A7%C3%BAcar_sint%C3%A1tico) para:
{% highlight javascript %}
let bomb = 'tnt'
let boom = {}
boom[tnt] = true
{% endhighlight %}

Veja mais sobre [a notação com ponto ou colchete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors) para acessar ou definir propriedades de um objeto.
