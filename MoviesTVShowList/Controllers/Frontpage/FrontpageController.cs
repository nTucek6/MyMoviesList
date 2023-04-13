using DatabaseContext;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MyMoviesList.Controllers.Frontpage
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FrontpageController : Controller
    {
        private MyMoviesListContext myMoviesListContext;
        public FrontpageController(MyMoviesListContext _myMoviesListContext)
        {
            myMoviesListContext = _myMoviesListContext;
        }

        [HttpPost]
        public async Task<List<MoviesEntity>> GetRecentMovies()
        {

            var data = await myMoviesListContext.Movies.Select(s => new MoviesEntity
            {
                Id = s.Id,
                MovieName = s.MovieName,
                MovieImageData = s.MovieImageData
            }

          ).ToListAsync();

            return data;


        }




    }
}
