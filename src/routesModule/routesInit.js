// -----------------------------------------------------------------------------
// routesModule routes initialization.
// -----------------------------------------------------------------------------

angular.module('routesModule').config([
    '$routeProvider',
    '$locationProvider',
    'routesConfig',
    (
        $routeProvider,
        $locationProvider,
        routesConfig
    ) => {
        $routeProvider
        .when(`/${routesConfig.routes.movie}/:movieId`, {
            resolve: {
                routeId: [() => {return routesConfig.routes.movie;}]
            }
        })
        .when(`/${routesConfig.routes.search}/:searchPhrase?`, {
            resolve: {
                routeId: [() => {return routesConfig.routes.search;}]
            }
        })
        .otherwise({
            redirectTo: `/${routesConfig.routes.search}/`
        });

        $locationProvider.html5Mode(false);
    }
]);
