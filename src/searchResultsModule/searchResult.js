// -----------------------------------------------------------------------------
// SearchResult model.
// -----------------------------------------------------------------------------

angular.module('searchResultsModule').factory('SearchResult', [
    'assert',
    'currentRoute',
    (
        assert,
        currentRoute
    ) => {
        class SearchResultModel {
            constructor(title, movieId) {
                assert.isString(title);
                assert.isString(movieId);
                this.title = title;
                this.movieId = movieId;
            }

            open() {
                currentRoute.setToMovies(this.movieId);
            }
        }

        return SearchResultModel;
    }
]);
