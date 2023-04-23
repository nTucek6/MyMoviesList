using DatabaseContext;
using Entities;
using Entities.Enum;
using Microsoft.AspNetCore.Http;
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

        public async Task<List<PeopleSelect>> GetPeopleSelect()
        {
            var people = await myMoviesListContext.People.Select(s=> 
            new PeopleSelect 
            { 
                value = s.Id, 
                label = s.FirstName + " " + s.LastName}).ToListAsync();

            return people;

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
                    actors.Add(await myMoviesListContext.People.Where(p => p.Id == a.PersonId).FirstOrDefaultAsync());
                }

                foreach (var d in dir)
                {
                    director.Add(await myMoviesListContext.People.Where(p => p.Id == d.PersonId).FirstOrDefaultAsync());
                }

                foreach (var w in wri)
                {
                    writters.Add(await myMoviesListContext.People.Where(p => p.Id == w.PersonId).FirstOrDefaultAsync()); 
                }

                foreach (string d in g)
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
            if(movie.Id > 0)
            {
                var movieDb = await myMoviesListContext.Movies.Where(w => w.Id == movie.Id).FirstOrDefaultAsync();

                string genres = null;
                int GenresCount = movie.Genres.Count();
                int i = 1;
                foreach (var g in movie.Genres)
                {
                    if (i != GenresCount)
                    {
                        genres += g + ", ";
                    }
                    else
                    {
                        genres += g;
                    }
                }

                movieDb.MovieName = movie.MovieName;
                movieDb.Synopsis = movie.Synopsis;
                movieDb.Genres = genres;
                movieDb.Duration = movie.Duration;
                movieDb.ReleaseDate = movie.ReleaseDate;

                if (movie.MovieImageData != null)
                {
                    movieDb.MovieImageData = ImageToByte(movie.MovieImageData);
                }

                await myMoviesListContext.SaveChangesAsync();


                await myMoviesListContext.MoviesActors.Where(c => c.Id == movie.Id).ExecuteDeleteAsync();
                await myMoviesListContext.MoviesDirector.Where(c => c.Id == movie.Id).ExecuteDeleteAsync();
                await myMoviesListContext.MoviesWriters.Where(c => c.Id == movie.Id).ExecuteDeleteAsync();

                foreach (var a in movie.Actors.Split(',').Reverse().ToList<string>())
                {
                    await myMoviesListContext.MoviesActors.AddAsync(new MoviesActors
                    {
                        MovieId = movie.Id,
                        PersonId = Convert.ToInt32(a)
                    });
                }

                foreach (var a in movie.Director.Split(',').Reverse().ToList<string>())
                {
                    await myMoviesListContext.MoviesDirector.AddAsync(new MoviesDirector
                    {
                        MovieId = movie.Id,
                        PersonId = Convert.ToInt32(a)
                    });
                }

                foreach (var a in movie.Writers.Split(',').Reverse().ToList<string>())
                {
                    await myMoviesListContext.MoviesWriters.AddAsync(new MoviesWriters
                    {
                        MovieId = movie.Id,
                        PersonId = Convert.ToInt32(a)
                    });
                } 

                await myMoviesListContext.SaveChangesAsync();

            }
            else
            {
                byte[] s = ImageToByte(movie.MovieImageData);
               
                string genres = null;

                int GenresCount = movie.Genres.Count();
                int i = 1;
                foreach (var g in movie.Genres)
                {
                    if (i != GenresCount)
                    {
                        genres += g + ", ";
                    }
                    else
                    {
                        genres += g;
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
                        PersonId = a
                    });
                }

                foreach (var a in movie.Director)
                {
                    await myMoviesListContext.MoviesDirector.AddAsync(new MoviesDirector
                    {
                        MovieId = m,
                        PersonId = a
                    });
                }

                foreach (var a in movie.Writers)
                {
                    await myMoviesListContext.MoviesWriters.AddAsync(new MoviesWriters
                    {
                        MovieId = m,
                        PersonId = a
                    });
                }
            }

            await myMoviesListContext.SaveChangesAsync();

        }


        private byte[] ImageToByte(IFormFile image)
        {
            byte[] s = null;
            using (var ms = new MemoryStream())
            {
                image.CopyTo(ms);
                s = ms.ToArray();

            }
            return s;
        }


    }
}
