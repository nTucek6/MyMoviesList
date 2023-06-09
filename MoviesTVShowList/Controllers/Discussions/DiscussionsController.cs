using Entities;
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
        public async Task<IActionResult> GetDiscussion(int DiscussionId)
        {
            var discussion = await discussionsService.GetDiscussion(DiscussionId);

            return Ok(discussion);
        }


        [HttpGet]
        public async Task<IActionResult> AddDiscussion(string DiscussionTitle, string Discussion, int UserId)
        {
            await discussionsService.AddDiscussion(DiscussionTitle,Discussion,UserId);

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddDiscussionComment(CommentP comment)
        {
            await discussionsService.AddDiscussionComment(comment);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetDiscussionsComments(int DiscussionId, int PostPerpage, int Page)
        {
           var comments = await discussionsService.GetDiscussionsComments(DiscussionId,PostPerpage,Page);

            return Ok(comments);
        }



    }
}
