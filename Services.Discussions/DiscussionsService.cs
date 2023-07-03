using DatabaseContext;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Services.Discussions
{
    public class DiscussionsService : IDiscussionsService
    {
        private readonly MyMoviesListContext myMoviesListContext;

        public DiscussionsService(MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }

        public async Task<List<Discussions>> GetDiscussions(int PostPerPage, int Page)
        {
            var discussions = await myMoviesListContext.Discussions.OrderByDescending(o => o.TimePosted).Select(d => new Discussions
            {
                Id = d.Id,
                User = myMoviesListContext.Users.Where(u => u.Id == d.UserId).Select(u => new User { Id = u.Id, Username = u.Username }).FirstOrDefault(),
                Title = d.Title,
                TimePosted = d.TimePosted,
                Discussion = d.Discussion
            })
                .Skip((Page - 1) * PostPerPage)
                .Take(PostPerPage)
                .ToListAsync();
                
            return discussions;
        }
        public async Task<int> GetDiscussionsCount()
        {
            var count = await myMoviesListContext.Discussions.CountAsync();

            return count;
        }


        public async Task<Discussions> GetDiscussion(int DiscussionId)
        {
            var data = await myMoviesListContext.Discussions
                .Where(q => q.Id == DiscussionId)
               /* .Select(s=> new Discussions
                {
                    Id = s.Id,
                    Title = s.Title,
                    Discussion = s.Discussion,
                    TimePosted = s.TimePosted

                })*/
                .FirstOrDefaultAsync();

            if(data != null)
            {
                User u = await myMoviesListContext.Users
                    .Where(q => q.Id == data.UserId)
                    .Select(s => new User { Id = s.Id, Username = s.Username })
                    .FirstOrDefaultAsync();

                Discussions discussion = new Discussions
                {
                    Id = data.Id,
                    Title = data.Title,
                    Discussion = data.Discussion,
                    User = u,
                    TimePosted = data.TimePosted
                };

                return discussion;
            }
            else
            {
                return null;
            }
        }


        public async Task AddDiscussion(string DiscussionTitle, string Discussion, int UserId)
        {
            await myMoviesListContext.Discussions.AddAsync(new DiscussionsEntity
            {
                Title = DiscussionTitle,
                Discussion = Discussion,
                UserId = UserId,
                TimePosted = DateTime.Now
            });

            await myMoviesListContext.SaveChangesAsync();
        }

        public async Task AddDiscussionComment(CommentP comment)
        {
            await myMoviesListContext.DiscussionsComments.AddAsync(new DiscussionsCommentsEntity
            {
                DiscussionId = comment.DiscussionId,
                Comment = comment.Comment,
                TimePosted = DateTime.Now,
                UserId = comment.UserId
            });
            await myMoviesListContext.SaveChangesAsync();

        }

        public async Task<List<Comments>> GetDiscussionsComments(int DiscussionId, int PostPerPage, int Page)
        {
            var data = await myMoviesListContext.DiscussionsComments
                    .Where(q => q.DiscussionId == DiscussionId)
                    .OrderByDescending(o=> o.TimePosted)
                    .Skip((Page - 1) * PostPerPage)
                    .Take(PostPerPage).ToListAsync();

            if(data.Count() > 0)
            {
                List<Comments> comments = new List<Comments>();

                foreach (var c in data)
                {
                    string d = await myMoviesListContext.Users.Where(q => q.Id == c.UserId).Select(s => s.Username).FirstOrDefaultAsync();
                    comments.Add(new Comments
                    {
                        Id = c.Id,
                        Comment = c.Comment,
                        Username = d,
                        TimePosted = c.TimePosted
                    });
                }

                return comments;
            }
            else
            {
                return null;
            }
           
        }


    }
}
