using Microsoft.AspNetCore.Mvc;
using Services.Discussions;

namespace MyMoviesList.Controllers.Discussions
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DiscussionsController : Controller
    {
       private readonly IDiscussionsService discussionsService;

       public DiscussionsController(IDiscussionsService discussionsService)
        {
            this.discussionsService = discussionsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDiscussions(int PostPerPage, int Page)
        {
            var discussions = await discussionsService.GetDiscussions(PostPerPage,Page);

            return Ok(discussions);
        }

        [HttpGet]
        public async Task<IActionResult> AddDiscussion(string DiscussionTitle, string Discussion, int UserId)
        {
            await discussionsService.AddDiscussion(DiscussionTitle,Discussion,UserId);

            return Ok();
        }


    }
}
