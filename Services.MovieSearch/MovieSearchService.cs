using DatabaseContext;
using Entities.Enum;
using Entities;
using Microsoft.EntityFrameworkCore;
using MyMoviesList.EnumExtension;
using Services.MoviesAdmin;
using System.Linq.Expressions;
using Azure;

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

        public async Task<List<Actor>> GetMovieActors(int movieId,int PostPerPage, int Page)
        {
            var movieActors = await myMoviesListContext.MoviesActors
                            .Where(q => q.MovieId == movieId)
                            .Skip((Page - 1) * PostPerPage)
                            .Take(PostPerPage).ToListAsync();

            List<Actor> actors = new List<Actor>();

            foreach (var m in movieActors) 
            {
                var a = await myMoviesListContext.People.Where(q=> q.Id == m.PersonId).Select(s=> new Actor 
                { 
                    Id = s.Id,
                    FirstName = s.FirstName,
                    LastName = s.LastName,
                    CharacterName = m.CharacterName,
                    PersonImageData = s.PersonImageData
                }).FirstOrDefaultAsync();

                actors.Add(a);
            }
            return actors;
        }






    }
}
