using Services.MoviesAdmin;

namespace Services.MovieSearch
{
    public class MovieSearchService : IMovieSearchService
    {
        public Task<List<Movies>> GetMoviesByGenre()
        {
            throw new NotImplementedException();
        }
    }
}
