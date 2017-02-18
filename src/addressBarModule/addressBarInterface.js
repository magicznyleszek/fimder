// -----------------------------------------------------------------------------
// addressBarInterface -- a service that allows for updating current url without
// reloading application
// -----------------------------------------------------------------------------

class AddressBarInterfaceService {
    static initClass() {
        AddressBarInterfaceService.$inject = [
            '$route',
            '$rootScope',
            '$location',
            'assert',
            'addressBarConfig'
        ];
    }

    constructor(
        $route,
        $rootScope,
        $location,
        assert,
        addressBarConfig
    ) {
        this._$route = $route;
        this._$rootScope = $rootScope;
        this._$location = $location;
        this._assert = assert;
        this._addressBarConfig = addressBarConfig;
    }

    getCurrent() {
        return {
            routeId: this._$route.current.locals.routeId,
            params: this._$route.current.params
        };
    }

    setMovies(movieId) {
        this._assert.isString(movieId);
        this._$location.path(`${this._addressBarConfig.routes.movies}/${movieId}`);
        this._$rootScope.$apply();
    }

    setSearch(searchPhrase = '') {
        this._assert.isString(searchPhrase);
        this._$location.path(`${this._addressBarConfig.routes.search}/${searchPhrase}`);
        this._$rootScope.$apply();
    }
}

AddressBarInterfaceService.initClass();

angular.module('addressBarModule').service(
    'addressBarInterface',
    AddressBarInterfaceService
);
