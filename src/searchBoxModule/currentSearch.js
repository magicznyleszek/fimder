// -----------------------------------------------------------------------------
// currentSearch is a service that keeps current value of search phrase from the
// searchBoxCtrl and allows listening to it being changed
// -----------------------------------------------------------------------------

class CurrentSearchService {
    static initClass() {
        CurrentSearchService.$inject = ['listenersManager'];
    }

    constructor(listenersManager) {
        this._searchPhrase = null;
        this._searchPhraseListenersManager = listenersManager.getManager();
    }

    registerSearchPhraseListener(listener) {
        return this._searchPhraseListenersManager.addListener(listener);
    }

    get() {
        return this._searchPhrase;
    }

    set(searchPhrase) {
        this._searchPhrase = searchPhrase;
        this._searchPhraseListenersManager.callListeners(this._searchPhrase);
    }
}

CurrentSearchService.initClass();

angular.module('searchBoxModule').service(
    'currentSearch',
    CurrentSearchService
);
