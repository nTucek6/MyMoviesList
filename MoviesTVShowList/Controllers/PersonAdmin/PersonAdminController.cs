using Entities;
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

        public async Task<IActionResult> GetPeople()
        {
            var people = await personAdminService.GetPeople();

            return Ok();
        }

        public async Task<IActionResult> SavePerson(PeopleEntity person)
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
