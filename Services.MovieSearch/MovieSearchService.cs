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
            if(PostPerPage > 0)
            {
                var movieActors = await myMoviesListContext.MoviesActors
                                            .Where(q => q.MovieId == movieId)
                                            .Skip((Page - 1) * PostPerPage)
                                            .Take(PostPerPage).ToListAsync();

                List<Actor> actors = new List<Actor>();

                foreach (var m in movieActors)
                {
                    var a = await myMoviesListContext.People.Where(q => q.Id == m.PersonId).Select(s => new Actor
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
            else
            {
                var movieActors = await myMoviesListContext.MoviesActors
                            .Where(q => q.MovieId == movieId).ToListAsync();

                List<Actor> actors = new List<Actor>();

                foreach (var m in movieActors)
                {
                    var a = await myMoviesListContext.People.Where(q => q.Id == m.PersonId).Select(s => new Actor
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

        public async Task<List<SearchData>> SearchBar(string Search,string? type)
        {
            
            List<SearchData> searchData = new List<SearchData>();

            string person = "person";
            string movie = "movie";

            if(type == "all")
            {
                var movies = await myMoviesListContext.Movies
                    .Where(q=>q.MovieName.Contains(Search))
                    .Select(s=> new SearchData 
                    {
                        Id = s.Id,
                        Name = s.MovieName,
                        SearchImageData = s.MovieImageData,
                        type = movie
                    })
                    .Take(5)
                    .ToListAsync();

                var people = await myMoviesListContext.People
                    .Where(q=> q.FirstName.Contains(Search) || q.LastName.Contains(Search))
                    .Select(s => new SearchData
                     {
                            Id = s.Id,
                            Name = s.FirstName + " " + s.LastName,
                            SearchImageData = s.PersonImageData,
                            type = person
                      })
                    .Take(5)
                    .ToListAsync();

                searchData.AddRange(movies);
                searchData.AddRange(people);

            }
            else if(type == "movies")
            {
                var movies = await myMoviesListContext.Movies
                  .Where(q => q.MovieName.Contains(Search))
                  .Select(s => new SearchData
                  {
                      Id = s.Id,
                      Name = s.MovieName,
                      SearchImageData = s.MovieImageData,
                      type = movie
                  })
                  .Take(5)
                  .ToListAsync();

                searchData.AddRange(movies);

            }
            else if(type == "people")
            {
                var people = await myMoviesListContext.People
                             .Where(q => q.FirstName.Contains(Search) || q.LastName.Contains(Search))
                             .Select(s => new SearchData
                             {
                                 Id = s.Id,
                                 Name = s.FirstName + " " + s.LastName,
                                 SearchImageData = s.PersonImageData,
                                 type = person
                             })
                             .Take(5)
                             .ToListAsync();

                searchData.AddRange(people);
            }
        
            return searchData;

        }






    }
}
