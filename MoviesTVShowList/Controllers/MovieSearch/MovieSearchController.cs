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
        public async Task<IActionResult> GetMoviesByGenre(int genre, int PostPerPage, int Page)
        {
            var movies = await movieSearchService.GetMoviesByGenre(genre,PostPerPage,Page);
            return Ok(movies);
        }

        [HttpGet]
        public async Task<IActionResult> GetMoviesByGenreCount(int genre)
        {
            var count = await movieSearchService.GetMoviesByGenreCount(genre);
            return Ok(count);
        }

        [HttpGet]
        public async Task<IActionResult> GetMovieActors(int movieId, int PostPerPage, int Page)
        { 
            var actors = await movieSearchService.GetMovieActors(movieId,PostPerPage,Page);
            return Ok(actors);
        }

        [HttpGet]
        public async Task<IActionResult> SearchBar(string Search,string? type)
        {
            var searchdata = await movieSearchService.SearchBar(Search,type);
            return Ok(searchdata);
        }

        [HttpGet]
        public async Task<IActionResult> GetTopMovies(int PostPerPage,int Page)
        {
            var movies = await movieSearchService.GetTopMovies(PostPerPage, Page);

            return Ok(movies);
        }
        [HttpGet]
        public async Task<IActionResult> GetTopMoviesCount()
        {
            var count = await movieSearchService.GetTopMoviesCount();

            return Ok(count);
        }



    }
}

