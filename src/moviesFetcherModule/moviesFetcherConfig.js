// -----------------------------------------------------------------------------
// moviesFetcherConfig has some common messages.
// -----------------------------------------------------------------------------

angular.module('moviesFetcherModule').constant('moviesFetcherConfig', {
    messages: {
        unknownApiResponse: 'Unknown API response, sorry!',
        overLimit: 'Tried multiple times, but could not connect to API, sorry!',
        retrying: 'Some problems with getting data, retrying!'
    }
});
