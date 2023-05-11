using Entities.Enum;
using Microsoft.AspNetCore.Mvc;
using Services.MoviesAdmin;
using Services.MovieSearch;

namespace MyMoviesList.Controllers.MovieSearch
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MovieSearchController : Controller
    {
        private readonly IMovieSearchService movieSearchService;

        public MovieSearchController(IMovieSearchService movieSearchService)
        {
            this.movieSearchService = movieSearchService;
        }


        [HttpGet]
        public async Task<IActionResult> GetMoviesByGenre(int genre)
        {
            var movies = await movieSearchService.GetMoviesByGenre(genre);
            return Ok(movies);
        }


        [HttpGet]
        public async Task<IActionResult> GetMovieInfo(int movieId)
        {
            var movie = await movieSearchService.GetMovieInfo(movieId);
            return Ok(movie);
        }

        [HttpGet]
        public async Task<IActionResult> GetStatus()
        {
            var status = await movieSearchService.GetStatus();
            return Ok(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetWatchStatus(int userId,int movieId)
        {
            var watchStatus = await movieSearchService.GetWatchStatus(userId, movieId);

            return Ok(watchStatus);

        }

        [HttpGet]
        public async Task<IActionResult> UpdateMovieUserList(int userId, int movieId,int? score, int? statusId)
        {
            await movieSearchService.UpdateMovieUserList(userId, movieId, score,statusId);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetUserScore(int userId, int movieId)
        {
           var score = await movieSearchService.GetUserScore(userId, movieId);

            return Ok(score);
        }




    }
}

