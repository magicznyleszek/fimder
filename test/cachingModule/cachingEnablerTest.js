describe('caching', () => {
    let cachingEnabler = null;

    beforeEach(() => {
        module('testApp');
        module('cachingModule');
        inject(($injector) => {
            cachingEnabler = $injector.get('cachingEnabler');
        });
    });

    it('should be enabled on start', () => {
        expect(cachingEnabler.isEnabled).toBeTruthy();
    });
});
