# colar.es

Run

```
docker run --rm -v "$PWD:/srv/jekyll" -p 4000:4000 -w /srv/jekyll ruby:2.7-slim sh -c 'apt update &&
   apt install -y build-essential && gem install bundler -v 1.17.3 && bundle install && bundle exec
  jekyll serve --host 0.0.0.0'
```