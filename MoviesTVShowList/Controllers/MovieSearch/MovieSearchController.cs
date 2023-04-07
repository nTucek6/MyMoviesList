using Microsoft.AspNetCore.Mvc;
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






    }
}

