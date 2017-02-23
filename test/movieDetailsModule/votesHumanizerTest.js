describe('votesHumanizer', () => {
    let votesHumanizer = null;

    beforeEach(() => {
        module('testAppModule');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('movieDetailsModule');
        inject(($injector) => {
            votesHumanizer = $injector.get('votesHumanizer');
        });
    });

    it('should throw for bad input data', () => {
        expect(() => {return new votesHumanizer.getHumanized();}).toThrow();
        expect(() => {return new votesHumanizer.getHumanized(1500);}).toThrow();
        expect(() => {return new votesHumanizer.getHumanized('');}).toThrow();
        expect(() => {return new votesHumanizer.getHumanized('a,b,c');}).toThrow();
        expect(() => {return new votesHumanizer.getHumanized('1,23d,333');}).toThrow();
    });

    it('should pacify rating votes properly', () => {
        const testMatrix = [
            ['123', '123'],
            ['999', '999'],
            ['1,000', '1k'],
            ['1,009', '1k'],
            ['1,099', '1.1k'],
            ['1,100', '1.1k'],
            ['1,444', '1.4k'],
            ['1,555', '1.6k'],
            ['12,345', '12.3k'],
            ['1,234,567', '1.2kk'],
            ['1,299,999', '1.3kk'],
            ['1,789,000', '1.8kk'],
            ['10,000,000', '10kk'],
            ['11,111,111', '11.1kk'],
            ['1,000,000,000', '1kkk'],
            ['1,234,567,890', '1.2kkk']
        ];

        for (const testCase of testMatrix) {
            expect(votesHumanizer.getHumanized(testCase[0])).toBe(testCase[1]);
        }
    });
});
