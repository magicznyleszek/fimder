// -----------------------------------------------------------------------------
// addressBarConfig -- has names of all routes to make sure all scripts use
// the proper ones
// -----------------------------------------------------------------------------

angular.module('addressBarModule').constant('addressBarConfig', {
    routes: {
        movies: 'movies',
        search: 'search'
    }
});
