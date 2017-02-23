// -----------------------------------------------------------------------------
// cachingModule makes $http calls be cached in localStorage.
// -----------------------------------------------------------------------------

angular.module('cachingModule', [
    'angular-cache'
]);

angular.module('cachingModule').run([
    // we only need to initialize it
    'cachingEnabler',
    angular.noop
]);
