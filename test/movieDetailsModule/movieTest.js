describe('Movie', () => {
    let Movie = null;

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

    beforeEach(() => {
        module('testApp');
        module('assertModule');
        module('routesModule');
        module('moviesFetcherModule');
        module('movieDetailsModule');
        inject(($injector) => {
            Movie = $injector.get('Movie');
        });
    });

    it('should throw for bad input data', () => {
        expect(() => {return new Movie();}).toThrow();
        // not enough data
        expect(() => {return new Movie({Title: 'Conan'});}).toThrow();
    });

    it('should work for valid input data', () => {
        expect(() => {return new Movie(phaseIvOmdbApiResponse);}).not.toThrow();
    });
});
