using DatabaseContext;
using Entities;
using Microsoft.EntityFrameworkCore;

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
            return person;
        }

        public async Task<List<MovieInfoPerson>> GetPersonActorRoles(int personId)
        {
            var actorMovies = await myMoviesContext.MoviesActors.Where(q=> q.PersonId == personId).ToListAsync();

            List<MovieInfoPerson> movies = new List<MovieInfoPerson>();
            foreach (var a in actorMovies)
            {
                var m = await myMoviesContext.Movies.Where(q => q.Id == a.MovieId).Select(s =>
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

        public async Task<List<MoviesEntity>> GetPersonDirectorRoles(int personId)
        {
            var directorMovies = await myMoviesContext.MoviesDirector.Where(q => q.PersonId == personId).ToListAsync();

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

        public async Task<List<MoviesEntity>> GetPersonWriterRoles(int personId)
        {
            var writerMovies = await myMoviesContext.MoviesWriters.Where(q => q.PersonId == personId).ToListAsync();

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




    }
}
