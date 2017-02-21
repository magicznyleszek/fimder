describe('movieDetailsCtrl', () => {
    let testData = null;
    let movieDetailsCtrl = null;
    let $rootScope = null;

    const resolvePromises = () => {
        // Digesting to resolve async promises
        $rootScope.$digest();
    };

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('movieDetailsModule');
        inject(($injector, $controller) => {
            testData = $injector.get('testData');
            $rootScope = $injector.get('$rootScope');
            movieDetailsCtrl = $controller('movieDetailsCtrl', {
                Movie: $injector.get('Movie'),
                currentRoute: $injector.get('currentRoute'),
                routesConfig: $injector.get('routesConfig'),
                moviesFetcher: $injector.get('moviesFetcher'),
                moviesFetcherConfig: $injector.get('moviesFetcherConfig'),
                assert: $injector.get('assert')
            });
        });
    });

    it('should start new fetch for given movieId', () => {
        const someMovieId = 'tt0000001';
        spyOn(movieDetailsCtrl, '_fetchMovieData').and.callThrough();
        movieDetailsCtrl._currentRoute.setToMovie(someMovieId);
        resolvePromises();
        expect(movieDetailsCtrl._fetchMovieData).toHaveBeenCalled();
        expect(movieDetailsCtrl._retrier).toBeDefined();
    });

    it('should remember last search phrase and use it to go back', () => {
        const someSearchPhrase = 'conan';
        const someMovieId = 'tt0000001';

        // open search
        movieDetailsCtrl._currentRoute.setToSearch(someSearchPhrase);
        resolvePromises();

        // open movie
        movieDetailsCtrl._currentRoute.setToMovie(someMovieId);
        resolvePromises();

        // go back to search
        spyOn(movieDetailsCtrl._currentRoute, 'setToSearch').and.callThrough();
        movieDetailsCtrl.openSearch();
        expect(movieDetailsCtrl._currentRoute.setToSearch).toHaveBeenCalledWith(someSearchPhrase);
    });

    it('should show message for not found or invalid id', () => {
        movieDetailsCtrl._fetchMoviesSuccess({
            data: testData.responses.movieError
        });
        expect(movieDetailsCtrl.isMessageVisible).toBeTruthy();
    });

    it('should show list for found', () => {
        movieDetailsCtrl._fetchMoviesSuccess({
            data: testData.responses.movieSuccess
        });
        expect(movieDetailsCtrl.isDetailsVisible).toBeTruthy();
    });
});
