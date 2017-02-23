// -----------------------------------------------------------------------------
// currentRoute is a service that allows for getting and setting current route.
// -----------------------------------------------------------------------------

class CurrentRouteService {
    static initClass() {
        CurrentRouteService.$inject = [
            '$rootScope',
            '$route',
            '$location',
            'assert',
            'routesConfig',
            'listenersManager'
        ];
    }

    constructor(
        $rootScope,
        $route,
        $location,
        assert,
        routesConfig,
        listenersManager
    ) {
        this._$route = $route;
        this._$location = $location;
        this._assert = assert;
        this._routesConfig = routesConfig;
        this._RouteListenersManager = listenersManager.getManager();
        $rootScope.$on('$routeChangeSuccess', this._onRouteChange.bind(this));
    }

    _onRouteChange() {
        this._RouteListenersManager.callListeners();
    }

    registerRouteListener(listener) {
        return this._RouteListenersManager.addListener(listener);
    }

    _getRouteFromRouteData(routeData) {
        if (typeof routeData === 'undefined') {
            console.warn('Tried to get route before it was set!');
            return {
                routeId: null,
                params: null
            };
        } else {
            return {
                routeId: routeData.locals.routeId,
                params: routeData.params
            };
        }
    }

    get() {
        return this._getRouteFromRouteData(this._$route.current);
    }

    setToMovie(movieId) {
        this._assert.isString(movieId);
        this._$location.path(
            `${this._routesConfig.routes.movie}/${movieId}`
        );
    }

    setToSearch(searchPhrase = '') {
        this._assert.isString(searchPhrase);
        this._$location.path(
            `${this._routesConfig.routes.search}/${searchPhrase}`
        );
    }
}

CurrentRouteService.initClass();

angular.module('routesModule').service('currentRoute', CurrentRouteService);
