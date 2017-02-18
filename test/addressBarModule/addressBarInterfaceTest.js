describe('addressBarInterface', () => {
    let addressBarInterface = null;

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('addressBarModule');
        inject(($injector) => {
            addressBarInterface = $injector.get('addressBarInterface');
        });

        // I'm not really into using e2e here, so I'll just set starting route
        // myself
        addressBarInterface.setSearch();
    });

    it('should allow setting route to movies manually', () => {
        const someCoolMovieId = 'phaseiv';
        addressBarInterface.setMovies(someCoolMovieId);
        const currentRoute = addressBarInterface.getCurrent();
        expect(currentRoute.params.movieId).toBe(someCoolMovieId);
    });

    it('should allow setting route to search manually', () => {
        const partOfTitle = 'Devils';
        addressBarInterface.setSearch(partOfTitle);
        const currentRoute = addressBarInterface.getCurrent();
        expect(currentRoute.params.searchPhrase).toBe(partOfTitle);
    });

    it('should not lose misc characters in the url', () => {
        const partOfTitle = 'Silent Running !@#$%^&*()_+';
        addressBarInterface.setSearch(partOfTitle);
        const currentRoute = addressBarInterface.getCurrent();
        expect(currentRoute.params.searchPhrase).toBe(partOfTitle);
    });

    it('should return routeId and parameters with getCurrent', () => {
        const someParam = 'love';
        addressBarInterface.setSearch(someParam);
        const currentRoute = addressBarInterface.getCurrent();
        expect(currentRoute.routeId).toBeDefined();
        expect(currentRoute.params).toBeDefined();
    });
});
