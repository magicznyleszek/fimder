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

        this._searchResultsRepository.registerDataListener(
            this._onSearchResultsDataChange.bind(this)
        );
    }

    trigger() {
        console.log('load more');
    }

    _onSearchResultsDataChange(data) {
        this.isVisible = data.totalResults > data.results.length;
    }
}

LoadMoreController.initClass();

angular.module('searchResultsModule').controller(
    'loadMoreCtrl',
    LoadMoreController
);
