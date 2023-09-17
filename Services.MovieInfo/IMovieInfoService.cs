using Entities;
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
        Task<List<Review>> GetReviews(int movieId, int PostPerPage, int Page);
        Task<int> GetReviewsCount(int movieId);
        Task UpdateReview(Review review);
        Task<Review> GetModalReview(int movieId,int userId);

    }
}
