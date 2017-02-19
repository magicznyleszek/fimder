// -----------------------------------------------------------------------------
// addressBarModule routes configuration
// -----------------------------------------------------------------------------

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
                routeId: [() => {return addressBarConfig.routes.movies;}]
            }
        })
        .when(`/${addressBarConfig.routes.search}/:searchPhrase?`, {
            resolve: {
                routeId: [() => {return addressBarConfig.routes.search;}]
            }
        })
        .otherwise({
            redirectTo: `/${addressBarConfig.routes.search}/`
        });

        $locationProvider.html5Mode(false);
    }
]);
