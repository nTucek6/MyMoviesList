using DatabaseContext;
using Entities;

namespace Services.MoviesAdmin
{
    public interface IMoviesAdminService
    {
      Task<List<GenresSelect>> GetGenres();
      Task<List<Movies>> GetMovies(int PostPerPage, int Page, string? Search);
      Task<int> GetMoviesCount();
       


    }
}
