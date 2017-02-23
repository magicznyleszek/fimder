describe('caching', () => {
    let cachingEnabler = null;

    beforeEach(() => {
        module('testApp');
        module('cachingModule');
        inject(($injector) => {
            cachingEnabler = $injector.get('cachingEnabler');
        });
    });

    it('should not throw for true', () => {
        expect(cachingEnabler.isEnabled).toBeTruthy();
    });
});
