// -----------------------------------------------------------------------------
// routesModule for reading location parameters on load and allowing setting
// them during application lifetime (so user actions will reflect in url).
// -----------------------------------------------------------------------------

angular.module('routesModule', [
    'ngRoute',
    'assertModule',
    'observableModule'
]);
