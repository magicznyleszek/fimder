![coverage-shield-badge-1](https://img.shields.io/badge/coverage-92.95%25-brightgreen.svg)

# fimder

Simple OMDb movie finder. Check [fimder.smutnyleszek.com](https://fimder.smutnyleszek.com) to see how it works.

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

Mandatory:

- test on FF, IE, Safari, iOS Safari, iOS Chrome
- add LOAD MORE RESULTS button to searchResultsCtrl for when there are more pages of results from API

Improvements:

- preload poster image and fade it in + handle errors as they will be and are happening
- add smartly loading poster to searchResult
- write smart tests for httpRetrierModule
- errorNotifier module?
- some helpful links in the movie details that open urls using title:
    - opensubtitles
    - filmweb
    - torrents? :-o #criminal
