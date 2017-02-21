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
                this._verifyData(movieData);
                this.id = movieData.imdbID;
                this.title = movieData.Title;
                this.releaseDate = movieData.Released;
                this.releaseDateFull = new Date(movieData.Released);
                this.runtime = movieData.Runtime;
                this.genres = movieData.Genre.split(', ');
                this.directors = movieData.Director.split(', ');
                this.writers = movieData.Writer.split(', ');
                this.actors = movieData.Actors.split(', ');
                this.plot = movieData.Plot;
                this.awards = movieData.Awards;
                this.languages = movieData.Language.split(', ');
                this.countries = movieData.Country.split(', ');
                this.poster = movieData.Poster;
                this.hasPoster = movieData.Poster !== MovieModel.notAvailableProprety;
                this.rating = movieData.imdbRating;
                this.ratingVotes = movieData.imdbVotes;
            }

            _verifyData(movieData) {
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
