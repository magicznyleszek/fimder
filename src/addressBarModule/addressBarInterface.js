// -----------------------------------------------------------------------------
// addressBarInterface -- a service that allows for updating current url without
// reloading application
// -----------------------------------------------------------------------------

class AddressBarInterfaceService {
    static initClass() {
        AddressBarInterfaceService.$inject = [
            '$route',
            '$location',
            'assert',
            'addressBarConfig'
        ];
    }

    constructor(
        $route,
        $location,
        assert,
        addressBarConfig
    ) {
        this._$route = $route;
        this._$location = $location;
        this._assert = assert;
        this._addressBarConfig = addressBarConfig;
    }

    notifyChange() {
        console.log('notifyChange');
    }

    getCurrent() {
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

    setMovies(movieId) {
        this._assert.isString(movieId);
        this._$location.path(`${this._addressBarConfig.routes.movies}/${movieId}`);
    }

    setSearch(searchPhrase = '') {
        this._assert.isString(searchPhrase);
        this._$location.path(`${this._addressBarConfig.routes.search}/${searchPhrase}`);
    }
}

AddressBarInterfaceService.initClass();

angular.module('addressBarModule').service(
    'addressBarInterface',
    AddressBarInterfaceService
);
