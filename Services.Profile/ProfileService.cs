using DatabaseContext;
using Entities.Enum;
using Microsoft.EntityFrameworkCore;
using Services.MovieInfo;
using MyMoviesList.Extensions;
using Entities;
using System.Linq.Expressions;


namespace Services.Profile
{
    public class ProfileService : IProfileService
    {
        private readonly MyMoviesListContext myMoviesListContext;

        public ProfileService(MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }

        public async Task<string> GetUserBio(string username)
        {
            var userBio = await myMoviesListContext.Users.Where(u => u.Username == username).SingleOrDefaultAsync();

            if(userBio.UserBio != null)
            {
                return userBio.UserBio;
            }
            else
            {
                return null;
            }

        }

        public async Task<List<StatusSelect>> GetProfileStatus()
        {
            var watchStatus = Enum.GetValues(typeof(StatusEnum)).Cast<StatusEnum>().ToList().Select(x => new StatusSelect { value = x, label = x.GetDescription() }).ToList();
            return watchStatus;
        }

        public async Task<List<UserMovie>> GetUserList(string username, int statusId)
        {
            Expression<Func<UsersMovieListEntity, bool>> predicate = x => true;

            if (statusId != 0)
            {
                predicate = x => x.StatusId == (StatusEnum)statusId;
            }

            var user = await myMoviesListContext.Users.Where(q=> q.Username == username).Select(s=> 
            new UsersEntity 
            { 
                Id = s.Id

            }).FirstOrDefaultAsync();

            if(user != null)
            {
                var userMovieList = await myMoviesListContext.UsersMovieList
                    .Where(predicate)
                    .Where(q=>q.UserId == user.Id)
                    .ToListAsync();

            if(userMovieList.Count() > 0)
                {
                    List<UserMovie> userMovie = new List<UserMovie>();
                    foreach(var m in userMovieList)
                    {
                        var movie = await myMoviesListContext.Movies.Where(q => q.Id == m.MovieId).Select(s => new UserMovie
                        {
                            Id = s.Id,
                            MovieName = s.MovieName,
                            MovieImageData = s.MovieImageData,
                            Score = m.Score

                        }).FirstOrDefaultAsync();

                        userMovie.Add(movie);
                    }
                    return userMovie;
                }
                
            }


            return null;
        }

        public async Task<decimal> GetTimeSpentWatching(string username)
        {
            var user = await myMoviesListContext.Users.Where(q => q.Username == username).Select(s =>
            new UsersEntity
            {
                Id = s.Id

            }).FirstOrDefaultAsync();

            if (user != null)
            {
                var userMovieList = await myMoviesListContext.UsersMovieList
                    .Where(q=>q.StatusId == StatusEnum.Completed)
                    .Where(q => q.UserId == user.Id)
                    .ToListAsync();


                if (userMovieList.Count() > 0)
                {
                    decimal minutes = 0;

                    foreach (var m in userMovieList)
                    {
                         minutes += await myMoviesListContext.Movies.Where(q => q.Id == m.MovieId).Select(s=> s.Duration).FirstOrDefaultAsync();
  
                    }
                   
                return minutes / 1440;
                }


            }
            return 0;
        }


        public async Task<List<StatusInfo>> GetStatusInfo(string username)
        {
            var watchStatus = Enum.GetValues(typeof(StatusEnum)).Cast<StatusEnum>().ToList().Where(q=>q != StatusEnum.All).Select(x => new StatusSelect { value = x, label = x.GetDescription() }).ToList();

            var user = await myMoviesListContext.Users.Where(q => q.Username == username).Select(s =>new UsersEntity
           {
               Id = s.Id
           }).FirstOrDefaultAsync();

            if (user != null)
            {
                var userMovieList = await myMoviesListContext.UsersMovieList
                   .Where(q => q.StatusId != StatusEnum.All)
                   .Where(q => q.UserId == user.Id)
                   .ToListAsync();

                if (userMovieList.Count() > 0)
                {
                    List<StatusInfo> statusInfo = new List<StatusInfo>();
                    foreach (var status in watchStatus)
                    {
                     int count = 0;
                     foreach(var u in userMovieList)
                      {
                            if(u.StatusId == status.value)
                            {
                                count++;
                            }

                      }
                        statusInfo.Add(new StatusInfo 
                        {
                            Id = status.value, 
                            Status = status.label, 
                            StatusCount = count });

                    }
                    return statusInfo;
                }
            }


            return null;

        }

        public async Task<List<UserMovie>> GetLastUpdate(int PostPerPage, int Page,string username)
        {
            var user = await myMoviesListContext.Users.Where(q => q.Username == username).Select(s => new UsersEntity
            {
                Id = s.Id
            }).FirstOrDefaultAsync();

            if (user != null)
            {
                var userMovieList = await myMoviesListContext.UsersMovieList
                   .Where(q => q.UserId == user.Id)
                   .OrderByDescending(q => q.TimeAdded)
                   .Skip((Page - 1) * PostPerPage)
                   .Take(PostPerPage)
                   .ToListAsync();

                if (userMovieList.Count() > 0)
                {
                    List<UserMovie> userMovie = new List<UserMovie>();
                    foreach (var m in userMovieList)
                    {
                        var movie = await myMoviesListContext.Movies.Where(q => q.Id == m.MovieId).Select(s => new UserMovie
                        {
                            Id = s.Id,
                            MovieName = s.MovieName,
                            MovieImageData = s.MovieImageData,
                            Score = m.Score,
                            TimeAdded = m.TimeAdded,
                            Status = m.StatusId.GetDescription()

                        }).FirstOrDefaultAsync();

                        userMovie.Add(movie);
                    }
                    return userMovie;
                }

            }
            return null;
        }

        public async Task<byte[]> GetProfileImage(string username)
        {
            var user = await myMoviesListContext.Users.Where(q => q.Username == username).Select(s => new UsersEntity
            {
                Id = s.Id,
                ProfileImageData = s.ProfileImageData
                
            }).FirstOrDefaultAsync();

            if(user != null)
            {
                return user.ProfileImageData;
            }
            return null;


        }

        public async Task<List<UsersEntity>> SearchUsers(string Search)
        {
            var users = await myMoviesListContext.Users
                .Where(q => q.Username.Contains(Search))
                .Select(s => new UsersEntity 
                { 
                    Id = s.Id,
                    Username = s.Username,
                    ProfileImageData = s.ProfileImageData
                })
                .ToListAsync();

            if(users.Count > 0)
            {
                return users;
            }
            else
            {
                return null;
            }
        }

    }
}
