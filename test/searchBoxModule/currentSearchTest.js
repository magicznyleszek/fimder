describe('currentSearch', () => {
    let currentSearch = null;

    beforeEach(() => {
        module('testApp');
        module('searchBoxModule');
        inject(($injector) => {
            currentSearch = $injector.get('currentSearch');
        });
    });

    it('should set and get properly', () => {
        const somePhrase = 'blood of heroes';
        currentSearch.set(somePhrase);
        const currentPhrase = currentSearch.get();
        expect(currentPhrase).toBe(somePhrase);
    });
});
