// -----------------------------------------------------------------------------
// Movie model that expects data to follow omdbapi.com format.
// -----------------------------------------------------------------------------

angular.module('movieDetailsModule').factory('Movie', [
    'assert',
    (assert) => {
        class MovieModel {
            static initClass() {
                MovieModel.notAvailableProprety = 'N/A';
                MovieModel.requiredType = 'movie';
                MovieModel.requiredProperties = [
                    'imdbID',
                    'Title',
                    'Released',
                    'Runtime',
                    'Genre',
                    'Director',
                    'Writer',
                    'Actors',
                    'Plot',
                    'Awards',
                    'Language',
                    'Country',
                    'Poster',
                    'imdbRating',
                    'imdbVotes'
                ];
            }

            constructor(movieData) {
                this._verifyAllData(movieData);
                this.id = movieData.imdbID;
                this.title = movieData.Title;
                // we want all optional properties to be defined only if their
                // content makes sense, i.e. no "N/A" visible for user
                this._setOptionalText('releaseDate', movieData.Released);
                this._setOptionalText('releaseDateFull', new Date(movieData.Released));
                this._setOptionalText('runtime', movieData.Runtime);
                this._setOptionalArray('genres', movieData.Genre);
                this._setOptionalArray('directors', movieData.Director);
                this._setOptionalArray('writers', movieData.Writer);
                this._setOptionalArray('actors', movieData.Actors);
                this._setOptionalText('plot', movieData.Plot);
                this._setOptionalText('awards', movieData.Awards);
                this._setOptionalArray('languages', movieData.Language);
                this._setOptionalArray('countries', movieData.Country);
                this._setOptionalText('poster', movieData.Poster);
                this._setOptionalText('rating', movieData.imdbRating);
                this._setOptionalText('ratingVotes', movieData.imdbVotes);

                this._pacifyRatingVotes();
            }

            _setOptionalText(propertyName, rawData) {
                if (rawData !== MovieModel.notAvailableProprety) {
                    this[propertyName] = rawData;
                }
            }

            _setOptionalArray(propertyName, rawData) {
                if (rawData !== MovieModel.notAvailableProprety) {
                    this[propertyName] = rawData.split(', ');
                }
            }

            _verifyAllData(movieData) {
                // checks if all the necessary strings are there
                for (const propertyName of MovieModel.requiredProperties) {
                    assert.isString(movieData[propertyName]);
                }
                assert.isTrue(movieData.Type === MovieModel.requiredType);
            }

            _pacifyRatingVotes() {
                if (
                    this.ratingVotes &&
                    this.ratingVotes.length > 3 &&
                    this.ratingVotes[this.ratingVotes.length - 4] === ','
                ) {
                    this.ratingVotes = this.ratingVotes.substr(0, this.ratingVotes.length - 4);
                    this.ratingVotes += 'k';
                }
            }
        }

        MovieModel.initClass();

        return MovieModel;
    }
]);
