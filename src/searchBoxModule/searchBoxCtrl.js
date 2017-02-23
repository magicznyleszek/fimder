// -----------------------------------------------------------------------------
// searchBoxCtrl -- handles input changes with a small debounce or immediate
// trigger on enter key.
// -----------------------------------------------------------------------------

class SearchBoxController {
    static initClass() {
        SearchBoxController.debounceTime = 500;
        SearchBoxController.enterKey = 13;
        SearchBoxController.inputSelector = '[js-searchBox-input]';
        SearchBoxController.$inject = [
            '$scope',
            '$element',
            'currentRoute',
            'routesConfig'
        ];
    }

    constructor(
        $scope,
        $element,
        currentRoute,
        routesConfig
    ) {
        this._$scope = $scope;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this._inputEl = $element[0].querySelector(
            SearchBoxController.inputSelector
        );
        this.inputValue = '';
        this._lastAppliedInputValue = null;

        this._applyInputValueDebounced = _.debounce(
            this._applyInputValue.bind(this),
            SearchBoxController.debounceTime
        );

        this._cancelRouteListener = this._currentRoute.registerRouteListener(
            this._onRouteChange.bind(this)
        );
    }

    _onRouteChange() {
        // cancel listener after initial route is set
        this._cancelRouteListener();

        const route = this._currentRoute.get();
        if (route.routeId === this._routesConfig.routes.search) {
            this.inputValue = route.params.searchPhrase;
        } else {
            this.inputValue = '';
        }

        // we want to start with input focused
        this._focusOnInput();
    }

    _applyInputValue() {
        this._applyInputValueDebounced.cancel();
        if (this._lastAppliedInputValue !== this.inputValue) {
            this._lastAppliedInputValue = this.inputValue;
            this._$scope.$applyAsync(
                this._currentRoute.setToSearch.bind(
                    this._currentRoute,
                    this.inputValue
                )
            );
        }
    }

    _focusOnInput() {
        this._inputEl.focus();
    }

    onInputValueChange() {
        this._applyInputValueDebounced();
    }

    onInputKeypress(e) {
        if (e.which === SearchBoxController.enterKey) {
            this._applyInputValue();
        }
    }

    clear() {
        this.inputValue = '';
        this._applyInputValue();
        this._focusOnInput();
    }
}

SearchBoxController.initClass();

angular.module('searchBoxModule').controller(
    'searchBoxCtrl',
    SearchBoxController
);
