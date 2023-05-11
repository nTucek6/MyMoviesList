using DatabaseContext;
using Entities.Enum;
using Entities;
using Microsoft.EntityFrameworkCore;
using MyMoviesList.EnumExtension;
using Services.MoviesAdmin;
using System.Linq.Expressions;

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

   




    }
}
