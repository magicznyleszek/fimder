// -----------------------------------------------------------------------------
// cachingEnabler is a service that enables caching for all $http requests
// -----------------------------------------------------------------------------

class CachingEnablerService {
    static initClass() {
        CachingEnablerService.$inject = ['$http', 'CacheFactory'];
    }

    constructor($http, CacheFactory) {
        $http.defaults.cache = CacheFactory('defaultCache', {
            deleteOnExpire: 'passive',
            storageMode: 'localStorage',
            storagePrefix: 'fimder.',
            // 1 hour
            maxAge: 1 * 60 * 60 * 1000
        });
        console.info('localStorage cache enabled');
        this.isEnabled = true;
    }
}

CachingEnablerService.initClass();

angular.module('cachingModule').service(
    'cachingEnabler',
    CachingEnablerService
);
