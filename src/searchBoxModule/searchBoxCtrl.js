// -----------------------------------------------------------------------------
// searchBoxCtrl -- handles input changes with a small debounce or immediate
// trigger on enter key
// -----------------------------------------------------------------------------

class SearchBoxController {
    static initClass() {
        SearchBoxController.debounceTime = 500;
        SearchBoxController.enterKey = 13;
        SearchBoxController.$inject = ['$scope', '$element'];
    }

    constructor($scope, $element) {
        this._$scope = $scope;
        this._$element = $element;
        this.inputValue = '';

        this._applyInputValueDebounced = _.debounce(
            this._applyInputValue.bind(this),
            SearchBoxController.debounceTime
        )
    }

    _applyInputValue() {
        this._applyInputValueDebounced.cancel();
        console.log('applying', this.inputValue);
    }

    _focusOnInput() {
        this._$element[0].focus();
    }

    onInputValueChange() {
        this._applyInputValueDebounced();
    }

    onInputKeypress(e) {
        if (e.which === SearchBoxController.enterKey) {
            this._applyInputValue();
        }
    }
}

SearchBoxController.initClass();

angular.module('searchBoxModule').controller(
    'searchBoxCtrl',
    SearchBoxController
);
