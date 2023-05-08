using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> GetUserBio(int Id)
        {
            var userBio = await profileService.GetUserBio(Id);

            return Ok(userBio);
        }


    }
}
