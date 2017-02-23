describe('caching', () => {
    let cachingEnabler = null;

    beforeEach(() => {
        module('testAppModule');
        module('cachingModule');
        inject(($injector) => {
            cachingEnabler = $injector.get('cachingEnabler');
        });
    });

    it('should be enabled on start', () => {
        expect(cachingEnabler.isEnabled).toBeTruthy();
    });
});
