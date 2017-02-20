describe('currentRoute', () => {
    let currentRoute = null;
    let $rootScope = null;

    const makeSureLocationIsUpdated = () => {
        // we need to apply scope because we're calling $location.path manually
        $rootScope.$apply();
    };

    const setInitialRoute = () => {
        // I'm not really into using e2e here, so I'll just set starting route
        // myself
        currentRoute.setToSearch();
        makeSureLocationIsUpdated();
    }

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('listenersManagerModule');
        module('routesModule');
        inject(($injector) => {
            currentRoute = $injector.get('currentRoute');
            $rootScope = $injector.get('$rootScope');
        });
    });

    it('should allow setting route to movies manually', () => {
        setInitialRoute();
        const someCoolMovieId = 'phaseiv';
        currentRoute.setToMovies(someCoolMovieId);
        makeSureLocationIsUpdated();
        const route = currentRoute.get();
        expect(route.params.movieId).toBe(someCoolMovieId);
    });

    it('should allow setting route to search manually', () => {
        setInitialRoute();
        const partOfTitle = 'Devils';
        currentRoute.setToSearch(partOfTitle);
        makeSureLocationIsUpdated();
        const route = currentRoute.get();
        expect(route.params.searchPhrase).toBe(partOfTitle);
    });

    it('should not lose misc characters in the url', () => {
        setInitialRoute();
        const partOfTitle = 'Silent Running !@#$%^&*()_+';
        currentRoute.setToSearch(partOfTitle);
        makeSureLocationIsUpdated();
        const route = currentRoute.get();
        expect(route.params.searchPhrase).toBe(partOfTitle);
    });

    it('should return routeId and parameters with get', () => {
        setInitialRoute();
        const someParam = 'love';
        currentRoute.setToSearch(someParam);
        makeSureLocationIsUpdated();
        const route = currentRoute.get();
        expect(route.routeId).toBeDefined();
        expect(route.params).toBeDefined();
    });

    it('should return empty route if asked too early', () => {
        const route = currentRoute.get();
        expect(route.routeId).toBe(null);
        expect(route.params).toBe(null);
    });
});
