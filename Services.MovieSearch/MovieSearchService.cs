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

            List<Actor> actors = new List<Actor>();

            List<PeopleEntity> director = new List<PeopleEntity>();

            List<PeopleEntity> writers = new List<PeopleEntity>();

            List<GenresSelect> genres = new List<GenresSelect>();

            foreach (var a in act)
            {
                var q = await myMoviesListContext.People.Where(p => p.Id == a.PersonId)
                    .Select(s=> new Actor 
                    {
                        Id = s.Id,
                        FirstName = s.FirstName,
                        LastName = s.LastName,
                        CharacterName = a.CharacterName,
                        PersonImageData = s.PersonImageData

                    })
                    .FirstOrDefaultAsync();
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

        public async Task<List<StatusSelect>> GetStatus()
        {
            var watchStatus = Enum.GetValues(typeof(StatusEnum)).Cast<StatusEnum>().ToList().Select(x => new StatusSelect { value = x, label = x.GetDescription() }).ToList();
            return watchStatus;
        }

        public async Task<StatusSelect> GetWatchStatus(int userId,int movieId)
        {
            var userWatchStatus = await myMoviesListContext.UsersMovieList.Where(q=> q.UserId == userId && q.MovieId == movieId).Select(s=> s.StatusId).FirstOrDefaultAsync();

            if(userWatchStatus != 0)
            {
                return Enum.GetValues(typeof(StatusEnum)).Cast<StatusEnum>().ToList().Where(q => q == userWatchStatus).Select(x => new StatusSelect { value = x, label = x.GetDescription() }).FirstOrDefault();
            }
            else
            {
                return null;
            }
        }

        public async Task UpdateMovieUserList(int userId, int movieId, int? score, int? statusId)
        {
            var userList = await myMoviesListContext.UsersMovieList.Where(q => q.UserId == userId && q.MovieId == movieId).FirstOrDefaultAsync();

            if(userList != null)
            {
                if(score > 0 )
                {
                    userList.Score = score;
                }

                if(statusId > 0)
                {
                    userList.StatusId = (StatusEnum)statusId;
                }
               
            }
            else
            {
                await myMoviesListContext.UsersMovieList.AddAsync(new UsersMovieListEntity
                {
                 UserId = userId,
                 MovieId = movieId,
                 StatusId = StatusEnum.Watching,
                 Score = score,
                 TimeAdded = DateTime.Now
                });
            }
            await myMoviesListContext.SaveChangesAsync();
        }

        public async Task<int> GetUserScore(int userId, int movieId)
        {
            var userScore = await myMoviesListContext.UsersMovieList.Where(q => q.UserId == userId && q.MovieId == movieId).FirstOrDefaultAsync();

            if (userScore != null)
            {
                if (userScore.Score != null || userScore.Score > 0)
                {
                    return (int)userScore.Score;
                }
                return 0;
            }
            else
            {
                return 0;
            }
        }
    }
}
