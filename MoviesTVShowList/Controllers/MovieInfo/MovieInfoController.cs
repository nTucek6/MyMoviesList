using Microsoft.AspNetCore.Mvc;
using Services.MovieInfo;
using Services.MovieSearch;

namespace MyMoviesList.Controllers.MovieInfo
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MovieInfoController : Controller
    {

        private readonly IMovieInfoService movieInfoService;

        public MovieInfoController(IMovieInfoService movieInfoService) 
        {
            this.movieInfoService = movieInfoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMovieInfo(int movieId)
        {
            var movie = await movieInfoService.GetMovieInfo(movieId);
            return Ok(movie);
        }
        [HttpGet]
        public async Task<IActionResult> GetStatus()
        {
            var status = await movieInfoService.GetStatus();
            return Ok(status);
        }
        [HttpGet]
        public async Task<IActionResult> GetWatchStatus(int userId, int movieId)
        {
            var watchStatus = await movieInfoService.GetWatchStatus(userId, movieId);
            return Ok(watchStatus);

        }
        [HttpGet]
        public async Task<IActionResult> UpdateMovieUserList(int userId, int movieId, int? score, int? statusId)
        {
            await movieInfoService.UpdateMovieUserList(userId, movieId, score, statusId);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetUserScore(int userId, int movieId)
        {
            var score = await movieInfoService.GetUserScore(userId, movieId);
            return Ok(score);
        }

        [HttpGet]
        public async Task<IActionResult> GetReviews(int movieId, int PostPerPage, int Page)
        {
            var reviews = await movieInfoService.GetReviews(movieId, PostPerPage, Page);
            return Ok(reviews);
        }
        [HttpGet]
        public async Task<IActionResult> GetReviewsCount(int movieId)
        {
            var count = await movieInfoService.GetReviewsCount(movieId);
            return Ok(count);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateReview(Review review)
        {
            await movieInfoService.UpdateReview(review);
            return Ok();
        }


    }
}
