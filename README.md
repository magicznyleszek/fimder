# akabusk

Movie info displayer. Check [akabusk.smutnyleszek.com](https://akabusk.smutnyleszek.com) to see how it works.

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

- change name to something meaningful:
    - in project
    - github repo
    - domain
- add LOAD MORE RESULTS button to searchResultsCtrl for when there are more pages of results from API

Improvements:

- preload poster image and fade it in + handle errors as they will be and are happening
- add smartly loading poster to searchResult
- write smart tests for httpRetrierModule
- errorNotifier module?
- some helpful links in the movie details that open urls using title:
    - opensubtitles
    - filmweb
    - torrents? :-o

looking for name:

cinechaser
cinehunt
ffer
ffinder
fimd
fimder
feek
feeker
flook
flooker
homage
humt
meek
meeker
mfinder
minder
mlook
mlooker
mooker
moseeker
movier
iseemov
semov
vidi
vivevo
