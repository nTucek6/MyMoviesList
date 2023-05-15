using DatabaseContext;
using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.PersonInfo
{
    public class PersonInfoService : IPersonInfoService
    {
        private readonly MyMoviesListContext myMoviesContext;

        public PersonInfoService(MyMoviesListContext myMoviesContext)
        {
            this.myMoviesContext = myMoviesContext;
        }

        public async Task<PeopleEntity> GetPersonInfo(int personId)
        {
            var person = await myMoviesContext.People.FindAsync(personId);

            if(person != null)
            {
                return person;
            }
            else
            {
                throw new Exception("Person not found!");
            }
        }

        public async Task<List<MovieInfoPerson>> GetPersonActorRoles(int personId)
        {
            var actorMovies = await myMoviesContext.MoviesActors.Where(q=> q.PersonId == personId).ToListAsync();
           
            if (actorMovies.Any()) 
            {
                List<MovieInfoPerson> movies = new List<MovieInfoPerson>();
                foreach (var a in actorMovies)
                {
                    var m = await myMoviesContext.Movies.Where(q=>q.Id == a.MovieId).Select(s => 
                        new MovieInfoPerson
                        {
                            Id = s.Id,
                            MovieName = s.MovieName,
                            MovieImageData = s.MovieImageData,
                            CharacterName = a.CharacterName
                        }
                    ).FirstOrDefaultAsync();
                    movies.Add(m);
                }
                return movies;
            }
            else
            {
                throw new Exception("No person actor roles!");
            }
        }

        public async Task<List<MoviesEntity>> GetPersonDirectorRoles(int personId)
        {
            var directorMovies = await myMoviesContext.MoviesDirector.Where(q => q.PersonId == personId).ToListAsync();

            if (directorMovies.Any())
            {
                List<MoviesEntity> movies = new List<MoviesEntity>();
                foreach (var a in directorMovies)
                {
                    var m = await myMoviesContext.Movies.Where(q => q.Id == a.MovieId).Select(s =>
                        new MoviesEntity
                        {
                            Id = s.Id,
                            MovieName = s.MovieName,
                            MovieImageData = s.MovieImageData
                        }

                    ).FirstOrDefaultAsync();
                    movies.Add(m);
                }
                return movies;
            }
            else
            {
                throw new Exception("No person actor roles!");
            }
        }

        public async Task<List<MoviesEntity>> GetPersonWriterRoles(int personId)
        {
            var writerMovies = await myMoviesContext.MoviesWriters.Where(q => q.PersonId == personId).ToListAsync();

            if (writerMovies.Any())
            {
                List<MoviesEntity> movies = new List<MoviesEntity>();
                foreach (var a in writerMovies)
                {
                    var m = await myMoviesContext.Movies.Where(q => q.Id == a.MovieId).Select(s =>
                        new MoviesEntity
                        {
                            Id = s.Id,
                            MovieName = s.MovieName,
                            MovieImageData = s.MovieImageData
                        }
                    ).FirstOrDefaultAsync();
                    movies.Add(m);
                }
                return movies;
            }
            else
            {
                throw new Exception("No person actor roles!");
            }
        }




    }
}
