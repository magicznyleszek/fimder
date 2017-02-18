// -----------------------------------------------------------------------------
// addressBarModule -- reads location parameters on load and allows setting them
// during application lifetime (so user can always copy it)
// -----------------------------------------------------------------------------

angular.module('addressBarModule', [
    'ngRoute',
    'assertModule'
]);

angular.module('addressBarModule').config([
    '$routeProvider',
    '$locationProvider',
    'addressBarConfig',
    (
        $routeProvider,
        $locationProvider,
        addressBarConfig
    ) => {
        $routeProvider
        .when(`/${addressBarConfig.routes.movies}/:movieId`, {
            resolve: {
                viewId: [() => {return addressBarConfig.routes.movies;}]
            }
        })
        .when(`/${addressBarConfig.routes.search}/:searchPhrase?`, {
            resolve: {
                viewId: [() => {return addressBarConfig.routes.search;}]
            }
        })
        .otherwise({
            redirectTo: `/${addressBarConfig.routes.search}/`
        });

        $locationProvider.html5Mode(false);
    }
]);
