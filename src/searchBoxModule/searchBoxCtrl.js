class SearchBoxController {
    static initClass() {
        SearchBoxController.$inject = ['$scope', '$element'];
    }

    constructor($scope, $element) {
        this._$scope = $scope;
        this._$element = $element;
        this.keyCodes = Object.freeze({
            escape: 27,
            enter: 13
        });
        this._inputSelector = '#sidebarSearchInput';

        this.phrase = '';
        this.isClearButtonVisible = false;
    }

    _onKeyPress(e) {
        switch (e.keyCode) {
            case this.keyCodes.escape:
                this._forceCancel();
                break;
            case this.keyCodes.enter:
                this._openStoreSearch();
                this._forceCancel();
                break;
            default:
                break;
        }
    }

    _callChanged() {
        console.log(this._getSearchPhrase());
    }

    _forceCancel() {
        this.clearPhrase();
        // force blur on current element
        document.activeElement.blur();
    }

    _getSearchPhrase() {
        if (this.phrase.length > 0) {
            return this.phrase;
        } else {
            return null;
        }
    }

    _refresh() {
        this.isClearButtonVisible = this.phrase.length > 0;
        this._$scope.$applyAsync();
    }

// -----------------------------------------------------------------------------
// Template functions
// -----------------------------------------------------------------------------

    onSearchPhraseChanged() {
        this._callChanged();
        this._refresh();
    }

    onFocus() {
        this._onKeyPressBound = this._onKeyPress.bind(this);
        this._$element[0].addEventListener('keyup', this._onKeyPressBound);
    }

    onBlur() {
        this._$element[0].removeEventListener('keyup', this._onKeyPressBound);
        delete this._onKeyPressBound;
    }

    clearPhrase() {
        this.phrase = '';
        this._refresh();
        this._callChanged();
    }
}
SearchBoxController.initClass();

angular.module('searchBoxModule').controller(
    'searchBoxCtrl',
    SearchBoxController
);
