---
layout: page
title: Winner of the SoundCloud Music Hack Day
permalink: /winner-of-the-soundcloud-music-hack-day/
image: /assets/img/music-hack-day/page-preview.jpg
---

During the Campus Party 2012 (São Paulo, Brazil), I participate in the **Music Hack Day**, a 24-hour hack marathon focused on the music industry, and won it! That hack day edition was held by the SoundCloud and Dave Haynes.

## The challenge
To create an application related to the music industry or preferably integrated with the API of some of these music platforms: 7digital, BBC Music, The Echo Nest, Gigulate, Last.fm, PeoplesMusicStore, Songkick, SoundCloud.

**I was so excited and motivated that I deployed two applications!** I literally stayed 24 hours awake.

## The winner is...
**MyWonderland**! I built a web app that finds you the place where there are more concerts performed by the artists you love.
* [Original version created on 2012](https://github.com/thicolares/MyWonderland)
    * CakePHP, Last.fm API, SongKick API, caching
* [Rebooted version created on 2018](https://github.com/thicolares/my-wonderland)
    * Regular PHP composer project, caching, Guzzle, a custom implementation of Dependency Injection, Spotify API, SongKick API

<figure>
  <img src="/assets/img/projects/my-wonderland.png" alt="My Wonderland" title="My Wonderland" class="project-banner" width="100%">
  <figcaption>Rebooted version created on 2018 as a regular PHP composer project, using cache, a custom implementation of Dependency Injection, and Spotify instead of Last.fm.</figcaption>
</figure>

MyWonderland app uses **PHP** to query the musical preferences of a user with the **Last.fm's API**. Given this data, the app fetches concerts' dates and venues (past and future) of the user's favorite artists using the **SongKick's API**.

Finally, MyWonderland outputs an list of the best places to live.

During the hack day, I also implemented queries **caching**. Which gave me additional points.

## Prize
It took me to attend the Campus Party Berlin 2012!
<figure>
  <img src="/assets/img/music-hack-day/campus-party-berlin.jpg" alt="clipping"/>
  <figcaption>Campus Party Berlin 2012: mind blowing. (1) My first international talk. (2) Hosters of JovemNerd, the most important podcast on geek and technology in Brazil. (3 and 4) Tours in Berlin, Munich, and Fürstenfeldbruck (try to pronounce that).</figcaption>
</figure>


## Clipping (PT-BR)

<figure>
  <img src="/assets/img/music-hack-day/clipping.jpg" alt="clipping"/>
  <figcaption>Set of articles published about the Music Hack Day 2012.</figcaption>
</figure>

* <a href="/assets/img/music-hack-day/clipping00.png" target="_blank">Campus Party: Applications integrated to Last.fm win tournament</a>, _iG Technology and games (the 5th largest news site in Brazil) - 2012-02-08_
* <a href="/assets/img/music-hack-day/clipping01.png" target="_blank">Music Hack Day Marathon announces winner</a>, _tecmundo - 2012-02-09_
* <a href="/assets/img/music-hack-day/clipping02.png" target="_blank">Habemus winner!</a>, _CI Exchange and Travel - 2012-02-08_
* <a href="/assets/img/music-hack-day/clipping03.png" target="_blank">Baiano wins an award at Campus Party</a>, _Bahia Notícias - 2012-02-10_
* <a href="/assets/img/music-hack-day/clipping04.png" target="_blank">Baiano wins a Campus Party award</a>, _QuemBahia.com - 2012-02-10_


