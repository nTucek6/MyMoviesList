﻿using Microsoft.AspNetCore.Mvc;
using Services.MoviesAdmin;

namespace MyMoviesList.Controllers.MoviesAdmin
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MoviesAdminController : Controller
    {

        private readonly IMoviesAdminService addMovieService;

        public MoviesAdminController(IMoviesAdminService addMovieService)
        {
            this.addMovieService = addMovieService;
        }

        [HttpGet]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await addMovieService.GetGenres();

            return Ok(genres);
        }

        [HttpGet]
        public async Task<IActionResult> GetMovies(int PostPerPage, int Page, string? Search)
        {
            var movies = await addMovieService.GetMovies(PostPerPage,Page,Search);

            return Ok(movies);
        }

        [HttpGet]
        public async Task<IActionResult> GetMoviesCount()
        {
            var count = await addMovieService.GetMoviesCount();

            return Ok(count);
        }


        [HttpPost]
        public async Task<IActionResult> SaveMovie([FromForm]SaveMovie movie)
        {
            await addMovieService.SaveMovie(movie);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetPeopleSelect()
        {
            var people = await addMovieService.GetPeopleSelect();

            return Ok(people);
        }

        [HttpGet]
        public async Task<IActionResult> GetPeopleSelectSearch(string search)
        {
            var people = await addMovieService.GetPeopleSelectSearch(search);

            return Ok(people);
        }

        [HttpPost]
        public async Task<IActionResult> UpdateMoviesScore()
        {
            await addMovieService.UpdateMoviesScore();
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CheckMovieSimilarity(MovieSimilarityDTO movie) 
        {
            var check = await addMovieService.CheckMovieSimilarity(movie);
            return Ok(check);
        }



    }
}
