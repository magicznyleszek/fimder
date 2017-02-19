// -----------------------------------------------------------------------------
// addressBarHandler is a service gluing together search box and address bar
// -----------------------------------------------------------------------------

class AddressBarHandlerService {
    static initClass() {
        AddressBarHandlerService.$inject = [
            'currentSearch',
            'addressBarInterface',
            'addressBarConfig'
        ];
    }

    constructor(
        currentSearch,
        addressBarInterface,
        addressBarConfig
    ) {
        this._addressBarInterface = addressBarInterface;
        this._addressBarConfig = addressBarConfig;
        currentSearch.registerSearchPhraseListener(
            this._onSearchPhraseChange.bind(this)
        );
    }

    _onSearchPhraseChange(searchPhrase) {
        const currentRoute = this._addressBarInterface.getCurrent();
        if (currentRoute.routeId === this._addressBarConfig.routes.search) {
            this._addressBarInterface.setSearch(searchPhrase);
        }
    }
}

AddressBarHandlerService.initClass();

angular.module('searchBoxModule').service(
    'addressBarHandler',
    AddressBarHandlerService
);
