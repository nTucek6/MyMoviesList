using Microsoft.AspNetCore.Mvc;
using Services.Authentication;

namespace MyMoviesList.Controllers.Login
{
    [Route("api/auth")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationService authenticationService;

        public AuthenticationController(IAuthenticationService _authenticationService)
        {
            authenticationService = _authenticationService;
        }


        [HttpPost("RegisterUser")]
        public async Task<string> RegisterUser(Register user)
        {
            var token = await authenticationService.Register(user);
            return token;
        }

        [HttpPost("Login")]
        public async Task<string> Login(User user)
        {
            var token = await authenticationService.Login(user);

            return token;
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(UserUpdate user)
        {
            await authenticationService.ChangePassword(user);

            return Ok();
        }


        [HttpPost("ChangeEmail")]
        public async Task<string> ChangeEmail(UserUpdate user)
        {
            var token = await authenticationService.ChangeEmail(user);

            return token;
        }

        [HttpPost("ChangeUsername")]
        public async Task<string> ChangeUsername(UserUpdate user)
        {
            var token = await authenticationService.ChangeUsername(user);

            return token;
        }

        [HttpPost("ChangeBio")]
        public async Task<IActionResult> ChangeBio(UserUpdate user)
        {
           await authenticationService.ChangeBio(user);
           
            return Ok();
        }


     /*   [HttpPost("GetUsername")]
        public async Task<string> GetUsername(string token)
        {
            var username = await authenticationService.ValidateToken(token);

            return username;
        }

        [HttpPost("GetRole")]
        public async Task<string> GetRole(string token)
        {
            var role = await authenticationService.GetRole(token);

            return role;
        } */



    }

}
