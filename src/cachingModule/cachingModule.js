// -----------------------------------------------------------------------------
// cachingModule makes $http calls be cached in localStorage.
// -----------------------------------------------------------------------------

angular.module('cachingModule', [
    'angular-cache'
]);

angular.module('cachingModule').run([
    '$http',
    'CacheFactory',
    (
        $http,
        CacheFactory
    ) => {
        // we apply caching to all $http calls with {cache: true} option
        $http.defaults.cache = CacheFactory('defaultCache', {
            deleteOnExpire: 'passive',
            storageMode: 'localStorage',
            storagePrefix: 'akabusk.',
            // 1 hour
            maxAge: 1 * 60 * 60 * 1000
        });
    }
]);
