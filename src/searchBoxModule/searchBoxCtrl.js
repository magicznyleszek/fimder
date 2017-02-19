// -----------------------------------------------------------------------------
// searchBoxCtrl -- handles input changes with a small debounce or immediate
// trigger on enter key
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
            'addressBarInterface',
            'addressBarConfig'
        ];
    }

    constructor(
        $scope,
        $element,
        $timeout,
        addressBarInterface,
        addressBarConfig
    ) {
        this._$scope = $scope;
        this._$timeout = $timeout;
        this._addressBarInterface = addressBarInterface;
        this._addressBarConfig = addressBarConfig;
        this._inputEl = $element[0].querySelector(
            SearchBoxController.inputSelector
        );
        this.inputValue = '';
        this._lastAppliedInputValue = null;

        this._applyInputValueDebounced = _.debounce(
            this._applyInputValue.bind(this),
            SearchBoxController.debounceTime
        );

        // we want to start with input focused
        this._focusOnInput();
        this._$timeout(this._loadInitialValueFromAddressBar.bind(this), 0);
    }

    _loadInitialValueFromAddressBar() {
        const currentRoute = this._addressBarInterface.getCurrent();
        if (currentRoute.routeId === this._addressBarConfig.routes.search) {
            this.inputValue = currentRoute.params.searchPhrase;
        }
    }

    _applyInputValue() {
        this._applyInputValueDebounced.cancel();
        if (this._lastAppliedInputValue !== this.inputValue) {
            this._lastAppliedInputValue = this.inputValue;
            this._$scope.$applyAsync(
                this._addressBarInterface.setSearch.bind(
                    this._addressBarInterface,
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
    }
}

SearchBoxController.initClass();

angular.module('searchBoxModule').controller(
    'searchBoxCtrl',
    SearchBoxController
);
