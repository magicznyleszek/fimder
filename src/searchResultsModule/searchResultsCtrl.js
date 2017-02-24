// -----------------------------------------------------------------------------
// searchResultsCtrl -- displays a list of search results based on current
// search route searchPhrase param. Also allows for opening movie view.
// -----------------------------------------------------------------------------

class SearchResultsController {
    static initClass() {
        SearchResultsController.emptyMessage = 'Hi! Please type movie title above :-)';

        SearchResultsController.$inject = ['searchResultsRepository'];
    }

    constructor(searchResultsRepository) {
        this._searchResultsRepository = searchResultsRepository;

        this.results = [];
        this.message = null;
        this.isListVisible = false;
        this.isSpinnerVisible = false;
        this.isMessageVisible = false;

        this._searchResultsRepository.registerDataObserver(
            this._onSearchResultsDataChange.bind(this)
        );
    }

    openMovie(result) {
        result.open();
    }

    _onSearchResultsDataChange(data) {
        this.results = data.results;
        this.isSpinnerVisible = data.isFetchPending;

        if (data.error) {
            this.message = data.error;
        } else if (this.results.length === 0 && !data.isFetchPending) {
            this.message = SearchResultsController.emptyMessage;
        } else {
            delete this.message;
        }
    }
}

SearchResultsController.initClass();

angular.module('searchResultsModule').controller(
    'searchResultsCtrl',
    SearchResultsController
);
