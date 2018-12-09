---
layout: post
title:  "Revisão de código: lições do mundo real"
date:   2018-12-09 16:31:12 -0300
categories: [blog, travel]
tags: [hot, summer]
---

A Revisão de código (code review) é uma prática de desenvolvimento de software em que um código escrito precisa ser revisado por outras pessoas do time antes de ser entregue ao ambiente de produção. A prática surgiu com [Michael E. Fagan na IBM, década de 70](https://researcher.watson.ibm.com/researcher/view_page.php?id=6981), mas parece que demorou para ficar popular no mundo ágil (veja os reports da [VersionOne](http://stateofagile.versionone.com/)).

Conseguimos implantar revisão de código na [Agilize](https://www.agilize.com.br) no começo de 2017, após várias tentativas sem sucesso. Por que desta vez deu certo? E o que aprendemos nesses 2 anos? Vou tenta resumir nessas mal traçadas linhas.

## Os 3 grandes benefícios da revisão de código

### 1. Fortalece o sentimento de propriedade coletiva
**Código tem dono.** Eu gosto de pensar que código tem dono sim, porque você precisa ter responsabilidade sobre o que faz. Mas essa propriedade e responsabilidade são do time também, pois estão todos juntos em um único objetivo. E no nosso time, poucas coisas são feitas por uma pessoa só, pois há pareamento, discussão, reuso de código etc. Ou seja, então a propriedade é realmente coletiva.

Se você cria um código e o submete para revisão do time, então você estabelece mais uma forma de fortalecer essa propriedade coletiva. Quando o time colabora em um código, ele sente-se partícipe da entrega&mdash;porque de fato é; e reforça o sentimento de "somos donos do projeto". Todo mundo ganha.

### 2. Melhora a qualidade da entrega
**Um olhar sobre os pequenos erros.** Revisão de código funciona muito bem para notar erros de baixa complexidade. Comparações erradas, fluxos errados, variáveis duplicadas, erros de digitação, testes ausentes, violação do padrão de código, formatação do código etc. Estas coisas podem parecer pequenas, mas às vezes passam despercebidas mesmo usando testes automatizados (nós utilizamos muito) e são suficientes para causar grandes transtornos.

**Mas pode iniciar grandes discussões.** Eventualmente, uma revisão de código pode gerar uma discussão maior. Geralmente é sinal de alguma falta de alinhamento na atividade ou uma decisão equivocada. Independente do caso, quando isso acontece a gente geralmente encerra a revisão e voltamos um passo atrás. Fazemos algum pareamento ou uma discussão maior para resolver.

**Outras pessoas olharão seu código.** Uma coisa engraçada: você acaba sendo mais caprichoso ou testando mais porque sabe que outros olharão seu código. Isso também influencia positivamente na qualidade do código. Frequentemente ouço membros do time fazendo correções antecipadamente e dizendo _"Vou deixar isso aqui logo arrumado porque X vai notar"_.

> Note que depender do seu contexto, você deve combinar revisão de código com várias outras estratégias de programação, validação, teste, deploy etc.

### 3. Compartilha conhecimento
**Reduz o efeito caminhão**. Um programador que trabalhava com a gente em outra empresa me contou há uns anos: _"O que acontece com o time se um caminhão passar por cima de pessoa X?"_. É uma anedota meio pesada, mas a mensagem é: a informação precisa circular e se alguém sair do time repentinamente, os efeitos precisam ser pequenos. A revisão de código ajuda todo time a se familiarizar com outros trechos do código.

**Via de mão dupla**. Os revisores não só aprendem, como ensinam também. Durante a revisão, muitas dicas e conhecimentos trafegam em todas as direções.

## Como conseguimos implantar revisão de código?
### Tínhamos os valores corretos
O principal desafio que encontrei para implantar revisão de código foram os aspectos culturais do time. Nossos valores e princípios são basicamente inspirados no Manifesto Ágil e no XP. Depois que alinhamos e fortalecemos nossos aspectos culturais (no fim de 2016), conseguimos transformar a revisão de código em um hábito. E a própria recompensa da revisão de código a tornou sólida no time. 

### Entendemos os objetivos da revisão de código
Com os valores corretos, é preciso estudar como a revisão de código funciona. Saber o que a revisão de código resolve ou não. Por exemplo, nós não usamos a revisão de código para fazer análises muito profundas do código. Assim, conseguimos otimizar o tempo. Do contrário, o time perderia muito tempo na revisão e sentiria que o tempo poderia ser melhor utilizado. Mas quando temos necessidade de uma análise mais detalhada, a gente faz pareamento, por exemplo. 

Ou seja, usar a revisão de código de maneira inadequada para a sua realidade pode causar problemas e criar resistência no time.

Nesta fase, listei os problemas que poderíamos resolver com a revisão de código e fizemos apresentações internas&mdash;uma minha e outra de outro membro do time.

### Comprei a ideia com o time
No começo, as coisas não funcionaram direito. Mesmo após estudar como funciona, o gestor precisa dar tempo para o time testar, avaliar e adaptar à sua realidade. Isso pode demorar alguns ciclos. E naturalmente, vai se equilibrar. Pra gente, isso se paga muito!

## Dicas e aprendizados 

### Revise o seu próprio pull request*
* Nós criamos revisões de código por meio de _pull request_

O próprio autor pode e deve revisar o seu próprio código. Nós mesmos frequentemente percebemos nossos erros e corrigimos.

### Menos código, mais revisão
<blockquote class="twitter-tweet" data-lang="pt"><p lang="en" dir="ltr">Ask a programmer to review 10 lines of code, he&#39;ll find 10 issues. Ask him to do 500 lines and he&#39;ll say it looks good.</p>&mdash; Giray Özil (@girayozil) <a href="https://twitter.com/girayozil/status/306836785739210752?ref_src=twsrc%5Etfw">27 de fevereiro de 2013</a></blockquote> 
O time acaba sub-revisando códigos muito extensos&mdash;é compreensível, você já experimentou? Geralmente, quando isso acontece é um sinal de que a atividade está maior do que deveria (poderia ter sido quebrado em atividades menores). Quando o time ganha maturidade, essas atividades ficam mais raras. Mas se acontecer, você pode fazer revisões parciais antes da entrega final também. 

### Descreva bem o seu _pull request_

Dê contexto para o seu revisor. Assim, ele saberá para o que está olhando e o que esperar. **Sempre recomendo textos objetivos ou checklists.** Imagens são bem-vindas. Vídeos e gifs, mais ainda! _Qual o problema você está resolvendo? Qual funcionalidade está entregando? Qual o comportamento esperado?_

Os _commits_ também fazer parte da documentação do _pull request_. Então, faça _commits_ pequenos, com blocos lógicos definidos, bem descritos. Isso ajudará na revisão do código.

### Minimo de 2 revisores
Há dois bons motivos para estabelecer um mínimo de 2 revisores:
1. Sentimos que é suficiente para pegar a maioria dos erros;
2. Não precisamos ficar esperando o time todo revisar para enviar o código.

Quando alguém precisa de mais revisores, pode chamar mais. Mas pesquisas mostram que, intencionalmente ou não, [um grupo maior de revisores acaba olhando menos tempo porque cada um espera que os outros façam o trabalho](https://www.atlassian.com/blog/archives/creating_optimal_reviews). Penso que também um pareamento ajudar melhor aqui, por exemplo.

### Melhor para coisas de baixa complexidade
Acredito que revisão de código não é a melhor ferramenta para fazer análises arquiteturais profundas, por exemplo. Considero isso uma armadilha. Inevitavelmente isso acontece &mdash; sobretudo quando o revisor conhece bem aquele trecho de código. Para esse tipo de necessidade, prefiro programação pareada ou algum dojo. 

### Elogie também!
A maioria das pessoas só buscam erros nos códigos. Reconheça as boas ideias também! Times bons são formados por pessoas que tem orgulho uma das outras. Deixe-as saberem disto! É uma ótima chance também para reforçar bons comportamentos com feedbacks positivos.

## Conclusão
A Revisão de código:
* fortalece o sentimento de propriedade coletiva do projeto
* melhora a qualidade das entregas
* compartilha conhecimento
* funcionará muito bem se o seu time tiver os valores certos
* requer estudo para não cair em armadilhas
* é auxiliada por várias ferramentas de controle de versão



