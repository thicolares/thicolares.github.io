---
layout: post
title:  "htmlentities() vs htmlspecialchars() for a valid XML with PHP"
date:   2019-04-30 20:11:58 -0300
categories: [xml]
tags: [xml, php, htmlentities, htmlspecialchars, chars]
---

In Brazil, electronic invoice issuance is compulsory for 100% of issuers. It is the greatest electronic invoice infrastructure I have seen so far and run on top of the SOAP messaging protocol, using XML and the e-signature XMLDsig format.

A small, although interesting, challenge we faced years ago: how to properly escape special characters in XML with PHP?

## htmlentities()

We started using [`htmlentities()`](https://www.php.net/manual/en/function.htmlentities.php) to scape some contents of the XML. This worked well for a while [by coincidence](https://pragprog.com/the-pragmatic-programmer/extracts/coincidence "Programming by Coincidence"). Then we noticed `htmlentities()` was not well suited to create safe strings to XML. Because it transforms any special character to [HTML entities](https://developer.mozilla.org/en-US/docs/Glossary/Entity), **including some that are invalid for the XML.**

Example:

{% highlight php %}
php > var_dump(htmlentities('Pêra & maçã'));
string(35) "P&ecirc;ra &amp; ma&ccedil;&atilde;"
{% endhighlight %}

The `&amp;` entity is valid to XML, but `&ecirc;`, `&ccedil;`, and `&atilde;` are not!

If you validate this XML:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <body>P&ecirc;ra &amp; ma&ccedil;&atilde;</body>
</note>
{% endhighlight %}

It would throw:

    error on line 3 at column 15: Entity 'ecirc' not defined


## XML recommendation

According to the [W3C XML recommendation](https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent), this is the set of general entities specified for scaping left angle bracket, ampersand, and other delimiters in an XML document:

    < (replace with &lt;) 
    > (replace with &gt;) 
    & (replace with &amp;) 
    ' (replace with &apos;) 
    " (replace with &quot;) 

Other HTML entities are invalid.


## htmlspecialchars()

**To solve that, you have to use [`htmlspecialchars()`](https://www.php.net/manual/en/function.htmlspecialchars.php) instead.** This function converts only a small set of special characters to HTML entities ([see "Performed translations" and its flags](https://www.php.net/manual/en/function.htmlspecialchars.php)):

{% highlight php %}
php > var_dump(htmlspecialchars('Pêra & maçã'));
string(18) "Pêra &amp; maçã"
{% endhighlight %}

If you validate this XML:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <body>Pêra &amp; maçã</body>
</note>
{% endhighlight %}

It would throw:

    Valid XML

## Bottom line

Use htmlspecialchars() if you want to build a safe XML. htmlentities() is not a guaranteed way to do that.



