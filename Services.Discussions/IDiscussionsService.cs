using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Discussions
{
    public interface IDiscussionsService
    {
        Task<List<Discussions>> GetDiscussions(int PostPerPage, int Page);
        Task <Discussions> GetDiscussion(int DiscussionId);
        Task<List<Comments>> GetDiscussionsComments(int DiscussionId, int PostPerPage, int Page);
        Task AddDiscussion(string DiscussionTitle,string Discussion,int UserId);
        Task AddDiscussionComment(CommentP comment);

    }
}
