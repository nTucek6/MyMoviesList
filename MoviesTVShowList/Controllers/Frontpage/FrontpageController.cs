using Microsoft.AspNetCore.Mvc;
using Services.Frontpage;
using Services.MovieSearch;

namespace MyMoviesList.Controllers.Frontpage
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FrontpageController : Controller
    {
        private readonly IFrontpageService frontpageService;
       
        public FrontpageController(IFrontpageService frontpageService )
        {
            this.frontpageService = frontpageService;
        }

        [HttpPost]
        public async Task<IActionResult> GetRecentMovies()
        {
            var recentMovies = await frontpageService.GetRecentMovies();

            return Ok(recentMovies);

        }

     


    }
}
