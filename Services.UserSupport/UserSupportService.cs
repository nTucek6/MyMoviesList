using DatabaseContext;
using Entities;
using Entities.Enum;
using Microsoft.EntityFrameworkCore;
using MyMoviesList.Extensions;
using System.Linq;
using System.Linq.Expressions;

namespace Services.UserSupport
{
    public class UserSupportService : IUserSupportService
    {
        private readonly MyMoviesListContext myMoviesListContext;

        public UserSupportService(MyMoviesListContext myMoviesListContext)
        {
            this.myMoviesListContext = myMoviesListContext;
        }

        public async Task<List<UserInquirySelect>> GetUserInquirySelect()
        {
            var inquiry = Enum.GetValues(typeof(SupportInquiryEnum)).Cast<SupportInquiryEnum>().ToList().Select(x => new UserInquirySelect { value = x, label = x.GetDescription() }).ToList();
            return inquiry;
        }

        public async Task SubmitInquiry(Inquiry inquiry)
        {
            await myMoviesListContext.IssuesList.AddAsync(
            new IssuesListEntity
            {
               Email = inquiry.Email,
               IssueType = inquiry.IssueType,
               InquiryText = inquiry.InquiryText,
               TimeAdded = DateTime.Now,
               IsResolved = false

            }); 

            await myMoviesListContext.SaveChangesAsync();
        }

        public async Task<int> GetUserIssuesCount()
        {
            var count = await myMoviesListContext.IssuesList.CountAsync();
            return count;
        }

        public async Task<List<Issue>> GetUserIssues(int PostPerPage, int Page, string? Search)
        {
            Expression<Func<IssuesListEntity, bool>> predicate = x => true;

            if (!String.IsNullOrEmpty(Search))
            {
                predicate = x => x.Email.Contains(Search);
            }

            var data = await myMoviesListContext.IssuesList
                    .Where(predicate)
                    .OrderBy(m => m.TimeAdded)
                    .Select(s=> new Issue 
                    {
                        Id = s.Id,
                        Email = s.Email,
                        IssueType = s.IssueType.GetDescription(),
                        TimeAdded = s.TimeAdded,
                        InquiryText= s.InquiryText,
                        IsResolved = s.IsResolved,
                    })
                    .Skip((Page - 1) * PostPerPage)
                    .Take(PostPerPage).ToListAsync();
            return data;
        }

        public async Task ResolveIssue(int Id)
        {
           var issue = await myMoviesListContext.IssuesList.Where(q=> q.Id == Id).FirstOrDefaultAsync();
            issue.IsResolved = true;
            await myMoviesListContext.SaveChangesAsync();
        }
    }
}
