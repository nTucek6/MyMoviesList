using DatabaseContext;
using Entities;
using Entities.Enum;
using Microsoft.EntityFrameworkCore;
using MyMoviesList.EnumExtension;
using System;
using System.Data;
using System.Linq.Expressions;

namespace Services.MoviesAdmin
{
    public class MoviesAdminService : IMoviesAdminService
    {

        private readonly MyMoviesListContext myMoviesListContext;

        public MoviesAdminService(MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }
        public async Task<List<GenresSelect>> GetGenres()
        {
            var genres = Enum.GetValues(typeof(GenresEnum)).Cast<GenresEnum>().ToList().Select(x => new GenresSelect { value = x, label = x.GetDescription()}).ToList();
          
            return genres;
        }

        public async Task<List<Movies>> GetMovies(int PostPerPage, int Page, string? Search)
        {
            Expression<Func<MoviesEntity, bool>> predicate = x => true;

            if (!String.IsNullOrEmpty(Search))
            {
                predicate = x => x.MovieName.Contains(Search);
            }

            var data = await myMoviesListContext.Movies
                    .Where(predicate)
                    .OrderBy(m => m.MovieName)
                    .Skip((Page - 1) * PostPerPage)
                    .Take(PostPerPage).ToListAsync();

            List<Movies> movies = new List<Movies>();

            foreach (var movie in data)
            {
                var act = myMoviesListContext.MoviesActors.Where(a => a.MovieId == movie.Id);

                var dir = myMoviesListContext.MoviesDirector.Where(a => a.MovieId == movie.Id);

                var wri = myMoviesListContext.MoviesDirector.Where(a => a.MovieId == movie.Id);

                List<string> g = movie.Genres.Split(",").ToList();

                List<PeopleEntity> actors = new List<PeopleEntity>();

                List<PeopleEntity> director = new List<PeopleEntity>();

                List<PeopleEntity> writters = new List<PeopleEntity>();

                List<GenresSelect> genres = new List<GenresSelect>();

                foreach (var a in act)
                {
                    actors.Add((PeopleEntity)myMoviesListContext.People.Where(p => p.Id == a.PersonId));
                    director.Add((PeopleEntity)myMoviesListContext.People.Where(p => p.Id == a.PersonId));
                    writters.Add((PeopleEntity)myMoviesListContext.People.Where(p => p.Id == a.PersonId));
                }

                foreach(string d in g)
                {
                    genres.Add(new GenresSelect
                    {
                        value = (GenresEnum)(Convert.ToInt32(d)),
                        label = ((GenresEnum)(Convert.ToInt32(d))).GetDescription()

                    });
                }

                movies.Add(new Movies
                {
                    Id= movie.Id,
                    MovieName=movie.MovieName,
                    Actors = actors,
                    Writers = writters,
                    Director = director,
                    ReleaseDate = movie.ReleaseDate,
                    Duration = movie.Duration,
                    MovieImageData = movie.MovieImageData,
                    Synopsis = movie.Synopsis,
                    Genres = genres
                });
            }
            return movies;
        }

        public async Task<int> GetMoviesCount()
        {
            var count = await myMoviesListContext.Movies.CountAsync();

            return count;
        }

        public async Task SaveMovie(SaveMovie movie)
        {
            byte[] s = null;
            using (var ms = new MemoryStream())
            {
                movie.MovieImageData.CopyTo(ms);
                s = ms.ToArray();
            }

            string genres = null;

            int GenresCount = movie.Genres.Count();
            int i = 1;
            foreach (var g in movie.Genres)
            {
             if(i != GenresCount)
                {
                    genres += g.value + ", ";
                }
             else
                {
                    genres += g.value;
                }
            }

            await myMoviesListContext.Movies.AddAsync(new MoviesEntity
            {
                MovieName = movie.MovieName,
                Synopsis = movie.Synopsis,
                Genres = genres,
                Duration = movie.Duration,
                ReleaseDate = movie.ReleaseDate,
                MovieImageData = s
            });

            await myMoviesListContext.SaveChangesAsync();

            var m = await myMoviesListContext.Movies.Where(w => w.MovieName == movie.MovieName).Select(s => s.Id).FirstOrDefaultAsync();


            foreach (var a in movie.Actors)
            {
                await myMoviesListContext.MoviesActors.AddAsync(new MoviesActors
                {
                MovieId = m,
                PersonId = a.Id
                });
            }

            foreach (var a in movie.Director)
            {
                await myMoviesListContext.MoviesDirector.AddAsync(new MoviesDirector
                {
                    MovieId = m,
                    PersonId = a.Id
                });
            }

            foreach (var a in movie.Writers)
            {
                await myMoviesListContext.MoviesWriters.AddAsync(new MoviesWriters
                {
                    MovieId = m,
                    PersonId = a.Id
                });
            }

            await myMoviesListContext.SaveChangesAsync();


        }
    }
}
