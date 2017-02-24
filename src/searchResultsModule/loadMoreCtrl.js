// -----------------------------------------------------------------------------
// loadMoreCtrl -- displays a button for loading more results
// -----------------------------------------------------------------------------

class LoadMoreController {
    static initClass() {
        LoadMoreController.$inject = ['searchResultsRepository'];
    }

    constructor(searchResultsRepository) {
        this._searchResultsRepository = searchResultsRepository;

        this.isVisible = false;

        this._searchResultsRepository.registerDataObserver(
            this._onSearchResultsDataChange.bind(this)
        );
    }

    trigger() {
        this._searchResultsRepository.loadMoreResults();
    }

    _onSearchResultsDataChange(data) {
        this.isVisible = (
            data.totalResults > data.results.length &&
            !data.isFetchPending
        );
    }
}

LoadMoreController.initClass();

angular.module('searchResultsModule').controller(
    'loadMoreCtrl',
    LoadMoreController
);
