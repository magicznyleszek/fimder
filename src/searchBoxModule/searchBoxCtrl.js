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
            '$timeout',
            'currentRoute',
            'routesConfig'
        ];
    }

    constructor(
        $scope,
        $element,
        $timeout,
        currentRoute,
        routesConfig
    ) {
        this._$scope = $scope;
        this._$timeout = $timeout;
        this._currentRoute = currentRoute;
        this._routesConfig = routesConfig;
        this._inputEl = $element[0].querySelector(
            SearchBoxController.inputSelector
        );
        this.inputValue = '';
        this._lastAppliedInputValue = null;
        this._isVirgin = true;

        this._applyInputValueDebounced = _.debounce(
            this._applyInputValue.bind(this),
            SearchBoxController.debounceTime
        );

        this._currentRoute.registerRouteObserver(
            this._onRouteChange.bind(this)
        );
    }

    _onRouteChange() {
        const route = this._currentRoute.get();
        if (route.routeId === this._routesConfig.routes.search) {
            // first time we want to apply route parameter to input value
            if (this._isVirgin) {
                this.inputValue = route.params.searchPhrase;
            }

            // we want to focus on input
            this._focusOnInput();
        }

        // wheter we used it or not, we no longer care
        if (this._isVirgin) {
            this._isVirgin = false;
        }
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
        // sorry this is so ugly, but we need timeout to make sure it will apply
        // when switching routes already happened
        this._$timeout(() => {this._inputEl.focus();}, 1, false);
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
