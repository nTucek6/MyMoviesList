using Services.MoviesAdmin;


namespace Services.MovieInfo
{
    public interface IMovieInfoService
    {
        Task<Movies> GetMovieInfo(int movieId);
        Task<List<StatusSelect>> GetStatus();
        Task<StatusSelect> GetWatchStatus(int userId, int movieId);
        Task UpdateMovieUserList(int userId, int movieId, int? score, int? statusId);
        Task<int> GetUserScore(int userId, int movieId);
    }
}
