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



    }
}

