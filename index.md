---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---


<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110664579-1"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-110664579-1');
    </script>
	<meta charset="utf-8">
	<title>Thiago Colares</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
    <link rel="stylesheet" href="https://cdn.rawgit.com/necolas/normalize.css/master/normalize.css">
    <link rel="stylesheet" href="https://cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#455A64">
</head>

<body id="home">
    <main class="wrapper">
    <section class="container" id="grids">
        <figure class="profile-avatar">
                <img src="assets/images/avatar-thiago-colares.JPG" alt="">
        </figure>
        <h2>I'm Thiago Colares</h2>
        <p>
            Entrepreneur, agile manager, and full stack developer. Co-founder of <a href="https://www.agilize.com.br">Agilize Cloud Accounting</a>.
        </p>
    </section>
    <section>
            {% include social.html %}
    </section>
    <footer class="footer">
        <section class="container">
            <p>
                <small>Created with <a href="https://jekyllrb.com/">Jekyll</a> and proudly designed with <a href="https://milligram.io/">Milligram</a> -- by my friend <a href="https://cjpatoilo.com" title="CJ Patoilo" target="_blank"> CJ Patoilo</a>. Licensed under the<a href="https://github.com/colares/colares.github.io/blob/master/LICENSE" title="MIT License" target="_blank"> GNU General Public License v3.0</a>.</small>
            </p>
        </section>
    </footer>
</main>
    
</body>