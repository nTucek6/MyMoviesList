using Microsoft.AspNetCore.Mvc;
using Services.EmailSender;
using Services.UserSupport;

namespace MyMoviesList.Controllers.UserSupport
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserSupportController : Controller
    {
        private readonly IUserSupportService userSupportService;
        private readonly IEmailSenderService emailSenderService;

        public UserSupportController(IUserSupportService userSupportService, IEmailSenderService emailSenderService) 
        {
            this.userSupportService = userSupportService;
            this.emailSenderService = emailSenderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserInquirySelect()
        {
            var inquiry = await userSupportService.GetUserInquirySelect();

            return Ok(inquiry);
        }

        [HttpPost]
        public async Task<IActionResult> SubmitInquiry(Inquiry inquiry)
        {
            await userSupportService.SubmitInquiry(inquiry);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetUserIssuesCount()
        {
            var count = await userSupportService.GetUserIssuesCount();
            return Ok(count);
        }

        [HttpGet]
        public async Task<IActionResult> GetUserIssues(int PostPerPage,int Page, string? Search)
        {
            var issues = await userSupportService.GetUserIssues(PostPerPage,Page,Search);
            return Ok(issues);
        }

        [HttpGet]
        public async Task<IActionResult> ResolveIssue(int Id, string Email)
        {
            await userSupportService.ResolveIssue(Id);
            await emailSenderService.SendEmailAsync(Email, "MyMoviesList: Inquiry resolved", "Your inquiry has been resolved.");
            return Ok();
        }



    }
}
