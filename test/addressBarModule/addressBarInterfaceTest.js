describe('addressBarInterface', () => {
    let addressBarInterface = null;
    let $rootScope = null;

    const makeSureLocationIsUpdated = () => {
        // we need to apply scope because we're calling $location.path manually
        $rootScope.$apply();
    };

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('addressBarModule');
        inject(($injector) => {
            addressBarInterface = $injector.get('addressBarInterface');
            $rootScope = $injector.get('$rootScope');
        });

        // I'm not really into using e2e here, so I'll just set starting route
        // myself
        addressBarInterface.setSearch();
        makeSureLocationIsUpdated();
    });

    it('should allow setting route to movies manually', () => {
        const someCoolMovieId = 'phaseiv';
        addressBarInterface.setMovies(someCoolMovieId);
        makeSureLocationIsUpdated();
        const currentRoute = addressBarInterface.getCurrent();
        expect(currentRoute.params.movieId).toBe(someCoolMovieId);
    });

    it('should allow setting route to search manually', () => {
        const partOfTitle = 'Devils';
        addressBarInterface.setSearch(partOfTitle);
        makeSureLocationIsUpdated();
        const currentRoute = addressBarInterface.getCurrent();
        expect(currentRoute.params.searchPhrase).toBe(partOfTitle);
    });

    it('should not lose misc characters in the url', () => {
        const partOfTitle = 'Silent Running !@#$%^&*()_+';
        addressBarInterface.setSearch(partOfTitle);
        makeSureLocationIsUpdated();
        const currentRoute = addressBarInterface.getCurrent();
        expect(currentRoute.params.searchPhrase).toBe(partOfTitle);
    });

    it('should return routeId and parameters with getCurrent', () => {
        const someParam = 'love';
        addressBarInterface.setSearch(someParam);
        makeSureLocationIsUpdated();
        const currentRoute = addressBarInterface.getCurrent();
        expect(currentRoute.routeId).toBeDefined();
        expect(currentRoute.params).toBeDefined();
    });
});
