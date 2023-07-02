using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.SqlServer.Query.Internal;
using Services.Profile;

namespace MyMoviesList.Controllers.Profile
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProfileController : Controller
    {
        private readonly IProfileService profileService;

        public ProfileController(IProfileService profileService)
        {
            this.profileService = profileService;
        }


        [HttpGet]
        public async Task<IActionResult> GetUserBio(string username)
        {
            var userBio = await profileService.GetUserBio(username);

            return Ok(userBio);
        }

        [HttpGet]
        public async Task<IActionResult> GetProfileStatus()
        {
            var status = await profileService.GetProfileStatus();

            return Ok(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserList(string username,int statusId)
        {
            var movies = await profileService.GetUserList(username, statusId);

            return Ok(movies);
        }

        [HttpGet]
        public async Task<IActionResult> GetTimeSpentWatching(string username)
        {
             var days = await profileService.GetTimeSpentWatching(username);

            return Ok(days);
        }

        [HttpGet]
        public async Task<IActionResult> GetStatusInfo(string username)
        {
            var status = await profileService.GetStatusInfo(username);

            return Ok(status);
        }

        [HttpGet]
        public async Task<IActionResult> GetLastUpdate(int PostPerPage,int Page,string username)
        {
            var movies = await profileService.GetLastUpdate(PostPerPage,Page,username);

            return Ok(movies);
        }

        [HttpGet]
        public async Task<IActionResult> GetProfileImage(string username)
        {
            var movies = await profileService.GetProfileImage(username);

            return Ok(movies);
        }


        [HttpGet]
        public async Task<IActionResult> SearchUsers(string Search)
        {
            var users = await profileService.SearchUsers(Search);

            return Ok(users);
        }




    }
}
