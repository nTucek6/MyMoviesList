using DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Services.MoviesAdmin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.MovieSearch
{
    public class MovieSearchService : IMovieSearchService
    {
        private readonly MyMoviesListContext myMoviesListContext;

        public MovieSearchService(MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }

   
        public async Task<List<Movies>> GetMoviesByGenre(int genre)
        {

            var movies = await myMoviesListContext.Movies
                .OrderBy(o => o.MovieName)
                .Where(q => q.Genres.Contains(genre.ToString()))
                .Select(s=> new Movies 
                {
                    Id = s.Id,
                    MovieName = s.MovieName,
                    MovieImageData = s.MovieImageData
                })
                .ToListAsync();

            return movies;
        }

        public async Task<Movies> GetMovieInfo(int movieId)
        {
            var movie = await myMoviesListContext.Movies
                .Where(q=> q.Id == movieId)
                .Select(s=> new Movies 
                {
                    MovieName= s.MovieName,
                    MovieImageData = s.MovieImageData,
                    Synopsis = s.Synopsis,
                    ReleaseDate = s.ReleaseDate,
                    Duration = s.Duration,


                }).FirstOrDefaultAsync();

            return movie;
        }



    }
}
