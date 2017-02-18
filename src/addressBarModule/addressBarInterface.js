class AddressBarInterfaceService {
    static initClass() {
        AddressBarInterfaceService.$inject = [
            '$rootScope',
            '$location',
            'assert',
            'addressBarConfig'
        ];
    }

    constructor($rootScope, $location, assert, addressBarConfig) {
        this._$rootScope = $rootScope;
        this._$location = $location;
        this._assert = assert;
        this._addressBarConfig = addressBarConfig;
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
