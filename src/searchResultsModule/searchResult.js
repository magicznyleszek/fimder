// -----------------------------------------------------------------------------
// SearchResult model that expects data to follow omdbapi.com format.
// -----------------------------------------------------------------------------

angular.module('searchResultsModule').factory('SearchResult', [
    'assert',
    'currentRoute',
    (
        assert,
        currentRoute
    ) => {
        class SearchResultModel {
            constructor(movieData) {
                assert.isString(movieData.Title);
                assert.isString(movieData.Year);
                assert.isString(movieData.imdbID);
                this.title = movieData.Title;
                this.year = movieData.Year;
                this.movieId = movieData.imdbID;
            }

            open() {
                currentRoute.setToMovie(this.movieId);
            }
        }

        return SearchResultModel;
    }
]);
