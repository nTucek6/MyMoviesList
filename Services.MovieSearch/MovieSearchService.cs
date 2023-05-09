using DatabaseContext;
using Entities.Enum;
using Entities;
using Microsoft.EntityFrameworkCore;
using Services.MoviesAdmin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyMoviesList.EnumExtension;

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
            var movieData = await myMoviesListContext.Movies
                .Where(q=> q.Id == movieId)
                .FirstOrDefaultAsync();
       
            Movies movie = new Movies();

            var act = await myMoviesListContext.MoviesActors.Where(a => a.MovieId == movieData.Id).ToListAsync();

            var dir = await myMoviesListContext.MoviesDirector.Where(a => a.MovieId == movieData.Id).ToListAsync();

            var wri = await myMoviesListContext.MoviesWriters.Where(a => a.MovieId == movieData.Id).ToListAsync();

            List<string> g = movieData.Genres.Split(",").ToList();

            List<PeopleEntity> actors = new List<PeopleEntity>();

            List<PeopleEntity> director = new List<PeopleEntity>();

            List<PeopleEntity> writers = new List<PeopleEntity>();

            List<GenresSelect> genres = new List<GenresSelect>();

            foreach (var a in act)
            {
                var q = await myMoviesListContext.People.Where(p => p.Id == a.PersonId).FirstOrDefaultAsync();
                actors.Add(q);
            }

            foreach (var d in dir)
            {
                var q = await myMoviesListContext.People.Where(p => p.Id == d.PersonId).FirstOrDefaultAsync();
                director.Add(q);
            }

            foreach (var w in wri)
            {
                var q = await myMoviesListContext.People.Where(p => p.Id == w.PersonId).FirstOrDefaultAsync();
                writers.Add(q);
            }

            foreach (string d in g)
            {
                genres.Add(new GenresSelect
                {
                    value = (GenresEnum)(Convert.ToInt32(d)),
                    label = ((GenresEnum)(Convert.ToInt32(d))).GetDescription()

                });
            }

            movie = new Movies
            {
                Id = movieData.Id,
                MovieName = movieData.MovieName,
                Actors = actors,
                Writers = writers,
                Director = director,
                ReleaseDate = movieData.ReleaseDate,
                Duration = movieData.Duration,
                MovieImageData = movieData.MovieImageData,
                Synopsis = movieData.Synopsis,
                Genres = genres
            };



            return movie;
        }



    }
}
