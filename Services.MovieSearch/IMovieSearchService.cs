using Entities.Enum;
using Services.MoviesAdmin;

namespace Services.MovieSearch
{
    public interface IMovieSearchService
    {
        Task<List<Movies>> GetMoviesByGenre(int genre);
        Task<List<Actor>> GetMovieActors(int movieId, int PostPerPage, int Page);


    }
}
