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
            return Ok(person);
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonActorRoles(int personId)
        {
            var movies = await personInfoService.GetPersonActorRoles(personId);
            return Ok(movies);
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonDirectorRoles(int personId)
        {
            var movies = await personInfoService.GetPersonDirectorRoles(personId);
            return Ok(movies);
        }

        [HttpGet]
        public async Task<IActionResult> GetPersonWriterRoles(int personId)
        {
            var movies = await personInfoService.GetPersonWriterRoles(personId);
            return Ok(movies);
        }


    }
}
