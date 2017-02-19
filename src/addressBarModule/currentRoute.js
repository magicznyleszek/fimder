// -----------------------------------------------------------------------------
// currentRoute -- a service that allows for getting and setting current route
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
        this._currentRouteListenersManager = listenersManager.getManager();
        $rootScope.$on('$routeChangeSuccess', this._onRouteChange.bind(this));
    }

    _onRouteChange() {
        this._currentRouteListenersManager.callListeners();
    }

    registerRouteChangeListener(listener) {
        return this._currentRouteListenersManager.addListener(listener);
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

    setToMovies(movieId) {
        this._assert.isString(movieId);
        this._$location.path(
            `${this._routesConfig.routes.movies}/${movieId}`
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

angular.module('addressBarModule').service('currentRoute', CurrentRouteService);
