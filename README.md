# colar.es

Run

    export JEKYLL_VERSION=3.5 && docker run --rm --volume="$PWD:/srv/jekyll" --volume="$PWD/vendor/bundle:/usr/local/bundle" -p 4000:4000 -p 35729:35729 -it jekyll/jekyll:$JEKYLL_VERSION jekyll serve --force_polling --livereload