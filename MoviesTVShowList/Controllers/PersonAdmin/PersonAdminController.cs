using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.PersonAdmin;

namespace MyMoviesList.Controllers.PersonAdmin
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PersonAdminController : Controller
    {
        private readonly IPersonAdminService personAdminService;

        public PersonAdminController(IPersonAdminService personAdminService)
        {
            this.personAdminService = personAdminService;
        }

        public async Task<IActionResult> GetPeople(int PostPerPage, int Page, string? Search)
        {
            var people = await personAdminService.GetPeople(PostPerPage,Page,Search);

            return Ok(people);
        }

        [HttpPost]
        public async Task<IActionResult> SavePerson([FromForm]Person person)
        {
            await personAdminService.SavePerson(person);

            return Ok();
        }

       [HttpGet]
       public async  Task<IActionResult> GetPeopleCount()
        {
            var count = await personAdminService.GetPeopleCount();

            return Ok(count);
        }


    }
}
