describe('movieDetailsCtrl', () => {
    let movieDetailsCtrl = null;
    let $rootScope = null;

    const omdbApiResponseError = {
        Response: 'False',
        Error: 'Error getting data.'
    };

    const phaseIvOmdbApiResponse = {
        Title: 'Phase IV',
        Year: '1974',
        Rated: 'PG',
        Released: '01 Sep 1974',
        Runtime: '84 min',
        Genre: 'Horror, Sci-Fi, Thriller',
        Director: 'Saul Bass',
        Writer: 'Mayo Simon',
        Actors: 'Nigel Davenport, Michael Murphy, Lynne Frederick, Alan Gifford',
        Plot: 'Desert ants suddenly form a collective intelligence and begin to wage war on the desert inhabitants. It is up to two scientists and a stray girl they rescue from the ants to destroy them. ...',
        Language: 'English',
        Country: 'UK, USA',
        Awards: 'N/A',
        Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA2MTI0Mzk3M15BMl5BanBnXkFtZTYwODgzNzE5._V1_SX300.jpg',
        Metascore: 'N/A',
        imdbRating: '6.6',
        imdbVotes: '5,124',
        imdbID: 'tt0070531',
        Type: 'movie',
        Response: 'True'
    };

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
            data: omdbApiResponseError
        });
        expect(movieDetailsCtrl.isMessageVisible).toBeTruthy();
    });

    it('should show list for found', () => {
        movieDetailsCtrl._fetchMoviesSuccess({
            data: phaseIvOmdbApiResponse
        });
        expect(movieDetailsCtrl.isDetailsVisible).toBeTruthy();
    });
});
