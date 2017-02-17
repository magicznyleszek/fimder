describe('assert', () => {
    let assert = null;

    beforeEach(() => {
        module('testApp');
        inject(($injector) => {
            assert = $injector.get('assert');
        });
    });

    describe('isTrue', () => {
        it('should throw for false', () => {
            expect(() => {assert.isTrue(false);}).toThrow();
        });

        it('should not throw for true', () => {
            expect(() => {assert.isTrue(true);}).not.toThrow();
        });
    });

    describe('isFalse', () => {
        it('should throw for true', () => {
            expect(() => {assert.isFalse(true);}).toThrow();
        });

        it('should not throw for false', () => {
            expect(() => {assert.isFalse(false);}).not.toThrow();
        });
    });

    describe('isDefined', () => {
        it('should throw for not defined', () => {
            const foo = {};
            expect(() => {assert.isDefined(foo.bar);}).toThrow();
        });

        it('should not throw for defined', () => {
            const foo = {bar: 1};
            expect(() => {assert.isDefined(foo.bar);}).not.toThrow();
        });
    });

    describe('isNull', () => {
        it('should throw for not null', () => {
            expect(() => {assert.isNull('a');}).toThrow();
            expect(() => {assert.isNull(1);}).toThrow();
            expect(() => {assert.isNull(true);}).toThrow();
        });

        it('should not throw for null', () => {
            expect(() => {assert.isNull(null);}).not.toThrow();
        });
    });

    describe('isBool', () => {
        it('should throw for not booleans', () => {
            expect(() => {assert.isBool('a');}).toThrow();
            expect(() => {assert.isBool(1);}).toThrow();
            expect(() => {assert.isBool(0);}).toThrow();
            expect(() => {assert.isBool(undefined);}).toThrow();
        });

        it('should not throw for booleans', () => {
            expect(() => {assert.isBool(true);}).not.toThrow();
            expect(() => {assert.isBool(false);}).not.toThrow();
        });
    });

    describe('isNumber', () => {
        it('should throw for not numbers', () => {
            expect(() => {assert.isNumber('1');}).toThrow();
            expect(() => {assert.isNumber(null);}).toThrow();
            expect(() => {assert.isNumber(true);}).toThrow();
        });

        it('should not throw for numbers', () => {
            expect(() => {assert.isNumber(1);}).not.toThrow();
            expect(() => {assert.isNumber(12.5);}).not.toThrow();
            expect(() => {assert.isNumber(Infinity);}).not.toThrow();
        });
    });

    describe('isInteger', () => {
        it('should throw for not integers', () => {
            expect(() => {assert.isInteger('1');}).toThrow();
            expect(() => {assert.isInteger(12.5);}).toThrow();
            expect(() => {assert.isInteger(Infinity);}).toThrow();
        });

        it('should not throw for integers', () => {
            expect(() => {assert.isInteger(1);}).not.toThrow();
            expect(() => {assert.isInteger(1500100900);}).not.toThrow();
        });
    });

    describe('isString', () => {
        it('should throw for not strings', () => {
            expect(() => {assert.isString(12.5);}).toThrow();
            expect(() => {assert.isString(Infinity);}).toThrow();
            expect(() => {assert.isString(null);}).toThrow();
            expect(() => {assert.isString(true);}).toThrow();
        });

        it('should not throw for strings', () => {
            expect(() => {assert.isString('foo');}).not.toThrow();
        });
    });

    describe('isPlainObject', () => {
        it('should throw for not plain objects', () => {
            expect(() => {assert.isPlainObject(1);}).toThrow();
            expect(() => {assert.isPlainObject(null);}).toThrow();
            expect(() => {assert.isPlainObject(true);}).toThrow();
            expect(() => {assert.isPlainObject('foo');}).toThrow();
            expect(() => {assert.isPlainObject([1, 2, 3]);}).toThrow();
        });

        it('should not throw for strings', () => {
            expect(() => {assert.isPlainObject({});}).not.toThrow();
            expect(() => {assert.isPlainObject({foo: 'bar'});}).not.toThrow();
            expect(
                () => {assert.isPlainObject({foo: {bar: {fum: 'baz'}}});}
            ).not.toThrow();
        });
    });

    describe('isArray', () => {
        it('should throw for not plain objects', () => {
            expect(() => {assert.isArray(1);}).toThrow();
            expect(() => {assert.isArray(null);}).toThrow();
            expect(() => {assert.isArray(true);}).toThrow();
            expect(() => {assert.isArray('foo');}).toThrow();
            expect(() => {assert.isArray({});}).toThrow();
            expect(() => {assert.isArray({foo: 'bar'});}).toThrow();
        });

        it('should not throw for strings', () => {
            expect(() => {assert.isArray([]);}).not.toThrow();
            expect(() => {assert.isArray([1, 2, 3]);}).not.toThrow();
        });
    });

    describe('isFunction', () => {
        it('should throw for not plain objects', () => {
            expect(() => {assert.isFunction(1);}).toThrow();
            expect(() => {assert.isFunction(null);}).toThrow();
            expect(() => {assert.isFunction(true);}).toThrow();
            expect(() => {assert.isFunction('foo');}).toThrow();
            expect(() => {assert.isFunction({});}).toThrow();
            expect(() => {assert.isFunction({foo: 'bar'});}).toThrow();
            expect(() => {assert.isFunction([]);}).toThrow();
            expect(() => {assert.isFunction([1, 2, 3]);}).toThrow();
        });

        it('should not throw for strings', () => {
            expect(() => {assert.isFunction(console.log);}).not.toThrow();
        });
    });
});
