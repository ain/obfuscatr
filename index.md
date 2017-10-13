---
layout: default
title: About
description: Introduction to email spam, statistics, research, articles and tools to prevent spam.
---

# {{ page.title }}

obuscat<span>r</span> is email address obfuscator that you can use [online](obfuscate.html "Obfuscate your email online") or on your [Mac OS X Dashboard](download.html "Download obfuscatr Dashboard widget").

Its purpose is to disguise spam bots by providing you with an encoded email that you can paste to your home page or a blog so that the email couldn't be picked up by these bots.

The code provided by obuscat<span>r</span> consists of a <code>&lt;script&gt;</code> tag with hexadecimal representation of an email <code>mailto</code> link. As Googlebot and other bots don't render client-side scripts the email in such form will also be excluded from the search results.

As of version 1.1.0 you also have an option to encode an email without JavaScript. In this case your email will be encoded to something like <span>%6d%79%40%65%6d%61%69%6c%2e%63%6f%6d</span>. In this case a link to your email would look like this: <br /><code>&lt;a href="mailto:<span>%6d%79%40%65%6d%61%69%6c%2e%63%6f%6d</span>"&gt;Mail me&lt;a&gt;</code>.

To use this option just tick off the checkbox on the back side of the widget.

More on [reasons to use obfuscatr](why.html "Find out more"). Also, see the news on [flash tekkie](http://tekkie.flashbit.net/tag/obfuscatr "obfuscatr articles").

Awards &amp; references:

![obfuscatr 1.2 - SOFTPEDIA '100% CLEAN' AWARD](softpedia_clean_award_f.gif) ![obfuscatr 1.1.0 featured in Macworld Italy of March 2008](macworld_italy_march_2008.jpg)

Further reading:
- [Where spam comes from](http://news.bbc.co.uk/2/hi/technology/2969783.stm) (BBC News)
- [Address munging](http://en.wikipedia.org/wiki/Address_munging) (Wikipedia)
- [Nine ways to obfuscate e-mail addresses compared](http://techblog.tilllate.com/2008/07/20/ten-methods-to-obfuscate-e-mail-addresses-compared/) (research by Silvan Mühlemann)
