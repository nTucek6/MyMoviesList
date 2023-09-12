using Azure;
using DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace Services.Frontpage
{
    public class FrontpageService : IFrontpageService
    {
        private readonly MyMoviesListContext myMoviesListContext;
        private readonly static int RecentTakeCount = 8;
        private static readonly int CountRequirements = 2;

        public FrontpageService(MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }

        public async Task<List<RecentMovies>> GetRecentMovies()
        {
            var data = await myMoviesListContext.Movies.OrderByDescending(q=> q.DateTimeAdded).Select(s => new RecentMovies
            {
                Id = s.Id,
                MovieName = s.MovieName,
                MovieImageData = s.MovieImageData
            }
         ).Take(RecentTakeCount).ToListAsync();

           return data;
        }

  
    }
}
