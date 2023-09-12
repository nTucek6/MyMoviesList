using DatabaseContext;
using Entities.Enum;
using Entities;
using Microsoft.EntityFrameworkCore;
using MyMoviesList.Extensions;
using Services.MoviesAdmin;
using System.Linq.Expressions;
using Azure;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace Services.MovieSearch
{
    public class MovieSearchService : IMovieSearchService
    {
        private readonly MyMoviesListContext myMoviesListContext;

        private static readonly int CountRequirements = 1;

        public MovieSearchService(MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }


        public async Task<List<Movies>> GetMoviesByGenre(int genre,int PostPerPage,int Page)
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
                .Skip((Page - 1) * PostPerPage)
                .Take(PostPerPage)
                .ToListAsync();
            return movies;
        }

        public async Task<int> GetMoviesByGenreCount(int genre)
        {
            var count = await myMoviesListContext.Movies.Where(q => q.Genres.Contains(genre.ToString())).CountAsync();
       
            return count;
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
                var movies = await myMoviesListContext.Movies.Where(q=>q.MovieName.Contains(Search)).Select(s=> new SearchData 
                    {
                        Id = s.Id,
                        Name = s.MovieName,
                        SearchImageData = s.MovieImageData,
                        type = movie
                    }).Take(5).ToListAsync();
                var people = await myMoviesListContext.People.Where(q=> q.FirstName.Contains(Search) || q.LastName.Contains(Search)).Select(s => new SearchData
                     {
                            Id = s.Id,
                            Name = s.FirstName + " " + s.LastName,
                            SearchImageData = s.PersonImageData,
                            type = person
                      }).Take(5).ToListAsync();
                searchData.AddRange(movies);
                searchData.AddRange(people);
            }
            else if(type == "movies")
            {
                var movies = await myMoviesListContext.Movies.Where(q => q.MovieName.Contains(Search)).Select(s => new SearchData
                  {
                      Id = s.Id,
                      Name = s.MovieName,
                      SearchImageData = s.MovieImageData,
                      type = movie
                  }).Take(5).ToListAsync();
                searchData.AddRange(movies);
            }
            else if(type == "people")
            {
                var people = await myMoviesListContext.People.Where(q => q.FirstName.Contains(Search) || q.LastName.Contains(Search)).Select(s => new SearchData
                             {
                                 Id = s.Id,
                                 Name = s.FirstName + " " + s.LastName,
                                 SearchImageData = s.PersonImageData,
                                 type = person
                             }).Take(5).ToListAsync();
                searchData.AddRange(people);
            }
            return searchData;
        }

        public async Task<List<Movies>> GetTopMovies(int PostPerPage, int Page)
        {
            List<Movies> movies = await myMoviesListContext.Movies
                              .Where(q => q.Rating != null && (myMoviesListContext.UsersMovieList.Where(u => q.Id == u.MovieId && u.Score != null).Count() >= CountRequirements))
                              .OrderByDescending(o => o.Rating)
                              .Select(s => new Movies
                              {
                                  Id = s.Id,
                                  MovieName = s.MovieName,
                                  MovieImageData = s.MovieImageData,
                                  Rating = s.Rating,
                              })
                              .Skip((Page - 1) * PostPerPage)
                              .Take(PostPerPage)
                              .ToListAsync();

            if (movies != null)
            {
                foreach (var movie in movies)
                {
                    var count = await myMoviesListContext.UsersMovieList.Where(q => q.MovieId == movie.Id && q.Score != null).CountAsync();
                    movie.RatingsCount = count;
                }
                movies = movies.OrderByDescending(o => o.Rating).ThenByDescending(o => o.RatingsCount).ToList();
                return movies;
            }
            return null;
        }

        public async Task<int> GetTopMoviesCount()
        {
            var count = await myMoviesListContext.Movies.Where(q => q.Rating != null && (myMoviesListContext.UsersMovieList.Where(u => q.Id == u.MovieId &&  u.Score != null).Count() >= CountRequirements) ).CountAsync();
            return count;
        }


    }
}
