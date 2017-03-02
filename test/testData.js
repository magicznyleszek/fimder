angular.module('testAppModule').constant('testData', {
    responses: {
        movieSuccessMinimum: {
            Title: 'Phase IV',
            imdbID: 'tt0070531',
            Type: 'movie',
            Response: 'True'
        },
        movieSuccess: {
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
        },
        movieError: {
            Response: 'False',
            Error: 'Error getting data.'
        },
        searchSuccess: {
            Search: [
                {
                    Title: 'Conan the Barbarian',
                    Year: '1982',
                    imdbID: 'tt0082198',
                    Type: 'movie',
                    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMWIxMzQxZjAtMGFkNC00NzYwLWFiMGEtNzZhZjE5MmFiMmMyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg'
                },
                {
                    Title: 'Conan the Barbarian',
                    Year: '2011',
                    imdbID: 'tt0816462',
                    Type: 'movie',
                    Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1NDUyODk5NF5BMl5BanBnXkFtZTcwODk0MjIwNg@@._V1_SX300.jpg'
                }
            ],
            totalResults: '2',
            Response: 'True'
        },
        searchSuccessDupes: {
            Search: [
                {
                    Title: 'Aladdin',
                    Year: '1992',
                    imdbID: 'tt0103639',
                    Type: 'movie',
                    Poster: 'N/A'
                },
                {
                    Title: 'Aladdin',
                    Year: '1992',
                    imdbID: 'tt0103639',
                    Type: 'movie',
                    Poster: 'N/A'
                }
            ],
            totalResults: '2',
            Response: 'True'
        },
        searchErrorTooMany: {
            Response: 'False',
            Error: 'Too many results.'
        },
        searchErrorNotFound: {
            Response: 'False',
            Error: 'Movie not found!'
        }
    }
});
