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


        [HttpGet]
        public async Task<IActionResult> GetUserRoles()
        {
            var roles = await usersService.GetUserRoles();

            return Ok(roles);
        }

        [HttpGet]
        public async Task<IActionResult> ChangeUserRole(int UserId,int RoleId)
        {
            await usersService.ChangeUserRole(UserId,RoleId);
            return Ok();
        }



    }
}
