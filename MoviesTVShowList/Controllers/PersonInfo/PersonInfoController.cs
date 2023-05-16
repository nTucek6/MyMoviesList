using Microsoft.AspNetCore.Mvc;
using Services.PersonInfo;

namespace MyMoviesList.Controllers.PersonInfo
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PersonInfoController : Controller
    {
        private readonly IPersonInfoService personInfoService;

        public PersonInfoController(IPersonInfoService personInfoService)
        {
            this.personInfoService = personInfoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonInfo(int personId)
        {
            var person = await personInfoService.GetPersonInfo(personId);

            if(person != null)
            {
                return Ok(person);
            }
            else { 
                return BadRequest("Error"); 
            } 
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonActorRoles(int personId)
        {
            var movies = await personInfoService.GetPersonActorRoles(personId);

            if(movies.Any())
            {
                return Ok(movies);
            }
            else    
            {
                return BadRequest("No movies!");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonDirectorRoles(int personId)
        {
            var movies = await personInfoService.GetPersonDirectorRoles(personId);
            if (movies.Any())
            {
                return Ok(movies);
            }
            else
            {
                return BadRequest("No movies!");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonWriterRoles(int personId)
        {
            var movies = await personInfoService.GetPersonWriterRoles(personId);
            if (movies.Any())
            {
                return Ok(movies);
            }
            else
            {
                return BadRequest("No movies!");
            }
        }


    }
}
