using Microsoft.AspNetCore.Mvc;
using Services.UsersAdmin;

namespace MyMoviesList.Controllers.UsersAdmin
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsersAdminController : Controller
    {
        private readonly IUsersAdminService usersService;

        public UsersAdminController(IUsersAdminService usersService)
        {
            this.usersService = usersService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(int PostPerPage,int Page,string? Search)
        {
            var users = await usersService.GetUsers(PostPerPage, Page, Search);
            return Ok(users);
        }

        [HttpGet]
        public async Task<IActionResult> GetUsersCount()
        {
            var count = await usersService.GetUsersCount();

            return Ok(count);
        }


    }
}
