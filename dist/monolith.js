'use strict';

angular.module('akabuskAppModule', ['assertModule']);

angular.module('akabuskAppModule').config(['$interpolateProvider', '$compileProvider', function ($interpolateProvider, $compileProvider) {
    // unfortunately we can't use "{{ symbols }}" because Jekyll uses them
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    // We're disabling angular debug info - significant performance boost
    $compileProvider.debugInfoEnabled(false);
    // Don't look for directives in comments and classes (~10% boost)
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
}]);

// angular.module('akabuskAppModule').config(['$sceProvider', ($sceProvider) => {
//     $sceProvider.enabled(false);
// }]);

angular.module('akabuskAppModule').run([
// 'fooBar',
function () {
    console.debug('app initialized');
}]);
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// -----------------------------------------------------------------------------
// assertModule -- a module with a service that provides functions for common
// assertions. All provided functions do not return a value, and will throw an
// error when the assertion fails.
// -----------------------------------------------------------------------------

angular.module('assertModule', []);

var AssertService = function () {
    function AssertService() {
        _classCallCheck(this, AssertService);
    }

    _createClass(AssertService, [{
        key: 'isTrue',
        value: function isTrue(expression) {
            if (expression !== true) {
                throw new Error(this._getText('true expression'));
            }
        }
    }, {
        key: 'isFalse',
        value: function isFalse(expression) {
            if (expression !== false) {
                throw new Error(this._getText('false expression'));
            }
        }
    }, {
        key: 'isDefined',
        value: function isDefined(value) {
            if (typeof value === 'undefined') {
                throw new Error(this._getText('defined value'));
            }
        }
    }, {
        key: 'isNull',
        value: function isNull(value) {
            if (value !== null) {
                throw new Error(this._getTextWithValue('null', value));
            }
        }
    }, {
        key: 'isBool',
        value: function isBool(value) {
            if (!_.isBoolean(value)) {
                throw new Error(this._getTextWithValue('boolean', value));
            }
        }
    }, {
        key: 'isNumber',
        value: function isNumber(value) {
            if (!_.isNumber(value)) {
                throw new Error(this._getTextWithValue('number', value));
            }
        }
    }, {
        key: 'isInteger',
        value: function isInteger(value) {
            if (!Number.isInteger(value)) {
                throw new Error(this._getTextWithValue('integer', value));
            }
        }
    }, {
        key: 'isString',
        value: function isString(value) {
            if (!_.isString(value)) {
                throw new Error(this._getTextWithValue('string', value));
            }
        }
    }, {
        key: 'isPlainObject',
        value: function isPlainObject(value) {
            if (!_.isPlainObject(value)) {
                throw new Error(this._getTextWithValue('plain object', value));
            }
        }
    }, {
        key: 'isArray',
        value: function isArray(value) {
            if (!_.isArray(value)) {
                throw new Error(this._getTextWithValue('array', value));
            }
        }
    }, {
        key: 'isFunction',
        value: function isFunction(value) {
            if (!_.isFunction(value)) {
                throw new Error(this._getTextWithValue('function', value));
            }
        }

        // -------------------------------------------------------------------------
        // helper functions for producing text of error messages
        // -------------------------------------------------------------------------

    }, {
        key: '_getText',
        value: function _getText(expectedText) {
            return 'Assertion failed: expected ' + expectedText;
        }
    }, {
        key: '_getTextWithValue',
        value: function _getTextWithValue(expectedText, value) {
            var simpleMessage = this._getText(expectedText);
            return simpleMessage + ', but got {' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '} ' + value + ' instead';
        }
    }]);

    return AssertService;
}();

angular.module('assertModule').service('assert', AssertService);
'use strict';

console.log('moduleOne');
'use strict';

console.log('moduleTwo');
