describe('Movie', () => {
    let testData = null;
    let Movie = null;

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('movieDetailsModule');
        inject(($injector) => {
            testData = $injector.get('testData');
            Movie = $injector.get('Movie');
        });
    });

    it('should throw for bad input data', () => {
        expect(() => {return new Movie();}).toThrow();
        // not enough data
        expect(() => {return new Movie({Title: 'Conan'});}).toThrow();
    });

    it('should work for minimum valid input data', () => {
        const testFn = () => {
            return new Movie(testData.responses.movieSuccessMinimum);
        };
        expect(testFn).not.toThrow();
    });

    it('should work for full valid input data', () => {
        const testFn = () => {
            return new Movie(testData.responses.movieSuccess);
        };
        expect(testFn).not.toThrow();
    });
});
