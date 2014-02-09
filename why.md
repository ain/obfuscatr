---
layout: default
title: Why?
description: What is spam, how it gets to your email inbox and how obfuscatr prevents it. 
---

# {{ page.title }}

## <span>Q:</span> Why are so many of us afraid of making their email address accessible?
 
Latest studies show that over 97% of the spam is being sent to addresses that have been posted on public websites. In most cases they look like this:

<code>&lt;a href="mailto:me@mydomain.com"&gt;me@mydomain.com&lt;/a&gt;</code>

or even without a link:

<code>me@mydomain.com</code>

## <span>Q:</span> So how should I post the email then?

1st option:


> post the email like _me [at] mydomain.com_ or replace an @ sign with a respective graphic. You can't click it, it's not a link and New message window is not going to pop up. So your client, a friend or mom just has to remember it for a minute, open the the New email window and type it in. Yes, it's clumsy and it might not work. Spammers are smart.

2nd option:

> call your IT. Tell him to use <abbr title="Domain Name Server blacklist">DNSBL</abbr>, install SpamAssassin, configure the mail server to make <abbr title="Reverse DNS lookup">rDNS</abbr> and investigate the possibilities of using <abbr title="Disposable Email Addressing">DEA</abbr>. Excuse me, what was that again? Right. Let's just move on.

3rd option:

> Use address munging.

## <span>Q:</span> What is address munging and why?

One of the most common ways for the spammers to get your email address is to use a specific software, an harvesting bot, that spiders websites, public mailing list archives or any other sites for emails.
Address munging would basically mean changing your email address into something they can't detect. It is the obfuscation process.

## <span>Q:</span> How do I obfuscate an email?

Use <a href="obfuscate.html" title="Obfuscate your email">obfuscatr</a>. It turns your email into a bunch of code that you can copy and paste to your site.

If you are using Mac, you may also want to download [obfuscatr Dashboard widget](download.html).
