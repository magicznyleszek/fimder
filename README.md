![coverage-shield-badge-1](https://img.shields.io/badge/coverage-95.85%25-brightgreen.svg)

# fimder

Simple OMDb movie finder. Check [fimder.smutnyleszek.com](https://fimder.smutnyleszek.com) to see how it works.

Features:

- ES6 (with Babel)
- Angular 1.6
- Karma tests
- Routing (you can copy urls!)
- SVG icons
- MADCSS
- HTTP requests auto-retrying and caching
- Responsive design
- Linters

Requirements:

1. [Jekyll](http://jekyllrb.com/)
2. [Node](https://nodejs.org)

## Building

To preview the project, you need to do three things:

1. `npm install`
2. `npm run serve`
3. open [127.0.0.1:4000](http://127.0.0.1:4000/) in the browser

## Development

What you want is to basically have two terminals:

1. `npm run serve` -- this is providing the [127.0.0.1:4000](http://127.0.0.1:4000/) "server" and watching changes on Jekyll
2. `npm run watch` -- this is watching all source files and producing dist ones

## TODO

Improvements:

- wrap each file in IIFE while babeling
- consider infinite scroll instead of load more button
- use RequireJS
- add some timeout for when loading happens for loooong time
- preload poster image and fade it in + handle errors nicely as they will be and are happening
- add smartly loading poster to searchResult
- write smart tests for httpRetrierModule
- errorNotifier module for errors?
- some helpful "Search this movie in:" links in the movie details that open urls (_blank target) using title:
    - opensubtitles
    - google
    - filmweb
    - torrents? :-o #criminal
