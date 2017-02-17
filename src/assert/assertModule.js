// -----------------------------------------------------------------------------
// assertModule -- a module with a service that provides functions for common
// assertions. All provided functions do not return a value, and will throw an
// error when the assertion fails.
// -----------------------------------------------------------------------------

angular.module('assertModule', []);

class AssertService {
    isTrue(expression) {
        if (expression !== true) {
            throw new Error(this._getText('true expression'));
        }
    }

    isFalse(expression) {
        if (expression !== false) {
            throw new Error(this._getText('false expression'));
        }
    }

    isDefined(value) {
        if (typeof value === 'undefined') {
            throw new Error(this._getText('defined value'));
        }
    }

    isNull(value) {
        if (value !== null) {
            throw new Error(this._getTextWithValue('null', value));
        }
    }

    isBool(value) {
        if (!_.isBoolean(value)) {
            throw new Error(this._getTextWithValue('boolean', value));
        }
    }

    isNumber(value) {
        if (!_.isNumber(value)) {
            throw new Error(this._getTextWithValue('number', value));
        }
    }

    isInteger(value) {
        if (!Number.isInteger(value)) {
            throw new Error(this._getTextWithValue('integer', value));
        }
    }

    isString(value) {
        if (!_.isString(value)) {
            throw new Error(this._getTextWithValue('string', value));
        }
    }

    isPlainObject(value) {
        if (!_.isPlainObject(value)) {
            throw new Error(this._getTextWithValue('plain object', value));
        }
    }

    isArray(value) {
        if (!_.isArray(value)) {
            throw new Error(this._getTextWithValue('array', value));
        }
    }

    isFunction(value) {
        if (!_.isFunction(value)) {
            throw new Error(this._getTextWithValue('function', value));
        }
    }

    // -------------------------------------------------------------------------
    // helper functions for producing text of error messages
    // -------------------------------------------------------------------------

    _getText(expectedText) {
        return `Assertion failed: expected ${expectedText}`;
    }

    _getTextWithValue(expectedText, value) {
        const simpleMessage = this._getText(expectedText);
        return `${simpleMessage}, but got {${typeof value}} ${value} instead`;
    }
}

angular.module('assertModule').service('assert', AssertService);
