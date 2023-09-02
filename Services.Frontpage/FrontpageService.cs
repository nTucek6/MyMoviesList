using DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace Services.Frontpage
{
    public class FrontpageService : IFrontpageService
    {
        private readonly MyMoviesListContext myMoviesListContext;

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
         ).Take(8).ToListAsync();

           return data;
        }
    }
}
