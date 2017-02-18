// -----------------------------------------------------------------------------
// akabuskAppModule is our single ngApp module for whole web application
// -----------------------------------------------------------------------------

angular.module('akabuskAppModule', [
    'assertModule',
    'httpRetrierModule',
    'addressBarModule'
]);

// -----------------------------------------------------------------------------
// tweak default angular configuration
// -----------------------------------------------------------------------------

angular.module('akabuskAppModule').config([
    '$interpolateProvider',
    '$compileProvider',
    (
        $interpolateProvider,
        $compileProvider
    ) => {
        // unfortunately we can't use "{{ symbols }}" because Jekyll uses them
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

        // We're disabling angular debug info - significant performance boost
        $compileProvider.debugInfoEnabled(false);
        // Don't look for directives in comments and classes (~10% boost)
        $compileProvider.commentDirectivesEnabled(false);
        $compileProvider.cssClassDirectivesEnabled(false);
    }
]);

// angular.module('akabuskAppModule').config(['$sceProvider', ($sceProvider) => {
//     $sceProvider.enabled(false);
// }]);

angular.module('akabuskAppModule').run([
    'addressBarInterface',
    (addressBarInterface) => {
        console.debug('app initialized');
    }
]);
