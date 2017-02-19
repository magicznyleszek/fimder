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
            'addressBarConfig',
            'listenersManager'
        ];
    }

    constructor(
        $rootScope,
        $route,
        $location,
        assert,
        addressBarConfig,
        listenersManager
    ) {
        this._$route = $route;
        this._$location = $location;
        this._assert = assert;
        this._addressBarConfig = addressBarConfig;
        this._currentRouteListenersManager = listenersManager.getManager();
        $rootScope.$on('$routeChangeStart', this._onRouteChange.bind(this));
    }

    _onRouteChange() {
        this._currentRouteListenersManager.callListeners();
    }

    registerChangeListener(listener) {
        return this._currentRouteListenersManager.addListener(listener);
    }

    get() {
        const currentRoute = this._$route.current;
        if (typeof currentRoute === 'undefined') {
            console.warn('Tried to get current route before it was set!');
            return {
                routeId: null,
                params: null
            };
        } else {
            return {
                routeId: currentRoute.locals.routeId,
                params: currentRoute.params
            };
        }
    }

    setToMovies(movieId) {
        this._assert.isString(movieId);
        this._$location.path(
            `${this._addressBarConfig.routes.movies}/${movieId}`
        );
    }

    setToSearch(searchPhrase = '') {
        this._assert.isString(searchPhrase);
        this._$location.path(
            `${this._addressBarConfig.routes.search}/${searchPhrase}`
        );
    }
}

CurrentRouteService.initClass();

angular.module('addressBarModule').service('currentRoute', CurrentRouteService);
