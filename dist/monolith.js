;

(function () {
    'use strict';

    angular.module('akabuskModule', []);

    angular.module('akabuskModule').config(['$interpolateProvider', '$compileProvider', function ($interpolateProvider, $compileProvider) {
        // unfortunately we can't use "{{ symbols }}" because Jekyll uses them
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        // We're disabling angular debug info - significant performance boost
        $compileProvider.debugInfoEnabled(false);
        // Don't look for directives in comments and classes (~10% boost)
        $compileProvider.commentDirectivesEnabled(false);
        $compileProvider.cssClassDirectivesEnabled(false);
    }]);

    // angular.module('akabuskModule').config(['$sceProvider', ($sceProvider) => {
    //     $sceProvider.enabled(false);
    // }]);

    // angular.module('akabuskModule').run([
    //     'fooBar',
    //     angular.noop
    // ]);
})();
;

(function () {
  'use strict';

  console.log('moduleOne');
})();
;

(function () {
  'use strict';

  console.log('moduleTwo');
})();
