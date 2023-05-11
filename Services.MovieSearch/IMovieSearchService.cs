using Entities.Enum;
using Services.MoviesAdmin;

namespace Services.MovieSearch
{
    public interface IMovieSearchService
    {
        Task<List<Movies>> GetMoviesByGenre(int genre);
      
    }
}
