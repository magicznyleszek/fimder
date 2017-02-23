// -----------------------------------------------------------------------------
// Movie model that expects data to follow omdbapi.com format.
// -----------------------------------------------------------------------------

angular.module('movieDetailsModule').factory('Movie', [
    'assert',
    'votesHumanizer',
    (
        assert,
        votesHumanizer
    ) => {
        class MovieModel {
            static initClass() {
                MovieModel.notAvailableProprety = 'N/A';
                MovieModel.requiredType = 'movie';
                MovieModel.requiredProperties = ['imdbID', 'Title'];
            }

            constructor(movieData) {
                this._verifyAllRequiredProperties(movieData);

                this.id = movieData.imdbID;
                this.title = movieData.Title;
                // we want all optional properties to be defined only if their
                // content makes sense, i.e. no "N/A" visible for user
                this._setOptionalText('releaseDate', movieData.Released);
                this._setOptionalText('runtime', movieData.Runtime);
                this._setOptionalText('plot', movieData.Plot);
                this._setOptionalText('awards', movieData.Awards);
                this._setOptionalText('poster', movieData.Poster);
                this._setOptionalText('rating', movieData.imdbRating);
                this._setOptionalText('ratingVotes', movieData.imdbVotes);
                this._setOptionalArray('genres', movieData.Genre);
                this._setOptionalArray('directors', movieData.Director);
                this._setOptionalArray('writers', movieData.Writer);
                this._setOptionalArray('actors', movieData.Actors);
                this._setOptionalArray('languages', movieData.Language);
                this._setOptionalArray('countries', movieData.Country);

                if (this.ratingVotes) {
                    this.ratingVotes = votesHumanizer.getHumanized(this.ratingVotes);
                }
            }

            _isUsefulData(rawData) {
                return rawData && rawData !== MovieModel.notAvailableProprety;
            }

            _setOptionalText(propertyName, rawData) {
                if (this._isUsefulData(rawData)) {
                    this[propertyName] = rawData;
                }
            }

            _setOptionalArray(propertyName, rawData) {
                if (this._isUsefulData(rawData)) {
                    this[propertyName] = rawData.split(', ');
                }
            }

            _verifyAllRequiredProperties(movieData) {
                // checks if all the necessary strings are there
                for (const propertyName of MovieModel.requiredProperties) {
                    assert.isString(movieData[propertyName]);
                }
                assert.isTrue(movieData.Type === MovieModel.requiredType);
            }
        }

        MovieModel.initClass();

        return MovieModel;
    }
]);
