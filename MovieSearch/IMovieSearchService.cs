﻿
using Services.MoviesAdmin;

namespace Services.MovieSearch
{
    public interface IMovieSearchService
    {
        Task<List<Movies>> GetMoviesByGenre();


    }
}
